import * as z from "zod";

const partTimeDetailsSchema = z.object({
  scheduleType: z.enum(["fixed", "range", "maximum", "minimum"]).optional(),
  hoursPerWeek: z
    .string()
    .regex(/^\d+$/, "Veuillez entrer un nombre valide")
    .optional(),
});

const durationDetailsSchema = z.object({
  duration: z.string().min(1, "La durée est requise"),
  unit: z.enum(["days", "weeks", "months"]),
});

export const formSchema = z.object({
  contractType: z.string().min(1, "Sélectionnez un type de contrat"),
  partTimeDetails: partTimeDetailsSchema.optional(),
  interimDetails: durationDetailsSchema.optional(),
  cddDetails: durationDetailsSchema.optional(),
});

export type JobTypeForm = z.infer<typeof formSchema>;
export type PartTimeDetails = z.infer<typeof partTimeDetailsSchema>;
export type DurationDetails = z.infer<typeof durationDetailsSchema>;