import { ContractDurationUnit, ContractScheduleType } from "../enums/contract.enum";

export interface PartTimeDetails {
  scheduleType?: ContractScheduleType;
  hoursPerWeek?: string;
}

export interface DurationDetails {
  duration: string;
  unit: ContractDurationUnit;
}

export interface JobTypeInformation {
  contractType: string;
  partTimeDetails?: PartTimeDetails;
  interimDetails?: DurationDetails;
  cddDetails?: DurationDetails;
}