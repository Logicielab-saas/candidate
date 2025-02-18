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
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ContractType,
  JobTypeForm,
  JobTypeInformation,
  jobTypeFormSchema,
  ContractDurationUnit,
} from "../../../common";
import { ContractDurationDetails } from "./job-type/ContractDurationDetails";
import { PartTimeDetails } from "./job-type/PartTimeDetails";
import { useEffect } from "react";

const CONTRACT_TYPES = [
  { id: ContractType.FULL_TIME, label: "Temps plein" },
  { id: ContractType.PART_TIME, label: "Temps partiel" },
  { id: ContractType.CDI, label: "CDI" },
  { id: ContractType.INTERIM, label: "Intérim" },
  { id: ContractType.CDD, label: "CDD" },
  { id: ContractType.FREELANCE, label: "Profession libérale" },
  { id: ContractType.INTERNSHIP, label: "Stage" },
  { id: ContractType.APPRENTICESHIP, label: "Apprentissage/Alternance" },
];

/**
 * Transforms form values into the final JobTypeInformation structure
 * Only includes optional fields if they have valid values
 */
const transformFormData = (
  values: Partial<JobTypeForm>
): JobTypeInformation => {
  const formData: JobTypeInformation = {
    contractType: values.contractType || "",
  };

  // Only include details if they have valid values
  if (
    values.partTimeDetails?.scheduleType ||
    values.partTimeDetails?.hoursPerWeek
  ) {
    formData.partTimeDetails = {
      scheduleType: values.partTimeDetails.scheduleType,
      hoursPerWeek: values.partTimeDetails.hoursPerWeek?.toString(),
    };
  }

  if (values.interimDetails?.duration && values.interimDetails?.unit) {
    formData.interimDetails = {
      duration: values.interimDetails.duration,
      unit: values.interimDetails.unit,
    };
  }

  if (values.cddDetails?.duration && values.cddDetails?.unit) {
    formData.cddDetails = {
      duration: values.cddDetails.duration,
      unit: values.cddDetails.unit,
    };
  }

  if (values.internshipDetails?.duration && values.internshipDetails?.unit) {
    formData.internshipDetails = {
      duration: values.internshipDetails.duration,
      unit: values.internshipDetails.unit,
    };
  }

  return formData;
};

export function JobTypeStep() {
  const {
    jobTypeInformation,
    setJobTypeInformation,
    previousStep,
    nextStep,
    canProceed,
  } = useCreateAnnonceStore();

  const form = useForm<JobTypeForm>({
    resolver: zodResolver(jobTypeFormSchema),
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
  }) as JobTypeForm;

  // Log when radio selection changes
  const handleContractTypeChange = (value: string) => {
    console.log("Contract Type Selected:", value);
    // Clear all previous details
    form.setValue("partTimeDetails", undefined);
    form.setValue("interimDetails", undefined);
    form.setValue("cddDetails", undefined);
    form.setValue("internshipDetails", undefined);

    // Set contract type
    form.setValue("contractType", value);

    // Initialize duration details for contracts that need it
    if (
      [
        ContractType.INTERIM,
        ContractType.CDD,
        ContractType.INTERNSHIP,
      ].includes(value as ContractType)
    ) {
      const fieldName =
        value === ContractType.INTERIM
          ? "interimDetails"
          : value === ContractType.CDD
          ? "cddDetails"
          : "internshipDetails";

      const defaultUnit =
        value === ContractType.INTERIM
          ? ContractDurationUnit.DAYS
          : ContractDurationUnit.MONTHS;

      form.setValue(fieldName, {
        duration: "",
        unit: defaultUnit,
      });
    }
  };

  useEffect(() => {
    if (formValues?.contractType) {
      const formData = transformFormData(formValues);
      console.log("Form Values Changed:", formValues);
      console.log("Updating Store with:", formData);
      setJobTypeInformation(formData);
    }
  }, [formValues, setJobTypeInformation]);

  // Handler for form submission
  const handleFormSubmit = () => {
    const values = form.getValues();
    const formData = transformFormData(values);
    setJobTypeInformation(formData);
    console.log("Final Form State:", formData);
    nextStep();
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
                handleFormSubmit();
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

              {form.watch("contractType") === ContractType.INTERIM && (
                <ContractDurationDetails
                  form={form}
                  type="interim"
                  label="Quelle est la durée de la mission ?"
                />
              )}

              {form.watch("contractType") === ContractType.CDD && (
                <ContractDurationDetails
                  form={form}
                  type="cdd"
                  label="Quelle est la durée du CDD ?"
                />
              )}

              {form.watch("contractType") === ContractType.INTERNSHIP && (
                <ContractDurationDetails
                  form={form}
                  type="internship"
                  label="Quelle est la durée du stage ?"
                />
              )}

              {form.watch("contractType") === ContractType.PART_TIME && (
                <PartTimeDetails form={form} />
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={handleFormSubmit}
        canProceed={canProceed()}
      />
    </div>
  );
}
