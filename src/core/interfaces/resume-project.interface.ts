export interface ResumeProject {
  uuid: string;
  name: string;
  description: string | null;
  url: string | null;
  image: string | null;
  date_start: string;
  date_end: string;
  project_tasks: []; // TODO: add project task interface
}
