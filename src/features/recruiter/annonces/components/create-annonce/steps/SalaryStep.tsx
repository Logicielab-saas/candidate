"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "../../../store/create-annonce-store";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { useEffect } from "react";
import {
  SalaryDisplayType,
  SalaryFrequency,
} from "../../../common/enums/salary.enum";
import {
  salaryFormSchema,
  SalaryForm,
} from "../../../common/schemas/salary.schema";
import { useToast } from "@/hooks/use-toast";

const SALARY_DISPLAY_TYPES = [
  { value: SalaryDisplayType.RANGE, label: "Fourchette" },
  { value: SalaryDisplayType.FIXED, label: "Montant fixe" },
  { value: SalaryDisplayType.NEGOTIABLE, label: "À négocier" },
] as const;

const SALARY_FREQUENCIES = [
  { value: SalaryFrequency.HOURLY, label: "Par heure" },
  { value: SalaryFrequency.DAILY, label: "Par jour" },
  { value: SalaryFrequency.WEEKLY, label: "Par semaine" },
  { value: SalaryFrequency.MONTHLY, label: "Par mois" },
  { value: SalaryFrequency.YEARLY, label: "Par an" },
] as const;

const DEFAULT_FORM_VALUES: SalaryForm = {
  displayType: undefined,
  minSalary: "",
  maxSalary: "",
  frequency: undefined,
};

export function SalaryStep() {
  const {
    salaryInformation,
    setSalaryInformation,
    previousStep,
    nextStep,
    canProceed,
  } = useCreateAnnonceStore();
  const { toast } = useToast();

  const form = useForm<SalaryForm>({
    resolver: zodResolver(salaryFormSchema),
    defaultValues: {
      ...DEFAULT_FORM_VALUES,
      ...salaryInformation,
    },
    mode: "onChange",
  });

  // Update store when form values change
  const { watch } = form;
  useEffect(() => {
    const subscription = watch((value) => {
      const formData = {
        ...value,
        minSalary: value.minSalary || "",
        maxSalary: value.maxSalary || "",
      };
      setSalaryInformation(formData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setSalaryInformation]);

  const handleDisplayTypeChange = (value: SalaryDisplayType) => {
    form.setValue("displayType", value);
    // Reset salary fields when changing display type
    if (value === SalaryDisplayType.NEGOTIABLE) {
      form.setValue("minSalary", "");
      form.setValue("maxSalary", "");
      form.setValue("frequency", undefined);
    }
  };

  const validateAndProceed = () => {
    const formData = form.getValues();

    // If a display type is selected and it's RANGE, validate that maxSalary is greater than minSalary
    if (
      formData.displayType === SalaryDisplayType.RANGE &&
      formData.minSalary &&
      formData.maxSalary &&
      Number(formData.maxSalary) <= Number(formData.minSalary)
    ) {
      toast({
        variant: "destructive",
        title: "Validation",
        description:
          "Le salaire maximum doit être supérieur au salaire minimum",
      });
      return;
    }

    // Everything is optional, so we can proceed
    nextStep();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Salaire"
        description="Définissez le salaire pour ce poste (optionnel)"
      />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <FormField
                control={form.control}
                name="displayType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Afficher les salaires par</FormLabel>
                    <Select
                      onValueChange={handleDisplayTypeChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type d'affichage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SALARY_DISPLAY_TYPES.map((type) => (
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

              {form.watch("displayType") &&
                form.watch("displayType") !== SalaryDisplayType.NEGOTIABLE && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="minSalary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="Ex: 2500"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("displayType") ===
                        SalaryDisplayType.RANGE && (
                        <FormField
                          control={form.control}
                          name="maxSalary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  placeholder="Ex: 3500"
                                  {...field}
                                  value={field.value || ""}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fréquence</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez la fréquence" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SALARY_FREQUENCIES.map((frequency) => (
                                <SelectItem
                                  key={frequency.value}
                                  value={frequency.value}
                                >
                                  {frequency.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={validateAndProceed}
        canProceed={canProceed()}
      />
    </div>
  );
}
