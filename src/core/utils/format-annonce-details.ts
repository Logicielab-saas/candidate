import type { JobTypeInformation, SalaryInformation } from "../interfaces";
import { SalaryDisplayType } from "../enums";

export function formatSalary(salaryInformation: SalaryInformation) {
  if (salaryInformation?.displayType === SalaryDisplayType.RANGE) {
    return `${salaryInformation.minSalary}€ - ${salaryInformation.maxSalary}€ ${
      salaryInformation.frequency === "monthly"
        ? "par mois"
        : salaryInformation.frequency === "yearly"
        ? "par an"
        : "par heure"
    }`;
  }
  return "À négocier";
}

export function formatSchedule(jobTypeInformation: JobTypeInformation) {
  if (jobTypeInformation.partTimeDetails) {
    const { hoursPerWeek, scheduleType } = jobTypeInformation.partTimeDetails;
    return `${hoursPerWeek}h/semaine - ${
      scheduleType === "fixed" ? "Horaires fixes" : "Horaires flexibles"
    }`;
  }
  return "Temps plein";
}

export function formatDuration(jobTypeInformation: JobTypeInformation) {
  if (jobTypeInformation.cddDetails) {
    return `${jobTypeInformation.cddDetails.duration} mois`;
  }
  if (jobTypeInformation.internshipDetails) {
    return `${jobTypeInformation.internshipDetails.duration} mois`;
  }
  if (jobTypeInformation.interimDetails) {
    return `${jobTypeInformation.interimDetails.duration} mois`;
  }
  return "CDI";
}
