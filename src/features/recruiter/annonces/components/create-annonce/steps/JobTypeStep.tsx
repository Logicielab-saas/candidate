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
import type { JobTypeInformation } from "../../../store/create-annonce-store";
import { useEffect } from "react";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  contractType: z.string().min(1, "Sélectionnez un type de contrat"),
  partTimeDetails: z
    .object({
      scheduleType: z.enum(["fixed", "range", "maximum", "minimum"]).optional(),
      hoursPerWeek: z
        .string()
        .regex(/^\d+$/, "Veuillez entrer un nombre valide")
        .optional(),
    })
    .optional(),
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

const SCHEDULE_TYPES = [
  { value: "fixed", label: "Heures fixes" },
  { value: "range", label: "Plage" },
  { value: "maximum", label: "Maximum" },
  { value: "minimum", label: "Minimum" },
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
    },
    mode: "onChange",
  });

  // Update store when form values change
  const { watch } = form;
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.contractType) {
        const formData: JobTypeInformation = {
          contractType: value.contractType,
          partTimeDetails: value.partTimeDetails
            ? {
                scheduleType: value.partTimeDetails.scheduleType,
                hoursPerWeek: value.partTimeDetails.hoursPerWeek?.toString(),
              }
            : undefined,
        };
        console.log("Form Values Changed:", value);
        console.log("Updating Store with:", formData);
        setJobTypeInformation(formData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setJobTypeInformation]);

  // Log when radio selection changes
  const handleContractTypeChange = (value: string) => {
    console.log("Contract Type Selected:", value);
    form.setValue("contractType", value);
    if (value === "part-time") {
      const partTimeDetails = {
        scheduleType: "fixed" as const,
        hoursPerWeek: "",
      };
      console.log("Setting Part Time Details:", partTimeDetails);
      form.setValue("partTimeDetails", partTimeDetails);
    } else {
      console.log("Clearing Part Time Details");
      form.setValue("partTimeDetails", undefined);
    }
  };

  // Log when schedule type changes
  const handleScheduleTypeChange = (value: string) => {
    console.log("Schedule Type Changed:", value);
    form.setValue(
      "partTimeDetails.scheduleType",
      value as "fixed" | "range" | "maximum" | "minimum"
    );
  };

  // Log when hours change
  const handleHoursChange = (value: string) => {
    console.log("Hours Changed:", value);
    form.setValue("partTimeDetails.hoursPerWeek", value);
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

              {form.watch("contractType") === "part-time" && (
                <div className="space-y-4 pl-4 border-l-2 border-primaryHex-100">
                  <FormField
                    control={form.control}
                    name="partTimeDetails.scheduleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type d&apos;horaires</FormLabel>
                        <Select
                          onValueChange={handleScheduleTypeChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez le type d'horaires" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SCHEDULE_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="partTimeDetails.hoursPerWeek"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heures par semaine</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              placeholder="Ex: 20"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                handleHoursChange(value);
                              }}
                              className="w-24"
                            />
                          </FormControl>
                          <span className="text-sm text-muted-foreground">
                            Heures par semaine
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
