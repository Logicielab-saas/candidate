import { Skill } from "./skill.interface";

export interface Profile {
  uuid: string;
  user_id: string;
  first_name: string;
  last_name: string;
  is_male: boolean;
  birthdate: string;
  address: string;
  city_uuid: string;
  country: string;
  postal_code: string;
  phone: string;
  profile_picture: File;
  bio: string;
  skills: Skill[];
  deleted_at: string;
}
