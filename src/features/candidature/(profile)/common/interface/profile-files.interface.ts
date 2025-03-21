export interface ProfileFiles {
  uuid: string;
  file: string;
  name: string;
  slug: string;
}

export interface ProfileFilesResponse {
  files: ProfileFiles[];
}
