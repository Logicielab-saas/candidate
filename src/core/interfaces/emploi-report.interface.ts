export interface ReportEmploi {
  uuid: string;
  emploi_uuid: string;
  emploi_title: string;
  reported_by_uuid: string;
  reported_by_name: string;
  reason: string;
  status?: string;
  message?: string;
}

export interface CreateReportEmploi {
  emploi_uuid: string;
  reason: string;
  message?: string;
}
