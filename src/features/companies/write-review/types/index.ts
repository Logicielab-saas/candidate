import { z } from "zod";

export const reviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  summary: z.string().min(10, "Le résumé doit contenir au moins 10 caractères"),
  comment: z
    .string()
    .min(30, "L'avis doit contenir au moins 30 caractères")
    .max(200, "L'avis ne doit pas dépasser 200 caractères"),
  positivePoints: z.array(z.string()),
  negativePoints: z.array(z.string()),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
