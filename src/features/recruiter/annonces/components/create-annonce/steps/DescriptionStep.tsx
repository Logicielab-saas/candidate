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
import { Button } from "@/components/ui/button";

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

interface DescriptionStepProps {
  isDialog?: boolean;
  onDialogClose?: () => void;
}

export function DescriptionStep({
  isDialog = false,
  onDialogClose,
}: DescriptionStepProps) {
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

  // Update description in store when it changes - only in non-dialog mode
  const { watch } = form;
  useEffect(() => {
    if (isDialog) return; // Skip the effect in dialog mode

    const subscription = watch((value) => {
      if (value.description) {
        setDescription(value.description);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setDescription, isDialog]);

  const onSubmit = (data: DescriptionForm) => {
    // Save the description
    setDescription(data.description);

    // Show success toast and proceed
    toast({
      title: "Description enregistrée",
      description: "La description du poste a été enregistrée avec succès.",
      variant: "success",
    });

    if (isDialog) {
      onDialogClose?.();
    } else {
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {!isDialog && (
        <HeaderSectionStepsForm
          title="Description du poste"
          description="Décrivez le poste et les compétences requises"
        />
      )}

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

      {isDialog ? (
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onDialogClose}>
            Annuler
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>
            Enregistrer les modifications
          </Button>
        </div>
      ) : (
        <FormStepsNavigation
          onPrevious={previousStep}
          onNext={form.handleSubmit(onSubmit)}
          canProceed={!form.formState.errors.description}
          showPreview
        />
      )}
    </div>
  );
}
