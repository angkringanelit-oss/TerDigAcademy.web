import { api } from "encore.dev/api";
import { registrationDB } from "./db";

export interface Consultation {
  id: number;
  userId: number | null;
  parentName: string;
  childName: string;
  email: string;
  phone: string;
  childAge: number | null;
  grade: string | null;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  topics: string | null;
  status: string;
  createdAt: string;
}

export interface GetConsultationsResponse {
  consultations: Consultation[];
  total: number;
}

// Gets all consultation appointments
export const getConsultations = api<void, GetConsultationsResponse>(
  { expose: true, method: "GET", path: "/consultations" },
  async () => {
    const consultations = await registrationDB.queryAll<{
      id: number;
      user_id: number | null;
      parent_name: string;
      child_name: string;
      email: string;
      phone: string;
      child_age: number | null;
      grade: string | null;
      consultation_type: string;
      preferred_date: string;
      preferred_time: string;
      topics: string | null;
      status: string;
      created_at: string;
    }>`
      SELECT 
        id,
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
        status,
        created_at
      FROM consultations 
      ORDER BY preferred_date ASC, preferred_time ASC
    `;

    const formattedConsultations: Consultation[] = consultations.map(consultation => ({
      id: consultation.id,
      userId: consultation.user_id,
      parentName: consultation.parent_name,
      childName: consultation.child_name,
      email: consultation.email,
      phone: consultation.phone,
      childAge: consultation.child_age,
      grade: consultation.grade,
      consultationType: consultation.consultation_type,
      preferredDate: consultation.preferred_date,
      preferredTime: consultation.preferred_time,
      topics: consultation.topics,
      status: consultation.status,
      createdAt: consultation.created_at
    }));

    return {
      consultations: formattedConsultations,
      total: formattedConsultations.length
    };
  }
);
