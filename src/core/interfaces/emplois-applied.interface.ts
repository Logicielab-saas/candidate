import type { Emplois } from "./emplois.interface";

export interface EmploisApplied {
  uuid: string;
  cover_letter: string | null;
  file: string | null;
  resume_uuid: string;
  apply: boolean;
  status: string;
  status_employee: string;
  status_recruiter: string;
  slug: string;
  applied_at: string;
  emploi: Emplois;
}
