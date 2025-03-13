import { z } from "zod";

export const reviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  comment: z.string().min(30, "Review must be at least 30 characters"),
  positivePoints: z.array(z.string()),
  negativePoints: z.array(z.string()),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
