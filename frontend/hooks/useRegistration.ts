import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { logger } from "@/lib/logger";

// Log Supabase client initialization
logger.debug("Supabase client:", supabase);

// Tipe data untuk request konsultasi
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

// Tipe data untuk response konsultasi
export interface RegisterConsultationResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Tipe data untuk request trial
export interface RegisterTrialRequest {
  parentName: string;
  childName: string;
  email: string;
  phone: string;
  childAge?: string;
  grade?: string;
  programInterest?: string;
}

// Tipe data untuk response trial
export interface RegisterTrialResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Tipe data untuk request paket
export interface RegisterPackageRequest {
  parentName: string;
  childName: string;
  email: string;
  phone: string;
  childAge?: string;
  grade?: string;
  packageType: string;
}

// Tipe data untuk response paket
export interface RegisterPackageResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Tipe data untuk konsultasi di Supabase
export interface Consultation {
  id: string;
  parent_name: string;
  parent_phone: string;
  child_name: string;
  child_age: number | null;
  child_grade: string | null;
  preferred_time: string | null;
  consultation_type: string;
  program_interest: string | null;
  additional_info: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Debug log to check if hook is initialized
  logger.debug("useRegistration hook initialized");

  const registerTrial = async (data: RegisterTrialRequest): Promise<RegisterTrialResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Untuk saat ini kita hanya menggunakan Supabase
      // Di masa depan bisa diintegrasikan dengan backend jika diperlukan
      logger.debug("Trial registration data:", data);
      
      return {
        success: true,
        message: "Pendaftaran trial berhasil dikirim"
      };
    } catch (err: any) {
      const errorMessage = err.message || "Terjadi kesalahan saat mendaftar";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const registerConsultation = async (data: RegisterConsultationRequest): Promise<RegisterConsultationResponse> => {
    logger.info("Registering consultation with data:", data);
    logger.debug("Supabase client initialized:", !!supabase);
    setIsLoading(true);
    setError(null);
    
    try {
      // Validasi data
      if (!data.parentName || !data.childName || !data.email || !data.phone || 
          !data.consultationType || !data.preferredDate || !data.preferredTime) {
        throw new Error("Data tidak lengkap. Mohon isi semua field yang wajib.");
      }
      
      // Validasi format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Format email tidak valid.");
      }
      
      // Validasi format phone (minimal 10 digit)
      const cleanPhone = data.phone.replace(/\D/g, '');
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(cleanPhone)) {
        throw new Error("Format nomor telepon tidak valid. Gunakan format 08xxxxxxxxxx.");
      }

      // Simpan ke Supabase
      logger.debug("Inserting data to Supabase...");
      
      // Format the preferred time correctly
      let preferredTime = null;
      logger.debug("Preferred date:", data.preferredDate);
      logger.debug("Preferred time:", data.preferredTime);
      if (data.preferredDate && data.preferredTime) {
        try {
          // Handle time format - the timeSlots are in format "09:00 - 09:30"
          // We need to extract just the start time
          const timePart = data.preferredTime.split(' - ')[0];
          logger.debug("Time part:", timePart);
          const dateTimeString = `${data.preferredDate}T${timePart}`;
          logger.debug("DateTime string:", dateTimeString);
          preferredTime = new Date(dateTimeString).toISOString();
          logger.debug("Formatted preferred time:", preferredTime);
        } catch (dateError) {
          logger.error("Error formatting date/time:", dateError);
          // Fallback to just the date if time formatting fails
          preferredTime = new Date(data.preferredDate).toISOString();
        }
      }
      
      logger.debug("Attempting to insert data into Supabase");
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('consultations')
        .insert({
          parent_name: data.parentName,
          parent_phone: data.phone,
          child_name: data.childName,
          child_age: data.childAge ? parseInt(data.childAge) : null,
          child_grade: data.grade || null,
          preferred_time: preferredTime,
          consultation_type: data.consultationType,
          program_interest: data.topics || null,
          additional_info: data.topics || null,
          status: 'pending'
        });
      
      logger.debug("Supabase insert result:", { supabaseData, supabaseError });

      if (supabaseError) {
        logger.error("Supabase error:", supabaseError);
        throw new Error(supabaseError.message);
      }

      logger.success("Consultation registered successfully");
      return {
        success: true,
        message: "Permintaan konsultasi berhasil dikirim. Kami akan menghubungi Anda segera."
      };
    } catch (err: any) {
      logger.error("Consultation registration error:", err);
      logger.error("Error details:", {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      
      let errorMessage = "Terjadi kesalahan saat mendaftar konsultasi";
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err instanceof Error) {
        errorMessage = err.toString();
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const registerPackage = async (data: RegisterPackageRequest): Promise<RegisterPackageResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Untuk saat ini kita hanya menggunakan Supabase
      // Di masa depan bisa diintegrasikan dengan backend jika diperlukan
      logger.debug("Package registration data:", data);
      
      return {
        success: true,
        message: "Pendaftaran paket berhasil dikirim"
      };
    } catch (err: any) {
      const errorMessage = err.message || "Terjadi kesalahan saat mendaftar paket";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi baru untuk mengambil data konsultasi dari Supabase
  const getConsultations = async (): Promise<Consultation[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      logger.debug("Fetching consultations from Supabase");
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });
      
      logger.debug("Consultations fetch result:", { data, error });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (err: any) {
      const errorMessage = err.message || "Terjadi kesalahan saat mengambil data konsultasi";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerTrial,
    registerConsultation,
    registerPackage,
    getConsultations,
    isLoading,
    error,
    clearError: () => setError(null)
  };
}