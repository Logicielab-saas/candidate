"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  contractType: z.string().min(1, "Sélectionnez un type de contrat"),
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
      if (value.contractType) {
        setJobTypeInformation({ contractType: value.contractType });
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
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-1">
                      Type de poste
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-2"
                      >
                        {CONTRACT_TYPES.map((type) => (
                          <div key={type.id} className="relative">
                            <RadioGroupItem
                              value={type.id}
                              id={type.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={type.id}
                              className={cn(
                                "inline-flex items-center gap-2 cursor-pointer rounded-md border px-3 py-1.5 text-sm",
                                "hover:border-primaryHex-500 hover:bg-primaryHex-50/50",
                                field.value === type.id
                                  ? "border-primaryHex-500 bg-primaryHex-50 text-primaryHex-900"
                                  : "border-input bg-background",
                                "transition-all duration-150 ease-in-out"
                              )}
                            >
                              <div className="relative w-3.5 h-3.5">
                                <Plus
                                  className={cn(
                                    "absolute inset-0 h-3.5 w-3.5 text-muted-foreground",
                                    field.value === type.id
                                      ? "opacity-0"
                                      : "opacity-100",
                                    "transition-opacity"
                                  )}
                                />
                                <Check
                                  className={cn(
                                    "absolute inset-0 h-3.5 w-3.5 text-primaryHex-500",
                                    field.value === type.id
                                      ? "opacity-100"
                                      : "opacity-0",
                                    "transition-opacity"
                                  )}
                                />
                              </div>
                              <span className="text-sm font-medium leading-none">
                                {type.label}
                              </span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
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
        onNext={nextStep}
        canProceed={canProceed()}
      />
    </div>
  );
}
