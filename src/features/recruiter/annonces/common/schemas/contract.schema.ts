import * as z from "zod";
import { ContractDurationUnit, ContractScheduleType } from "../enums/contract.enum";

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

export const jobTypeFormSchema = z.object({
  contractType: z.string().min(1, "Sélectionnez un type de contrat"),
  partTimeDetails: partTimeDetailsSchema.optional(),
  interimDetails: durationDetailsSchema.optional(),
  cddDetails: durationDetailsSchema.optional(),
});

export type JobTypeForm = z.infer<typeof jobTypeFormSchema>;