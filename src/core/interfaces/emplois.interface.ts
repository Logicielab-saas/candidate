import { Skills } from "./skills.interface";

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
  type: EmploisTypes[];
  skills: Skills[];
  contracts: EmploisContracts[];
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
