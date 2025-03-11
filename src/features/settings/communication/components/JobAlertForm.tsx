/**
 * JobAlertForm - Form component for creating and editing job alerts
 *
 * Provides form fields for job post, city, and salary range
 * with validation and submit handling.
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { UserAlert } from "@/core/interfaces/user-alert.interface";

const formSchema = z.object({
  id: z.string(),
  post: z.string().min(2, "Le poste doit contenir au moins 2 caractères"),
  city: z.string().optional(),
  salaryRange: z.string().optional(),
  isEnabled: z.boolean(),
});

// Constants for salary range
const MIN_SALARY = 20000;
const MAX_SALARY = 150000;
const STEP_SALARY = 1000;

interface JobAlertFormProps {
  initialValues: UserAlert;
  onSave: (data: UserAlert) => void;
  onCancel: () => void;
}

export function JobAlertForm({
  initialValues,
  onSave,
  onCancel,
}: JobAlertFormProps) {
  // Track whether the user has moved the salary slider
  const [hasMovedSalarySlider, setHasMovedSalarySlider] = useState(false);

  // Parse initial salary range to array of [min, max] for the slider
  const parseSalaryRange = (rangeString?: string): [number, number] => {
    if (!rangeString) return [MIN_SALARY, MAX_SALARY];

    const parts = rangeString
      .split(",")
      .map((part) => parseInt(part.trim()) * 1000);

    // If only one value is provided, use it as min with default max
    if (parts.length === 1 || isNaN(parts[1])) {
      return [parts[0] || MIN_SALARY, MAX_SALARY];
    }

    return [parts[0] || MIN_SALARY, parts[1] || MAX_SALARY];
  };

  const initialSalaryRange = parseSalaryRange(initialValues.salaryRange);
  const [sliderValues, setSliderValues] =
    useState<[number, number]>(initialSalaryRange);

  const form = useForm<UserAlert>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: initialValues.id,
      post: initialValues.post || "",
      city: initialValues.city || "",
      salaryRange: initialValues.salaryRange || undefined,
      isEnabled: initialValues.isEnabled,
    },
  });

  const onSubmit = (data: UserAlert) => {
    // Only update the salary range if the user has moved the slider
    if (hasMovedSalarySlider) {
      data.salaryRange = `${Math.round(sliderValues[0] / 1000)},${Math.round(
        sliderValues[1] / 1000
      )}`;
    }

    onSave(data);
  };

  const handleSliderChange = (value: number[]) => {
    setHasMovedSalarySlider(true);
    setSliderValues([value[0], value[1]]);
    form.setValue(
      "salaryRange",
      `${Math.round(value[0] / 1000)},${Math.round(value[1] / 1000)}`
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poste recherché</FormLabel>
              <FormControl>
                <Input placeholder="Développeur Web" {...field} />
              </FormControl>
              <FormDescription>
                Type de poste pour lequel vous souhaitez recevoir des alertes
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville (optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="Paris" {...field} />
              </FormControl>
              <FormDescription>
                Laissez vide pour chercher dans toutes les villes
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salaryRange"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fourchette de salaire (optionnel)</FormLabel>
              <div className="space-y-3">
                <FormControl>
                  <Slider
                    defaultValue={initialSalaryRange}
                    max={MAX_SALARY}
                    min={MIN_SALARY}
                    step={STEP_SALARY}
                    onValueChange={handleSliderChange}
                  />
                </FormControl>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {Math.round(sliderValues[0] / 1000)}K€
                  </span>
                  <span className="font-medium">
                    {Math.round(sliderValues[1] / 1000)}K€
                  </span>
                </div>
              </div>
              <FormDescription>
                Fourchette de salaire annuel brut souhaité en euros
                {!hasMovedSalarySlider && initialValues.salaryRange && (
                  <span className="block text-xs text-muted-foreground mt-1">
                    Déplacez le curseur pour modifier la fourchette de salaire
                  </span>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
}
