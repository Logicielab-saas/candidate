import { z } from "zod";

export const personalInfoSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  resume_uuid: z.string().min(1, "Veuillez sélectionner un CV"),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
