import type { Skill } from "../../features/candidature/(profile)/common/interface";
import type { ResumeEducation } from "./resume-education.interface";
import type { ResumeExperience } from "./resume-experience.interface";
import type { ResumeProject } from "./resume-project.interface";
import type { ResumeCertifications } from "./resume-certifications.interface";
import type { ResumeLanguage } from "./resume-language.interface";
import type { ResumeFile } from "./resume-file.interface";

export interface Resume {
  uuid: string;
  token: string;
  refresh_token: string | null;
  type: "employee" | "recruiter";
  first_name: string | null;
  last_name: string | null;
  email: string;
  device_name: string | null;
  device_uuid: string | null;
  phone: string | null;
  image: string | null;
  address: string | null;
  birthdate: string | null;
  IsMale: boolean | null;
  resume: {
    uuid: string;
    description: string | null;
    resumeEducations: ResumeEducation[];
    resumeExperiences: ResumeExperience[];
    resumeProjects: ResumeProject[];
    resumeCertifications: ResumeCertifications[];
    resumeLanguages: ResumeLanguage[];
    resumeFiles: ResumeFile[];
    skills: Skill[];
  };
}
