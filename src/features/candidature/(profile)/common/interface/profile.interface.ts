export interface ProfileFiles {
  uuid: string;
  file: string;
  name: string;
  slug: string;
}

export interface Profile {
  uuid: string;
  type_user: string;
  first_name: string | null;
  last_name: string | null;
  is_male: boolean | null;
  birthdate: string | null;
  address: string | null;
  city_uuid: string | null;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  phone: string | null;
  image: File | null;
  bio: string | null;
  name: string;
  email: string;
  deleted_at: string | null;
  skills: string[] | null;
  files: ProfileFiles[];
}
