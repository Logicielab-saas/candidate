"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "../../../store/create-annonce-store";
import { useEffect } from "react";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  contractType: z
    .array(z.string())
    .min(1, "Sélectionnez au moins un type de contrat"),
});

type JobTypeForm = z.infer<typeof formSchema>;

const CONTRACT_TYPES = [
  { id: "full-time", label: "Temps plein" },
  { id: "part-time", label: "Temps partiel" },
  { id: "cdi", label: "CDI" },
  { id: "interim", label: "Intérim" },
  { id: "cdd", label: "CDD" },
  { id: "freelance", label: "Profession libérale" },
  { id: "internship", label: "Stage" },
  { id: "apprenticeship", label: "Apprentissage/Alternance" },
];

export function JobTypeStep() {
  const {
    jobTypeInformation,
    setJobTypeInformation,
    previousStep,
    nextStep,
    canProceed,
  } = useCreateAnnonceStore();

  const form = useForm<JobTypeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contractType: jobTypeInformation.contractType,
    },
    mode: "onChange",
  });

  // Update store when form values change
  const { watch } = form;
  useEffect(() => {
    const subscription = watch((value) => {
      const contractTypes = value.contractType || [];
      if (contractTypes.length > 0) {
        setJobTypeInformation({ contractType: contractTypes as string[] });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setJobTypeInformation]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Type de poste"
        description="Sélectionnez le type de contrat pour votre offre"
      />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="contractType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Type de poste
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {CONTRACT_TYPES.map((type) => (
                        <Badge
                          key={type.id}
                          variant="outline"
                          className={cn(
                            "cursor-pointer hover:bg-primary/10 transition-colors py-2 px-4",
                            field.value?.includes(type.id) &&
                              "bg-primary text-primary-foreground hover:bg-primary/90"
                          )}
                          onClick={() => {
                            const currentValue = field.value || [];
                            const newValue = currentValue.includes(type.id)
                              ? currentValue.filter((v) => v !== type.id)
                              : [...currentValue, type.id];
                            field.onChange(newValue);
                          }}
                        >
                          {type.label}
                        </Badge>
                      ))}
                    </div>
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
        onNext={nextStep}
        canProceed={canProceed()}
      />
    </div>
  );
}
