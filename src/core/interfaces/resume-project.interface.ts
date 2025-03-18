export interface ResumeProject {
  uuid: string;
  name: string;
  description: string | null;
  url: string | null;
  image: string | File[] | null;
  date_start: string;
  date_end: string | null;
  tasks: ProjectTask[] | null;
}

export interface ProjectTask {
  uuid: string;
  name: string;
  description: string | null;
  status: "In Progress" | "Completed";
}
