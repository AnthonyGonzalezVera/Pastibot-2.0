import { api } from "./api";

export interface Reminder {
  id: number;
  time: string;
  days: string;
  label?: string;
  repeat: boolean;
  active: boolean;
}

export interface Medicine {
  id: number;
  name: string;
  dosage: string;
  stock?: number;
  qrData?: any;
  patientId?: number;
  caregiverId?: number;
  reminders?: Reminder[];
}

export const MedicinesAPI = {
  /** Obtener lista de medicamentos por paciente */
  listByPatient: (patientId: number) =>
    api<Medicine[]>(`/patients/${patientId}/medicines`),

  /** Crear medicamento */
  create: (payload: Partial<Medicine>) =>
    api<{ message: string; data: Medicine }>(`/medicines`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /** Actualizar medicamento */
  update: (id: number, payload: Partial<Medicine>) =>
    api<{ message: string; data: Medicine }>(`/medicines/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  /** Eliminar medicamento */
  delete: (id: number) =>
    api<{ message: string }>(`/medicines/${id}`, { method: "DELETE" }),

  /** Agregar recordatorio */
  addReminder: (
    id: number,
    payload: { time: string; days: string; label?: string; repeat?: boolean }
  ) =>
    api(`/medicines/${id}/reminders`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /** Dispensar manualmente */
  dispenseNow: (id: number) =>
    api<{ success: boolean; message: string }>(`/medicines/${id}/dispense-now`, {
      method: "POST",
    }),
};
