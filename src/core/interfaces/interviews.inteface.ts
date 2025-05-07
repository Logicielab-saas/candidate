import type { InterviewType } from "@/core/types";

export interface Interview {
  interview_uuid: string;
  emploi_apply_uuid: string;
  company_logo: string;
  company_name: string;
  slug: string;
  emploi_uuid: string;
  emploi_title: string;
  user_uuid: string;
  user_name: string;
  date_inter: string; // 2025-05-05 10:00:00 format
  description: string | null;
  address: string | null;
  time: string | null;
  type: InterviewType;
  interview_status: "pending" | "rejected" | "accepted";
  city_name: string | null;
}

export interface InterviewResponse {
  message: string;
  interviews: Interview[];
}
