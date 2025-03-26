import type { Emplois } from "./emplois.interface";

export interface EmploiSaved {
  uuid: string;
  saved_at: string;
  emploi: Emplois;
}
