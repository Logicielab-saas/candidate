export interface JobApply {
  emploi_uuid: string;
  cover_letter: string | null;
  file: File | null;
  emploi_question_reponses: EmploiQuestionReponse[] | null;
}

export interface EmploiQuestionReponse {
  emploi_question_uuid: string;
  reponse: string | string[];
}

export type JobApplyFormData = FormData;
