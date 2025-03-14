export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  user_type: "recruiter" | "employee";
  device_name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    user_type: "recruiter" | "employee";
    device_name: string;
  };
  token: string;
}
