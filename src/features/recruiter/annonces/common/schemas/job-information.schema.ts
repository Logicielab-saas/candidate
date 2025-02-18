import * as z from "zod";
import { ContractDurationUnit, ContractScheduleType } from "../enums/contract.enum";
import { SalaryDisplayType, SalaryFrequency } from "../enums/salary.enum";

const partTimeDetailsSchema = z.object({
  scheduleType: z.nativeEnum(ContractScheduleType).optional(),
  hoursPerWeek: z
    .string()
    .regex(/^\d+$/, "Veuillez entrer un nombre valide")
    .optional(),
});

const durationDetailsSchema = z.object({
  duration: z.string().min(1, "La durée est requise"),
  unit: z.nativeEnum(ContractDurationUnit),
});

export const jobInformationFormSchema = z.object({
  // Base Information
  jobTitle: z.string().min(1, "L'intitulé du poste est requis"),
  numberOfPeople: z.string().min(1, "Le nombre de personnes est requis"),
  promotionLocation: z.string().min(1, "La ville est requise"),

  // Job Type
  contractType: z.string().min(1, "Sélectionnez un type de contrat"),
  partTimeDetails: partTimeDetailsSchema.optional(),
  interimDetails: durationDetailsSchema.optional(),
  cddDetails: durationDetailsSchema.optional(),
  internshipDetails: durationDetailsSchema.optional(),

  // Salary
  displayType: z.nativeEnum(SalaryDisplayType).optional(),
  minSalary: z.string().optional(),
  maxSalary: z.string().optional(),
  frequency: z.nativeEnum(SalaryFrequency).optional(),
});

export type JobInformationForm = z.infer<typeof jobInformationFormSchema>;