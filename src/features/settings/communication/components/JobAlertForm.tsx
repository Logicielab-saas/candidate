/**
 * JobAlertForm - Form component for creating and editing job alerts
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
import { useTranslations } from "next-intl";

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
  const [hasMovedSalarySlider, setHasMovedSalarySlider] = useState(false);
  const t = useTranslations("settings.communication.jobAlerts.form");
  const tCommon = useTranslations("common.actions");
  const tValidation = useTranslations("common.validation");

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

  const formSchema = z.object({
    id: z.string(),
    post: z.string().min(2, {
      message: tValidation("minLength", { count: 2 }),
    }),
    city: z.string().optional(),
    salaryRange: z.string().optional(),
    isEnabled: z.boolean(),
  });

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
              <FormLabel>{t("post.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("post.placeholder")} {...field} />
              </FormControl>
              <FormDescription>{t("post.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("city.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("city.placeholder")} {...field} />
              </FormControl>
              <FormDescription>{t("city.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salaryRange"
          render={() => (
            <FormItem>
              <FormLabel>{t("salary.label")}</FormLabel>
              <div className="space-y-4">
                <FormControl>
                  <Slider
                    defaultValue={[sliderValues[0], sliderValues[1]]}
                    max={MAX_SALARY}
                    min={MIN_SALARY}
                    step={STEP_SALARY}
                    value={[sliderValues[0], sliderValues[1]]}
                    onValueChange={handleSliderChange}
                    className="w-full"
                    minStepsBetweenThumbs={2}
                  />
                </FormControl>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="font-medium">
                    {Math.round(sliderValues[0] / 1000)}K€
                  </span>
                  <span className="font-medium">
                    {Math.round(sliderValues[1] / 1000)}K€
                  </span>
                </div>
              </div>
              <FormDescription>
                {t("salary.description")}
                {!hasMovedSalarySlider && initialValues.salaryRange && (
                  <span className="block text-xs text-muted-foreground mt-1">
                    {t("salary.moveToChange")}
                  </span>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            {tCommon("cancel")}
          </Button>
          <Button type="submit">{tCommon("save")}</Button>
        </div>
      </form>
    </Form>
  );
}
