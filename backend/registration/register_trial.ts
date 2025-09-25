import { api, APIError } from "encore.dev/api";
import { registrationDB } from "./db";

export interface RegisterTrialRequest {
  parentName: string;
  childName: string;
  email: string;
  phone: string;
  childAge: string;
  grade?: string;
}

export interface RegisterTrialResponse {
  success: boolean;
  userId: number;
  message: string;
}

// Registers a new user for free trial
export const registerTrial = api<RegisterTrialRequest, RegisterTrialResponse>(
  { expose: true, method: "POST", path: "/register/trial" },
  async (req) => {
    // Validate required fields
    if (!req.parentName || !req.childName || !req.email || !req.phone || !req.childAge) {
      throw APIError.invalidArgument("Semua field wajib harus diisi");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.email)) {
      throw APIError.invalidArgument("Format email tidak valid");
    }

    // Validate phone format (Indonesian phone numbers)
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!phoneRegex.test(req.phone)) {
      throw APIError.invalidArgument("Format nomor telepon tidak valid");
    }

    // Check if email already exists
    const existingUser = await registrationDB.queryRow`
      SELECT id FROM users WHERE email = ${req.email}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("Email sudah terdaftar. Silakan gunakan email lain atau login.");
    }

    try {
      // Insert new user
      const result = await registrationDB.queryRow<{ id: number }>`
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
          ${parseInt(req.childAge)},
          ${req.grade || null},
          'trial',
          'active'
        ) RETURNING id
      `;

      if (!result) {
        throw APIError.internal("Gagal menyimpan data pendaftaran");
      }

      return {
        success: true,
        userId: result.id,
        message: "Pendaftaran trial berhasil! Silakan cek email untuk informasi lebih lanjut."
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw APIError.internal("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    }
  }
);
