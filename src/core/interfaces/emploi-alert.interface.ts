export interface EmploiAlert {
  uuid: number;
  skill_uuid: string | null;
  city_uuid: string | null;
  emploi_category_uuid: string | null; // atleast one of three is required
  active: boolean;
}

export interface EmploiAlertResponse {
  message: string;
  alert: EmploiAlert[];
}
