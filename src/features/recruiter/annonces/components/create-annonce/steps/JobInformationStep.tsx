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
import { Label } from "@/components/ui/label";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { ContractDurationDetails } from "./job-type/ContractDurationDetails";
import { PartTimeDetails } from "./job-type/PartTimeDetails";
import { ContractType, ContractDurationUnit } from "../../../common";
import {
  SalaryDisplayType,
  SalaryFrequency,
} from "../../../common/enums/salary.enum";
import { useToast } from "@/hooks/use-toast";
import {
  JobInformationForm,
  jobInformationFormSchema,
} from "../../../common/schemas/job-information.schema";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const numberOfPeopleOptions = [
  { value: "1", label: "1 personne" },
  { value: "2-5", label: "2 à 5 personnes" },
  { value: "5-10", label: "5 à 10 personnes" },
  { value: "10+", label: "Plus de 10 personnes" },
];

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

const citiesByRegion = [
  {
    region: "Casablanca-Settat",
    cities: [
      { value: "casablanca", label: "Casablanca" },
      { value: "mohammedia", label: "Mohammedia" },
      { value: "el-jadida", label: "El Jadida" },
      { value: "settat", label: "Settat" },
    ],
  },
  {
    region: "Rabat-Salé-Kénitra",
    cities: [
      { value: "rabat", label: "Rabat" },
      { value: "sale", label: "Salé" },
      { value: "kenitra", label: "Kénitra" },
      { value: "temara", label: "Témara" },
    ],
  },
  // ... other regions
];

// Flatten cities array for easier search
const allCities = citiesByRegion.flatMap((region) =>
  region.cities.map((city) => ({
    ...city,
    region: region.region,
  }))
);

// Add this helper function at the top level
const transformDurationDetails = (
  details: { duration?: string; unit?: ContractDurationUnit } | undefined
) => {
  if (!details?.duration || !details?.unit) return undefined;
  return {
    duration: details.duration,
    unit: details.unit,
  };
};

interface JobInformationStepProps {
  isDialog?: boolean;
  onDialogClose?: () => void;
}

export function JobInformationStep({
  isDialog = false,
  onDialogClose,
}: JobInformationStepProps) {
  const {
    baseInformation,
    setBaseInformation,
    jobTypeInformation,
    setJobTypeInformation,
    salaryInformation,
    setSalaryInformation,
    previousStep,
    nextStep,
    canProceed,
  } = useCreateAnnonceStore();
  const { toast } = useToast();

  const form = useForm<JobInformationForm>({
    resolver: zodResolver(jobInformationFormSchema),
    defaultValues: {
      // Base Information
      jobTitle: baseInformation.jobTitle || "",
      numberOfPeople: baseInformation.numberOfPeople || "",
      promotionLocation: baseInformation.promotionLocation || "",

      // Job Type
      contractTypes: jobTypeInformation.contractTypes || [],
      partTimeDetails: jobTypeInformation.partTimeDetails,
      interimDetails: jobTypeInformation.interimDetails,
      cddDetails: jobTypeInformation.cddDetails,
      internshipDetails: jobTypeInformation.internshipDetails,

      // Salary
      displayType: salaryInformation.displayType,
      minSalary: salaryInformation.minSalary || "",
      maxSalary: salaryInformation.maxSalary || "",
      frequency: salaryInformation.frequency,
    },
    mode: "onChange",
  });

  // Update store when form values change
  const { watch } = form;
  useEffect(() => {
    const subscription = watch((value) => {
      // Update base information
      setBaseInformation({
        jobTitle: value.jobTitle || "",
        numberOfPeople: value.numberOfPeople || "",
        promotionLocation: value.promotionLocation || "",
      });

      // Update job type information
      setJobTypeInformation({
        contractTypes:
          value.contractTypes?.filter(
            (type): type is string => type !== undefined
          ) || [],
        partTimeDetails: value.partTimeDetails,
        interimDetails: transformDurationDetails(value.interimDetails),
        cddDetails: transformDurationDetails(value.cddDetails),
        internshipDetails: transformDurationDetails(value.internshipDetails),
      });

      // Update salary information
      setSalaryInformation({
        displayType: value.displayType,
        minSalary: value.minSalary || "",
        maxSalary: value.maxSalary || "",
        frequency: value.frequency,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setBaseInformation, setJobTypeInformation, setSalaryInformation]);

  const handleContractTypeChange = (value: string, checked: boolean) => {
    const currentTypes = form.getValues("contractTypes") || [];
    let newTypes: string[];

    if (checked) {
      newTypes = [...currentTypes, value];
    } else {
      newTypes = currentTypes.filter((type) => type !== value);
    }

    form.setValue("contractTypes", newTypes);

    // Clear details for removed contract types
    if (!checked) {
      switch (value) {
        case ContractType.PART_TIME:
          form.setValue("partTimeDetails", undefined);
          break;
        case ContractType.INTERIM:
          form.setValue("interimDetails", undefined);
          break;
        case ContractType.CDD:
          form.setValue("cddDetails", undefined);
          break;
        case ContractType.INTERNSHIP:
          form.setValue("internshipDetails", undefined);
          break;
      }
    } else {
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
    }
  };

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

    // Validate base information
    if (
      !formData.jobTitle?.trim() ||
      !formData.numberOfPeople?.trim() ||
      !formData.promotionLocation?.trim()
    ) {
      toast({
        variant: "destructive",
        title: "Validation",
        description: "Veuillez remplir toutes les informations de base",
      });
      return;
    }

    // Validate contract types
    if (!formData.contractTypes || formData.contractTypes.length === 0) {
      toast({
        variant: "destructive",
        title: "Validation",
        description: "Veuillez sélectionner au moins un type de contrat",
      });
      return;
    }

    // Validate salary range if applicable
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

    if (isDialog) {
      toast({
        title: "Modifications enregistrées",
        description: "Les détails de l'emploi ont été mis à jour avec succès.",
        variant: "success",
      });
      onDialogClose?.();
    } else {
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {!isDialog && (
        <HeaderSectionStepsForm
          title="Informations du poste"
          description="Remplissez les informations concernant le poste"
        />
      )}

      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Card>
            <CardContent className="pt-6 space-y-8">
              {/* Base Information Section */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-foreground">
                  Informations de base
                </h3>
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Intitulé du poste
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: Développeur Full Stack"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numberOfPeople"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Nombre de personnes à recruter
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le nombre de personnes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {numberOfPeopleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
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
                  name="promotionLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Ville de l&apos;offre d&apos;emploi
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une ville" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allCities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />

              {/* Job Type Section */}
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-foreground">
                  Type de poste
                </h3>
                <FormField
                  control={form.control}
                  name="contractTypes"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="flex items-center gap-1">
                        Types de poste
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {CONTRACT_TYPES.map((type) => (
                            <div key={type.id} className="relative">
                              <Checkbox
                                id={type.id}
                                checked={field.value?.includes(type.id)}
                                onCheckedChange={(checked: boolean) => {
                                  if (checked !== undefined) {
                                    handleContractTypeChange(type.id, checked);
                                  }
                                }}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={type.id}
                                className={cn(
                                  "inline-flex items-center gap-2 cursor-pointer rounded-md border px-3 py-1.5 text-sm",
                                  "hover:border-primaryHex-500 hover:bg-primaryHex-50/50",
                                  field.value?.includes(type.id)
                                    ? "border-primaryHex-500 bg-primaryHex-50 text-primaryHex-900"
                                    : "border-input bg-background",
                                  "transition-all duration-150 ease-in-out"
                                )}
                              >
                                <div className="relative w-3.5 h-3.5">
                                  <Plus
                                    className={cn(
                                      "absolute inset-0 h-3.5 w-3.5 text-muted-foreground",
                                      field.value?.includes(type.id)
                                        ? "opacity-0"
                                        : "opacity-100",
                                      "transition-opacity"
                                    )}
                                  />
                                  <Check
                                    className={cn(
                                      "absolute inset-0 h-3.5 w-3.5 text-primaryHex-500",
                                      field.value?.includes(type.id)
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
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form
                  .watch("contractTypes")
                  ?.includes(ContractType.INTERIM) && (
                  <ContractDurationDetails
                    form={form}
                    type="interim"
                    label="Quelle est la durée de la mission ?"
                  />
                )}

                {form.watch("contractTypes")?.includes(ContractType.CDD) && (
                  <ContractDurationDetails
                    form={form}
                    type="cdd"
                    label="Quelle est la durée du CDD ?"
                  />
                )}

                {form
                  .watch("contractTypes")
                  ?.includes(ContractType.INTERNSHIP) && (
                  <ContractDurationDetails
                    form={form}
                    type="internship"
                    label="Quelle est la durée du stage ?"
                  />
                )}

                {form
                  .watch("contractTypes")
                  ?.includes(ContractType.PART_TIME) && (
                  <PartTimeDetails form={form} />
                )}
              </div>

              <Separator className="my-6" />

              {/* Salary Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg text-foreground">
                    Salaire
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    (Optionnel)
                  </span>
                </div>
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
                  form.watch("displayType") !==
                    SalaryDisplayType.NEGOTIABLE && (
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
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      {isDialog ? (
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onDialogClose}>
            Annuler
          </Button>
          <Button onClick={validateAndProceed}>
            Enregistrer les modifications
          </Button>
        </div>
      ) : (
        <FormStepsNavigation
          onPrevious={previousStep}
          onNext={validateAndProceed}
          canProceed={canProceed()}
        />
      )}
    </div>
  );
}
