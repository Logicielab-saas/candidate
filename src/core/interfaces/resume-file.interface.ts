export interface ResumeFile {
  uuid: string;
  file_url: string;
  name: string;
  slug: string;
  deleted_at: string | null;
}

export interface Files {
  uuid: string;
  name: string;
  slug: string;
  file: string;
  url_file: string;
  server: string;
  resume_uuid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface FilesResponse {
  files: Files[];
}
