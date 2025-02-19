"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "../../../store/create-annonce-store";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tiptap } from "@/components/ui/tiptap";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const descriptionFormSchema = z.object({
  description: z
    .string()
    .min(50, "La description doit contenir au moins 50 caractères")
    .refine((value) => value.trim() !== "", "La description est requise")
    .refine((value) => {
      // Remove HTML tags to count actual content length
      const textContent = value.replace(/<[^>]*>/g, "");
      return textContent.length >= 50;
    }, "La description doit contenir au moins 50 caractères de texte"),
});

type DescriptionForm = z.infer<typeof descriptionFormSchema>;

export function DescriptionStep() {
  const { description, setDescription, previousStep, nextStep } =
    useCreateAnnonceStore();
  const { toast } = useToast();

  const form = useForm<DescriptionForm>({
    resolver: zodResolver(descriptionFormSchema),
    defaultValues: {
      description: description || "",
    },
    mode: "onChange", // Enable real-time validation
  });

  // Update description in store when it changes
  const { watch } = form;
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.description) {
        setDescription(value.description);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setDescription]);

  const onSubmit = (data: DescriptionForm) => {
    // Log the raw HTML content
    console.log("Raw HTML Description:", data.description);

    // Log the text content (without HTML tags)
    const textContent = data.description.replace(/<[^>]*>/g, "");
    console.log("Text Content:", textContent);
    console.log("Text Content Length:", textContent.length);

    // Save the description immediately when it changes
    setDescription(data.description);

    // Show success toast and proceed to next step
    toast({
      title: "Description enregistrée",
      description: "La description du poste a été enregistrée avec succès.",
      variant: "success",
    });
    nextStep();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Description du poste"
        description="Décrivez le poste et les compétences requises"
      />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Description du poste
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Tiptap
                        description={field.value}
                        onChange={field.onChange}
                        placeholder="Décrivez le poste, les responsabilités, et les compétences requises... (minimum 50 caractères)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={form.handleSubmit(onSubmit)}
        canProceed={!form.formState.errors.description}
        showPreview
      />
    </div>
  );
}
