export interface EmploiContract {
  name: string;
  uuid: string;
}

export interface EmploiCategory {
  title: string;
  uuid: string;
}

export interface EmploiType {
  title: string;
  uuid: string;
}

export interface Language {
  name: string;
  uuid: string;
  flag: string;
  rtl: boolean;
}

export interface SupportCategory {
  name: string;
  uuid: string;
}

export interface StaticData {
  emploi_contracts: EmploiContract[];
  emploi_categories: EmploiCategory[];
  emploi_types: EmploiType[];
  languages: Language[];
  support_categories: SupportCategory[];
}

export interface DataWebJsonResponse {
  message: string;
  data: {
    version: string;
    url: string;
  };
}
