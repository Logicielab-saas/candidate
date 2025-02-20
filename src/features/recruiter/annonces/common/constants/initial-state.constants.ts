import { BaseInformation } from "../interfaces/base-information.interface";
import { JobTypeInformation } from "../interfaces/contract.interface";
import { SalaryInformation } from "../interfaces/salary.interface";

export const INITIAL_BASE_INFORMATION: BaseInformation = {
  jobTitle: "",
  numberOfPeople: "",
  promotionLocation: "",
};

export const INITIAL_JOB_TYPE_INFORMATION: JobTypeInformation = {
  contractTypes: [],
};

export const INITIAL_SALARY_INFORMATION: SalaryInformation = {
  displayType: undefined,
  minSalary: "",
  maxSalary: "",
  frequency: undefined,
};