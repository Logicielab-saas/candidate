import {
  ResumeCertifications,
  ResumeEducation,
  ResumeExperience,
  ResumeFile,
  ResumeLanguage,
} from ".";
import { ResumeProject } from "./resume-project.interface";
import { ResumeSkill } from "./resume-skill.interface";

export interface GetMeResponse {
  uuid: string;
  email: string;
  type: "recruiter" | "employee";
  device_name: string;
  name: string;
  first_name: string | null;
  last_name: string | null;
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
    resumeEducations: ResumeEducation[];
    resumeExperiences: ResumeExperience[];
    resumeProjects: ResumeProject[];
    resumeCertifications: ResumeCertifications[];
    resumeLanguages: ResumeLanguage[];
    resumeFiles: ResumeFile[];
    skills: ResumeSkill[];
  };
}
