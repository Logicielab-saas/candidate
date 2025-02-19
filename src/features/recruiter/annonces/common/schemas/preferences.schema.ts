import * as z from "zod";

export const preferencesFormSchema = z.object({
  notificationEmails: z
    .array(
      z.object({
        value: z.string().email("Adresse email invalide"),
      })
    )
    .min(1, "Au moins une adresse email est requise"),
  notifyOnNewApplication: z.boolean(),
  requireResume: z.boolean(),
  allowCandidateContact: z.boolean(),
  hasDeadline: z.boolean(),
  deadline: z.string().optional(),
});

export type PreferencesForm = z.infer<typeof preferencesFormSchema>;