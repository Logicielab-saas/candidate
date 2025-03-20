import type { Files } from "@/core/interfaces";

export interface Profile {
  uuid: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  is_male: boolean | null;
  birthdate: string | null;
  address: string | null;
  city_uuid: string | null;
  country: string | null;
  postal_code: string | null;
  phone: string | null;
  image: File | null;
  bio: string | null;
  skills: string[] | null;
  resume_files: Files[] | null;
  deleted_at: string | null;
}
