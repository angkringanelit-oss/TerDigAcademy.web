import { api, APIError } from "encore.dev/api";
import { registrationDB } from "./db";

export interface RegisterConsultationRequest {
  parentName: string;
  childName: string;
  email: string;
  phone: string;
  childAge?: string;
  grade?: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  topics?: string;
}

export interface RegisterConsultationResponse {
  success: boolean;
  consultationId: number;
  message: string;
}

// Registers a new consultation appointment
export const registerConsultation = api<RegisterConsultationRequest, RegisterConsultationResponse>(
  { expose: true, method: "POST", path: "/register/consultation" },
  async (req) => {
    // Validate required fields
    if (!req.parentName || !req.childName || !req.email || !req.phone || 
        !req.consultationType || !req.preferredDate || !req.preferredTime) {
      throw APIError.invalidArgument("Semua field wajib harus diisi");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.email)) {
      throw APIError.invalidArgument("Format email tidak valid");
    }

    // Validate phone format
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!phoneRegex.test(req.phone)) {
      throw APIError.invalidArgument("Format nomor telepon tidak valid");
    }

    // Validate date (must be in the future)
    const selectedDate = new Date(req.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      throw APIError.invalidArgument("Tanggal konsultasi harus di masa depan");
    }

    // Check if time slot is available
    const existingConsultation = await registrationDB.queryRow`
      SELECT id FROM consultations 
      WHERE preferred_date = ${req.preferredDate} 
      AND preferred_time = ${req.preferredTime}
      AND status = 'scheduled'
    `;

    if (existingConsultation) {
      throw APIError.alreadyExists("Slot waktu tersebut sudah terisi. Silakan pilih waktu lain.");
    }

    try {
      // Check if user exists, if not create one
      let userId = null;
      const existingUser = await registrationDB.queryRow<{ id: number }>`
        SELECT id FROM users WHERE email = ${req.email}
      `;

      if (existingUser) {
        userId = existingUser.id;
      } else {
        // Create new user
        const newUser = await registrationDB.queryRow<{ id: number }>`
          INSERT INTO users (
            parent_name, 
            child_name, 
            email, 
            phone, 
            child_age, 
            grade, 
            registration_type,
            status
          ) VALUES (
            ${req.parentName},
            ${req.childName},
            ${req.email},
            ${req.phone},
            ${req.childAge ? parseInt(req.childAge) : null},
            ${req.grade || null},
            'consultation',
            'active'
          ) RETURNING id
        `;
        
        if (newUser) {
          userId = newUser.id;
        }
      }

      // Insert consultation
      const result = await registrationDB.queryRow<{ id: number }>`
        INSERT INTO consultations (
          user_id,
          parent_name, 
          child_name, 
          email, 
          phone, 
          child_age, 
          grade, 
          consultation_type,
          preferred_date,
          preferred_time,
          topics,
          status
        ) VALUES (
          ${userId},
          ${req.parentName},
          ${req.childName},
          ${req.email},
          ${req.phone},
          ${req.childAge ? parseInt(req.childAge) : null},
          ${req.grade || null},
          ${req.consultationType},
          ${req.preferredDate},
          ${req.preferredTime},
          ${req.topics || null},
          'scheduled'
        ) RETURNING id
      `;

      if (!result) {
        throw APIError.internal("Gagal menyimpan data konsultasi");
      }

      return {
        success: true,
        consultationId: result.id,
        message: "Konsultasi berhasil dijadwalkan! Tim kami akan menghubungi Anda segera."
      };
    } catch (error) {
      console.error("Consultation registration error:", error);
      throw APIError.internal("Terjadi kesalahan saat mendaftar konsultasi. Silakan coba lagi.");
    }
  }
);
