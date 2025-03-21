export interface JobApply {
  emploi_uuid: string;
  cover_letter: string | null;
  file: File | null;
}

export type JobApplyFormData = FormData;
