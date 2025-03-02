"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Interview } from "@/core/types/interview";
import { JobHeader } from "../jobHeader";
import { Separator } from "@/components/ui/separator";
import {
  getThisWeekDays,
  getNextWeekDays,
} from "@/core/utils/getAvailableWeeks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";

interface InterviewReporterProps {
  interview: Interview | undefined;
}

/**
 * Form schema for the interview reporting.
 * - `thisWeek` records the selected date values (ISO strings) from the current week.
 * - `nextWeek` records the selected date values (ISO strings) from next week.
 * - `message` is an optional string for additional comments.
 */
const formSchema = z
  .object({
    thisWeek: z.array(z.string()),
    nextWeek: z.array(z.string()),
    message: z.string().optional(),
  })
  .refine(
    (data) => {
      // Ensure at least one availability is selected
      return data.thisWeek.length > 0 || data.nextWeek.length > 0;
    },
    {
      message: "Veuillez sélectionner au moins une disponibilité",
      path: ["nextWeek"], // This will show the error under thisWeek field
    }
  );

type InterviewFormInputs = z.infer<typeof formSchema>;

function getWeekTitle(days: { date: Date }[]): string {
  if (days.length === 0) return "";
  const startDay = days[0].date;
  const endDay = days[days.length - 1].date;
  return `${startDay.getDate()}-${endDay.getDate()} ${format(startDay, "MMMM", {
    locale: fr,
  })}`;
}

export function InterviewReporter({ interview }: InterviewReporterProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InterviewFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thisWeek: [],
      nextWeek: [],
      message: "",
    },
  });

  const thisWeekDays = getThisWeekDays();
  const nextWeekDays = getNextWeekDays();

  const thisWeekTitle = getWeekTitle(thisWeekDays);
  const nextWeekTitle = getWeekTitle(nextWeekDays);

  function handleSubmitForm(data: InterviewFormInputs) {
    console.log("Submitted data:", {
      availabilities: {
        thisWeek: data.thisWeek,
        nextWeek: data.nextWeek,
      },
      message: data.message,
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <JobHeader
        jobTitle={interview?.jobTitle || ""}
        companyName={interview?.company.name || ""}
      />
      <Separator className="my-6" />

      <div className="space-y-8">
        <h2 className="text-xl font-semibold">
          Indiquez vos disponibilités à l&apos;employeur
        </h2>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
          {/* This Week Section */}
          <div className="rounded-lg shadow dark:border p-6">
            <h3 className="text-lg font-medium mb-4">{thisWeekTitle}</h3>
            <Controller
              control={control}
              name="thisWeek"
              render={({ field }) => (
                <div className="space-y-3">
                  {thisWeekDays.map((day) => {
                    const dayValue = day.date.toISOString();
                    return (
                      <label
                        key={dayValue}
                        className="flex items-center space-x-3 p-2 rounded-md cursor-pointer"
                      >
                        <Checkbox
                          checked={field.value.includes(dayValue)}
                          onCheckedChange={(checked) => {
                            const updated = checked
                              ? [...field.value, dayValue]
                              : field.value.filter((v) => v !== dayValue);
                            field.onChange(updated);
                          }}
                        />
                        <span>
                          {format(day.date, "EEEE d MMMM", { locale: fr })}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            />

            <Separator className="my-6" />
            {/* Next Week Section */}
            <h3 className="text-lg font-medium mb-4">{nextWeekTitle}</h3>
            <Controller
              control={control}
              name="nextWeek"
              render={({ field }) => (
                <div className="space-y-3">
                  {nextWeekDays.map((day) => {
                    const dayValue = day.date.toISOString();
                    return (
                      <label
                        key={dayValue}
                        className="flex items-center space-x-3 p-2 rounded-md cursor-pointer"
                      >
                        <Checkbox
                          checked={field.value.includes(dayValue)}
                          onCheckedChange={(checked) => {
                            const updated = checked
                              ? [...field.value, dayValue]
                              : field.value.filter((v) => v !== dayValue);
                            field.onChange(updated);
                          }}
                        />
                        <span>
                          {format(day.date, "EEEE d MMMM", { locale: fr })}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            />
            {errors.nextWeek && (
              <p className="mt-2 text-sm text-destructive">
                {errors.nextWeek.message}
              </p>
            )}
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <Textarea
                  placeholder="Ajouter un message pour l'employeur"
                  className="w-full min-h-[100px]"
                  {...field}
                />
              )}
            />
            <Button type="submit" className="w-full">
              Continuer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
