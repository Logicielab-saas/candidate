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
  uuid: string;
  email: string;
  type: "recruiter" | "employee";
  device_name: string;
  name: string;
  token: string;
  refresh_token: string | null;
  device_uuid: string;
  phone: string | null;
  image: string | null;
  address: string | null;
  birthdate: string | null;
  isMale: boolean | null;
  resume: {
    uuid: string;
    description: string | null;
    resumeEducations: []; // TODO: Define a more Education type if available
    resumeExperiences: []; // TODO: Define a more Experience type if available
    resumeProjects: []; // TODO: Define a more Project type if available
    resumeCertifications: []; // TODO: Define a more Certification type if available
    resumeLanguages: []; // TODO: Define a more Language type if available
    resumeFiles: []; // TODO: Define a more File type if available
    skills: []; // TODO: Define a more Skill type if available
  };
}
