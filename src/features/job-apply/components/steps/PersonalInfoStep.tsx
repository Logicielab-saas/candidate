/**
 * PersonalInfoStep - Second step of the job application process
 *
 * Allows users to input and modify their personal information
 * Includes validation for required fields and proper formats
 * Pre-fills data from the store if available
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useJobApplyStore } from "../../store/useJobApplyStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Form validation schema
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z
    .string()
    .regex(/^(\+\d{1,4}|0)[1-9](\d{8})$/, "Numéro de téléphone invalide"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export function PersonalInfoStep() {
  const {
    personalInfo,
    setPersonalInfo,
    nextStep,
    prevStep,
    resumeData,
    experienceData,
  } = useJobApplyStore();

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      email: personalInfo.email,
      phone: personalInfo.phone,
      address: personalInfo.address,
    },
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    // Log current step data
    console.log("Current Step (Personal Info):", data);

    // Update store
    setPersonalInfo(data);

    // Log global application data
    console.log("Global Application Data:", {
      resume: resumeData,
      personalInfo: data,
      experience: experienceData,
    });

    nextStep();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Informations personnelles
        </CardTitle>
        <CardDescription>
          Renseignez vos informations de contact pour la candidature
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jean.dupont@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="0612345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 rue de la République, 75001 Paris"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>

            <Button
              type="submit"
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              Continuer
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
