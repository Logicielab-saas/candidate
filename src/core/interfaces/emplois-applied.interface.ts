import type { Emplois } from "./emplois.interface";

export interface EmploisApplied {
  uuid: string;
  cover_letter: string | null;
  file: string | null;
  resume_uuid: string;
  apply: boolean;
  status: string;
  emploi: Emplois;
}
