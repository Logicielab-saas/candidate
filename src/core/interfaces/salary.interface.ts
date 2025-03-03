import { SalaryDisplayType, SalaryFrequency } from "../enums/salary.enum";

export interface SalaryInformation {
  displayType?: SalaryDisplayType;
  minSalary?: string;
  maxSalary?: string;
  frequency?: SalaryFrequency;
}
