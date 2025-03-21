export interface Emplois {
  uuid: string;
  title: string;
  city_name: string;
  company_name: string;
  slug: string;
  status: "closed" | "open";
  company_logo: string;
  postule: number;
  views: number;
  type: string[];
  skills: string[];
  contracts: string[];
  saved: boolean;
  applied: boolean;
}

export interface EmploisContracts {
  uuid: string;
  name: string;
}

export interface EmploisTypes {
  uuid: string;
  title: string;
}

export interface EmploisCategories {
  uuid: string;
  title: string;
}

export interface EmploisQuestions {
  uuid: string;
  title: string;
  description: string;
  is_required: boolean;
  type: string | null;

  is_multiple: boolean;
  options: string[] | null;
}
