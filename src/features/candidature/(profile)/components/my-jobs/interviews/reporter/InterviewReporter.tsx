"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Interview } from "@/core/interfaces/interview";
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
import { useToast } from "@/hooks/use-toast";
import { InterviewTypeDetails } from "@/components/shared/InterviewTypeDetails";

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
  const { toast } = useToast();
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
    toast({
      variant: "success",
      title: "Disponibilités envoyées",
      description: "Vos disponibilités ont été envoyées avec succès",
    });
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
      <JobHeader
        jobTitle={interview?.jobTitle || ""}
        companyName={interview?.company.name || ""}
      />
      <h2 className="text-xl font-semibold mb-2">
        Indiquez vos disponibilités à l&apos;employeur
      </h2>
      <InterviewTypeDetails interview={interview} />

      <Separator />

      {/* This Week Section */}
      <div className="p-4 rounded-lg bg-accent/20 shadow">
        <h3 className="text-lg font-semibold mb-2">{thisWeekTitle}</h3>
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
                    className="flex items-center space-x-3 p-2 hover:bg-accent/30 rounded-md cursor-pointer"
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
                    <span className="text-md text-gray-700 dark:text-gray-300">
                      {format(day.date, "EEEE d MMMM", { locale: fr })}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        />
      </div>

      <Separator />

      {/* Next Week Section */}
      <div className="p-4 rounded-lg bg-accent/20 shadow">
        <h3 className="text-lg font-semibold mb-2">{nextWeekTitle}</h3>
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
                    className="flex items-center space-x-3 p-2 hover:bg-accent/30 rounded-md cursor-pointer"
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
                    <span className="text-md text-gray-700 dark:text-gray-300">
                      {format(day.date, "EEEE d MMMM", { locale: fr })}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        />
      </div>
      {errors.nextWeek && (
        <p className="mt-2 text-sm text-destructive">
          {errors.nextWeek.message}
        </p>
      )}
      <Separator />

      {/* Message section */}
      <div className="p-4 rounded-lg bg-accent/20 shadow">
        <h3 className="text-lg font-semibold mb-2">
          Ajouter un message pour l&apos;employeur (optionnel)
        </h3>
        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <Textarea
              placeholder="Votre message ici..."
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              {...field}
            />
          )}
        />
      </div>

      <Separator />

      <Button type="submit" className="w-full">
        Continuer
      </Button>
    </form>
  );
}
