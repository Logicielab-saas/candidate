export interface LoginCredentials {
  email: string;
  password: string;
  user_type: "employee" | "recruiter";
  device_name?: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  user_type: "employee" | "recruiter";
  device_name: string;
}
