export interface RecruiterAuthResponse {
  uuid: string;
  email: string;
  type: "recruiter" | "employee";
  device_name: string;
  name: string;
  token: string;
  refresh_token: string | null;
  device_uuid: string;
  phone: string | null;
  city: string | null;
  image: string | null;
  address: string | null;
  company_uuid: string;
  website: string | null;
  description: string | null;
  specialisation: string | null;
  ice: string | null;
  rc: string | null;
}
