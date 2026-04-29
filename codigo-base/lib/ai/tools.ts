/**
 * Medaccer · Tools del agente IA
 * Cada tool es una función que el LLM puede llamar para ejecutar acciones reales.
 *
 * Convención Vercel AI SDK:
 *   tool({ description, parameters: zodSchema, execute: async (args) => result })
 */

import { tool } from 'ai';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';
import { sendWhatsApp } from '@/lib/whatsapp';

// ============================================================
// 1. checkAvailability
// ============================================================

export const checkAvailability = tool({
  description: 'Devuelve los slots disponibles para agendar en una fecha y duración dadas. Usá esto antes de proponer un horario al paciente.',
  parameters: z.object({
    date: z.string().describe('Fecha en formato YYYY-MM-DD'),
    duration_min: z.number().default(30).describe('Duración deseada en minutos'),
    doctor_id: z.string().optional().describe('Si el paciente prefiere doctor específico'),
  }),
  execute: async ({ date, duration_min, doctor_id }, { abortSignal, ctx }) => {
    const supabase = createServerClient();
    const startOfDay = new Date(`${date}T07:00:00-05:00`);
    const endOfDay = new Date(`${date}T18:00:00-05:00`);

    // Buscar citas existentes
    const { data: busy } = await supabase
      .from('appointments')
      .select('starts_at, ends_at, doctor_id')
      .eq('org_id', ctx.org_id)
      .gte('starts_at', startOfDay.toISOString())
      .lt('starts_at', endOfDay.toISOString())
      .not('status', 'in', '(cancelled,no_show)')
      .filter('doctor_id', doctor_id ? 'eq' : 'not.is', doctor_id ?? null);

    // Generar slots de 30 min y filtrar conflictos
    const slots = [];
    for (let h = 7; h < 18; h++) {
      for (const m of [0, 30]) {
        const start = new Date(`${date}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00-05:00`);
        const end = new Date(start.getTime() + duration_min * 60_000);
        const overlaps = busy?.some(b =>
          new Date(b.starts_at) < end && new Date(b.ends_at) > start
        );
        if (!overlaps) slots.push({ start: start.toISOString(), end: end.toISOString() });
      }
    }

    return { date, available_slots: slots.slice(0, 6) }; // máx 6 al LLM
  },
});

// ============================================================
// 2. createAppointment
// ============================================================

export const createAppointment = tool({
  description: 'Crea una cita confirmada. Solo llamá esto cuando el paciente confirmó explícitamente fecha y hora.',
  parameters: z.object({
    patient_id: z.string().uuid(),
    starts_at: z.string().describe('ISO8601 con timezone'),
    duration_min: z.number().default(30),
    type: z.enum(['first_visit', 'follow_up', 'urgent', 'control']).default('first_visit'),
    reason: z.string().describe('Motivo de consulta breve'),
    doctor_id: z.string().uuid().optional(),
  }),
  execute: async (args, { ctx }) => {
    const supabase = createServerClient();
    const ends_at = new Date(new Date(args.starts_at).getTime() + args.duration_min * 60_000).toISOString();

    const { data, error } = await supabase
      .from('appointments')
      .insert({
        org_id: ctx.org_id,
        patient_id: args.patient_id,
        doctor_id: args.doctor_id,
        starts_at: args.starts_at,
        ends_at,
        type: args.type,
        reason: args.reason,
        status: 'scheduled',
        created_via: 'whatsapp_ai',
      })
      .select()
      .single();

    if (error) return { ok: false, error: error.message };
    return { ok: true, appointment_id: data.id, starts_at: data.starts_at };
  },
});

// ============================================================
// 3. cancelAppointment
// ============================================================

export const cancelAppointment = tool({
  description: 'Cancela una cita existente. Pedí motivo al paciente antes de llamar.',
  parameters: z.object({
    appointment_id: z.string().uuid(),
    reason: z.string(),
    cancelled_by: z.enum(['patient', 'doctor']).default('patient'),
  }),
  execute: async (args, { ctx }) => {
    const supabase = createServerClient();
    const { error } = await supabase
      .from('appointments')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        cancelled_by: args.cancelled_by,
        cancellation_reason: args.reason,
      })
      .eq('id', args.appointment_id)
      .eq('org_id', ctx.org_id);

    if (error) return { ok: false, error: error.message };
    return { ok: true };
  },
});

// ============================================================
// 4. rescheduleAppointment
// ============================================================

export const rescheduleAppointment = tool({
  description: 'Reagenda una cita: marca la antigua como rescheduled y crea una nueva.',
  parameters: z.object({
    appointment_id: z.string().uuid(),
    new_starts_at: z.string(),
    new_duration_min: z.number().default(30),
  }),
  execute: async (args, { ctx }) => {
    const supabase = createServerClient();
    // 1. Obtener la original
    const { data: orig } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', args.appointment_id)
      .eq('org_id', ctx.org_id)
      .single();
    if (!orig) return { ok: false, error: 'Cita no encontrada' };

    // 2. Marcar original
    await supabase
      .from('appointments')
      .update({ status: 'rescheduled' })
      .eq('id', args.appointment_id);

    // 3. Crear nueva
    const ends_at = new Date(new Date(args.new_starts_at).getTime() + args.new_duration_min * 60_000).toISOString();
    const { data: nuevo, error } = await supabase
      .from('appointments')
      .insert({
        org_id: orig.org_id,
        patient_id: orig.patient_id,
        doctor_id: orig.doctor_id,
        type: orig.type,
        reason: orig.reason,
        starts_at: args.new_starts_at,
        ends_at,
        status: 'scheduled',
        rescheduled_from: orig.id,
        created_via: 'whatsapp_ai',
      })
      .select()
      .single();

    if (error) return { ok: false, error: error.message };
    return { ok: true, new_appointment_id: nuevo.id };
  },
});

// ============================================================
// 5. getPatientHistory
// ============================================================

export const getPatientHistory = tool({
  description: 'Obtiene historial reciente de citas y encuentros del paciente. Útil para dar contexto.',
  parameters: z.object({
    patient_id: z.string().uuid(),
    limit: z.number().default(5),
  }),
  execute: async (args, { ctx }) => {
    const supabase = createServerClient();
    const { data: apts } = await supabase
      .from('appointments')
      .select('starts_at, status, type, reason')
      .eq('patient_id', args.patient_id)
      .eq('org_id', ctx.org_id)
      .order('starts_at', { ascending: false })
      .limit(args.limit);

    return { appointments: apts ?? [] };
  },
});

// ============================================================
// 6. findOrCreatePatient
// ============================================================

export const findOrCreatePatient = tool({
  description: 'Busca paciente por documento. Si no existe, lo crea (requiere consentimiento Ley 1581 declarado por el paciente).',
  parameters: z.object({
    document_number: z.string(),
    document_type: z.enum(['CC', 'TI', 'CE', 'PA', 'RC']).default('CC'),
    full_name: z.string(),
    phone: z.string(),
    birth_date: z.string().optional().describe('YYYY-MM-DD'),
    consent_data_treatment: z.boolean(),
  }),
  execute: async (args, { ctx }) => {
    const supabase = createServerClient();
    // 1. Buscar
    const { data: existing } = await supabase
      .from('patients')
      .select('*')
      .eq('org_id', ctx.org_id)
      .eq('document_number', args.document_number)
      .eq('document_type', args.document_type)
      .maybeSingle();

    if (existing) return { ok: true, patient_id: existing.id, created: false };

    if (!args.consent_data_treatment) {
      return { ok: false, error: 'Consentimiento Ley 1581 requerido para crear paciente.' };
    }

    // 2. Crear
    const { data, error } = await supabase
      .from('patients')
      .insert({
        org_id: ctx.org_id,
        document_type: args.document_type,
        document_number: args.document_number,
        full_name: args.full_name,
        phone: args.phone,
        birth_date: args.birth_date,
        consent_data_treatment: true,
        consent_signed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) return { ok: false, error: error.message };
    return { ok: true, patient_id: data.id, created: true };
  },
});

// ============================================================
// 7. escalateToHuman
// ============================================================

export const escalateToHuman = tool({
  description: 'Escala la conversación a un humano (doctor/asistente). Usá esto en urgencias, riesgo, queja, o cuando NO podés resolver.',
  parameters: z.object({
    conversation_id: z.string().uuid(),
    reason: z.enum([
      'urgencia_medica',
      'riesgo_suicida',
      'pregunta_clinica',
      'queja',
      'no_entiendo',
      'paciente_solicita_humano',
      'otro',
    ]),
    summary: z.string().describe('Resumen breve de qué pasa'),
    priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
  }),
  execute: async (args, { ctx }) => {
    const supabase = createServerClient();

    await supabase
      .from('conversations')
      .update({
        status: 'pending_human',
        ai_mode: 'off',
        metadata: { escalation_reason: args.reason, escalation_summary: args.summary, priority: args.priority },
      })
      .eq('id', args.conversation_id);

    // Notificar a doctores en línea (push, email, slack...)
    // implementación específica omitida aquí
    return { ok: true, escalated: true };
  },
});

// ============================================================
// 8. revokeConsent (Ley 1581)
// ============================================================

export const revokeConsent = tool({
  description: 'Revoca el consentimiento del paciente para tratamiento de datos. Marca la conversación como cerrada.',
  parameters: z.object({
    patient_id: z.string().uuid(),
    conversation_id: z.string().uuid(),
  }),
  execute: async (args, { ctx }) => {
    const supabase = createServerClient();
    await supabase
      .from('patients')
      .update({ consent_data_treatment: false })
      .eq('id', args.patient_id)
      .eq('org_id', ctx.org_id);

    await supabase
      .from('conversations')
      .update({ status: 'closed', ai_mode: 'off' })
      .eq('id', args.conversation_id);

    return { ok: true };
  },
});

// ============================================================
// EXPORT TOOLS BUNDLE
// ============================================================

export const ALL_TOOLS = {
  checkAvailability,
  createAppointment,
  cancelAppointment,
  rescheduleAppointment,
  getPatientHistory,
  findOrCreatePatient,
  escalateToHuman,
  revokeConsent,
};
