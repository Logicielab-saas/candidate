"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import type { JobTypeInformation } from "../../../store/create-annonce-store";
import { useEffect } from "react";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { formSchema, JobTypeForm } from "./job-type/types";
import { ContractDurationDetails } from "./job-type/ContractDurationDetails";
import { PartTimeDetails } from "./job-type/PartTimeDetails";

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
      partTimeDetails: jobTypeInformation.partTimeDetails,
      interimDetails: jobTypeInformation.interimDetails,
      cddDetails: jobTypeInformation.cddDetails,
    },
    mode: "onChange",
  });

  // Update store when form values change
  const formValues = useWatch({
    control: form.control,
  });

  useEffect(() => {
    if (formValues) {
      const formData: JobTypeInformation = {
        contractType: formValues.contractType || "",
      };

      // Only include partTimeDetails if it exists and has at least one field filled
      if (
        formValues.partTimeDetails &&
        (formValues.partTimeDetails.scheduleType ||
          formValues.partTimeDetails.hoursPerWeek)
      ) {
        formData.partTimeDetails = {
          scheduleType: formValues.partTimeDetails.scheduleType,
          hoursPerWeek: formValues.partTimeDetails.hoursPerWeek?.toString(),
        };
      }

      // Only include interimDetails if both duration and unit are filled
      if (
        formValues.interimDetails?.duration &&
        formValues.interimDetails?.unit
      ) {
        formData.interimDetails = {
          duration: formValues.interimDetails.duration,
          unit: formValues.interimDetails.unit,
        };
      }

      // Only include cddDetails if both duration and unit are filled
      if (formValues.cddDetails?.duration && formValues.cddDetails?.unit) {
        formData.cddDetails = {
          duration: formValues.cddDetails.duration,
          unit: formValues.cddDetails.unit,
        };
      }

      console.log("Form Values Changed:", formValues);
      console.log("Updating Store with:", formData);
      setJobTypeInformation(formData);
    }
  }, [formValues, setJobTypeInformation]);

  // Log when radio selection changes
  const handleContractTypeChange = (value: string) => {
    console.log("Contract Type Selected:", value);
    form.setValue("contractType", value);
    if (value === "part-time") {
      console.log("Clearing previous details");
      form.setValue("interimDetails", undefined);
      form.setValue("cddDetails", undefined);
    } else if (value === "interim") {
      form.setValue("partTimeDetails", undefined);
      form.setValue("cddDetails", undefined);
      form.setValue("interimDetails", {
        duration: "",
        unit: "days",
      });
    } else if (value === "cdd") {
      form.setValue("partTimeDetails", undefined);
      form.setValue("interimDetails", undefined);
      form.setValue("cddDetails", {
        duration: "",
        unit: "months",
      });
    } else {
      console.log("Clearing Details");
      form.setValue("partTimeDetails", undefined);
      form.setValue("interimDetails", undefined);
      form.setValue("cddDetails", undefined);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Type de poste"
        description="Sélectionnez le type de contrat pour votre offre"
      />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form Submitted with values:", form.getValues());
                nextStep();
              }}
            >
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
                        onValueChange={handleContractTypeChange}
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

              {form.watch("contractType") === "interim" && (
                <ContractDurationDetails
                  form={form}
                  type="interim"
                  label="Quelle est la durée de la mission ?"
                />
              )}

              {form.watch("contractType") === "cdd" && (
                <ContractDurationDetails
                  form={form}
                  type="cdd"
                  label="Quelle est la durée du CDD ?"
                />
              )}

              {form.watch("contractType") === "part-time" && (
                <PartTimeDetails form={form} />
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={() => {
          console.log("Final Form Values:", form.getValues());
          console.log("Store State:", jobTypeInformation);
          nextStep();
        }}
        canProceed={canProceed()}
      />
    </div>
  );
}
