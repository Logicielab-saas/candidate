import { ContractDurationUnit, ContractScheduleType } from "../enums/";

export interface PartTimeDetails {
  scheduleType?: ContractScheduleType;
  hoursPerWeek?: string;
}

export interface DurationDetails {
  duration: string;
  unit: ContractDurationUnit;
}

export interface JobTypeInformation {
  contractTypes: string[];
  partTimeDetails?: PartTimeDetails;
  interimDetails?: DurationDetails;
  cddDetails?: DurationDetails;
  internshipDetails?: DurationDetails;
}
