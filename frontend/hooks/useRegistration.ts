import { useState } from "react";
import backend from "~backend/client";
import type { RegisterTrialRequest, RegisterTrialResponse } from "~backend/registration/register_trial";
import type { RegisterConsultationRequest, RegisterConsultationResponse } from "~backend/registration/register_consultation";
import type { RegisterPackageRequest, RegisterPackageResponse } from "~backend/registration/register_package";

export function useRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerTrial = async (data: RegisterTrialRequest): Promise<RegisterTrialResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await backend.registration.registerTrial(data);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || "Terjadi kesalahan saat mendaftar";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const registerConsultation = async (data: RegisterConsultationRequest): Promise<RegisterConsultationResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await backend.registration.registerConsultation(data);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || "Terjadi kesalahan saat mendaftar konsultasi";
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
      const response = await backend.registration.registerPackage(data);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || "Terjadi kesalahan saat mendaftar paket";
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
    isLoading,
    error,
    clearError: () => setError(null)
  };
}
