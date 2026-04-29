// Medaccer · Webhook WhatsApp Cloud API
// Recibe mensajes de Meta, los persiste, dispara el agente IA si corresponde.
// Verifica HMAC, idempotencia por wamid, manejo de errores.

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServiceClient } from '@/lib/supabase/service';
import { runAgent } from '@/lib/ai/agent';
import { logger } from '@/lib/logger';

const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN!;
const META_APP_SECRET = process.env.META_APP_SECRET!;

// ============================================================
// GET — verificación inicial del webhook (Meta lo llama una vez)
// ============================================================

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get('hub.mode');
  const token = params.get('hub.verify_token');
  const challenge = params.get('hub.challenge');

  if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: 'verify_failed' }, { status: 403 });
}

// ============================================================
// POST — mensajes entrantes
// ============================================================

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // 1. Verificación HMAC
  const signature = req.headers.get('x-hub-signature-256') ?? '';
  const expected = 'sha256=' + crypto
    .createHmac('sha256', META_APP_SECRET)
    .update(rawBody)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    logger.warn('webhook.invalid_signature', { signature });
    return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
  }

  // 2. Responder 200 INMEDIATO a Meta (importante: <5s o reintenta)
  // Procesamiento asíncrono después
  const payload = JSON.parse(rawBody);

  // No bloqueamos la respuesta:
  processPayload(payload).catch(err => {
    logger.error('webhook.processing_failed', { err: String(err), payload });
  });

  return NextResponse.json({ received: true });
}

// ============================================================
// Procesamiento real
// ============================================================

async function processPayload(payload: any) {
  const supabase = createServiceClient();

  // Estructura Meta:
  // entry[].changes[].value.messages[]
  const entries = payload.entry ?? [];
  for (const entry of entries) {
    for (const change of entry.changes ?? []) {
      const value = change.value;
      const phoneNumberId = value?.metadata?.phone_number_id;
      if (!phoneNumberId) continue;

      // Obtener org por phone_number_id
      const { data: org } = await supabase
        .from('organizations')
        .select('id, specialty, name')
        .eq('whatsapp_phone_id', phoneNumberId)
        .single();
      if (!org) {
        logger.warn('webhook.org_not_found', { phoneNumberId });
        continue;
      }

      // Status updates (delivered, read)
      for (const status of value.statuses ?? []) {
        await handleStatusUpdate(org.id, status);
      }

      // Mensajes nuevos
      for (const msg of value.messages ?? []) {
        await handleIncomingMessage(org, msg, value.contacts?.[0]);
      }
    }
  }
}

async function handleStatusUpdate(orgId: string, status: any) {
  const supabase = createServiceClient();
  const { id: wamid, status: state, timestamp } = status;
  await supabase
    .from('messages')
    .update({
      status: state,
      status_updates: supabase.rpc('jsonb_append', {
        target: 'status_updates',
        value: { state, ts: timestamp },
      }) as any,
    })
    .eq('org_id', orgId)
    .eq('external_id', wamid);
}

async function handleIncomingMessage(org: any, msg: any, contact: any) {
  const supabase = createServiceClient();
  const wamid = msg.id;

  // Idempotencia: si ya procesamos este wamid, salir
  const { data: existing } = await supabase
    .from('messages')
    .select('id')
    .eq('org_id', org.id)
    .eq('external_id', wamid)
    .maybeSingle();
  if (existing) {
    logger.info('webhook.duplicate_message', { wamid });
    return;
  }

  // Resolver/crear conversación
  const fromPhone = msg.from; // ej "573001234567"
  const contactName = contact?.profile?.name;

  let { data: conv } = await supabase
    .from('conversations')
    .select('*')
    .eq('org_id', org.id)
    .eq('contact_phone', fromPhone)
    .eq('status', 'open')
    .maybeSingle();

  if (!conv) {
    const { data: newConv } = await supabase
      .from('conversations')
      .insert({
        org_id: org.id,
        channel: 'whatsapp',
        contact_phone: fromPhone,
        contact_name: contactName,
        external_id: fromPhone,
        ai_mode: 'auto',
      })
      .select()
      .single();
    conv = newConv;
  }
  if (!conv) return;

  // Match patient por phone
  const { data: patient } = await supabase
    .from('patients')
    .select('id')
    .eq('org_id', org.id)
    .eq('phone', `+${fromPhone}`)
    .maybeSingle();

  if (patient && !conv.patient_id) {
    await supabase.from('conversations').update({ patient_id: patient.id }).eq('id', conv.id);
  }

  // Extraer body según tipo
  let body: string | null = null;
  let mediaUrl: string | null = null;
  let kind: string = msg.type;

  if (msg.type === 'text') {
    body = msg.text.body;
  } else if (msg.type === 'audio') {
    mediaUrl = await downloadMedia(msg.audio.id);
    body = await transcribeAudio(mediaUrl); // Whisper
  } else if (msg.type === 'image') {
    mediaUrl = await downloadMedia(msg.image.id);
    body = msg.image.caption ?? null;
  } else if (msg.type === 'document') {
    mediaUrl = await downloadMedia(msg.document.id);
    body = msg.document.filename;
  } else if (msg.type === 'location') {
    body = `Ubicación: ${msg.location.latitude},${msg.location.longitude}`;
  } else {
    body = `[${msg.type} no soportado]`;
  }

  // Persistir
  const { data: messageRow } = await supabase
    .from('messages')
    .insert({
      org_id: org.id,
      conversation_id: conv.id,
      external_id: wamid,
      direction: 'inbound',
      kind,
      body,
      media_url: mediaUrl,
    })
    .select()
    .single();

  // Disparar agente IA si está en auto
  if (conv.ai_mode === 'auto' && messageRow) {
    try {
      await runAgent({
        orgId: org.id,
        conversationId: conv.id,
        triggerMessageId: messageRow.id,
        specialty: org.specialty,
      });
    } catch (err) {
      logger.error('webhook.agent_failed', { err: String(err), messageId: messageRow.id });
      // En caso de fallo del agente, escalar a humano
      await supabase
        .from('conversations')
        .update({ status: 'pending_human', ai_mode: 'off' })
        .eq('id', conv.id);
    }
  }
}

// ============================================================
// Helpers
// ============================================================

async function downloadMedia(mediaId: string): Promise<string> {
  // 1. Pedir URL temporal a Meta
  const metaResp = await fetch(`https://graph.facebook.com/v21.0/${mediaId}`, {
    headers: { Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}` },
  });
  const { url } = await metaResp.json();

  // 2. Descargar el binario
  const binResp = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}` },
  });
  const buffer = await binResp.arrayBuffer();

  // 3. Subir a Supabase Storage
  const supabase = createServiceClient();
  const path = `whatsapp-media/${mediaId}`;
  await supabase.storage.from('media').upload(path, buffer, {
    contentType: binResp.headers.get('content-type') ?? 'application/octet-stream',
  });
  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
}

async function transcribeAudio(url: string): Promise<string> {
  // Llamar Groq Whisper (gratis y rápido)
  const formData = new FormData();
  const audio = await fetch(url).then(r => r.blob());
  formData.append('file', audio, 'audio.ogg');
  formData.append('model', 'whisper-large-v3');
  formData.append('language', 'es');

  const resp = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    body: formData,
  });
  const json = await resp.json();
  return json.text ?? '';
}
