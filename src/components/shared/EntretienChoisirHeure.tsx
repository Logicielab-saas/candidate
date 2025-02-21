"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { UseFieldArrayReturn } from "react-hook-form";
import * as z from "zod";

const TIME_SLOTS = Array.from({ length: 24 * 2 }).map((_, i) => {
  const hour = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  const time = `${hour.toString().padStart(2, "0")}:${minutes}`;
  return { value: time, label: time };
});

const TIMEZONES = [
  { value: "Europe/Paris", label: "Paris (UTC+1)" },
  { value: "Europe/London", label: "Londres (UTC)" },
  { value: "America/New_York", label: "New York (UTC-5)" },
] as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z
  .object({
    duration: z.enum(["15", "30", "45", "60"]),
    format: z.enum(["video", "telephone", "person"]),
    videoUrl: z.string().optional(),
    address: z.string().optional(),
    message: z.string(),
    teamMembers: z.string().optional(),
    date: z.date(),
    time: z.string(),
    timezone: z.string(),
    alternateSlots: z
      .array(
        z.object({
          date: z.date(),
          time: z.string(),
        })
      )
      .default([]),
  })
  .superRefine((data, ctx) => {
    if (data.format === "video" && !data.videoUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "L'URL de la visioconférence est requise",
        path: ["videoUrl"],
      });
    }
    if (data.format === "person" && !data.address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "L'adresse est requise",
        path: ["address"],
      });
    }
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FormValues = z.infer<typeof formSchema>;

type FormType = {
  format: "video" | "telephone" | "person";
  duration: "15" | "30" | "45" | "60";
  message: string;
  alternateSlots: { time: string; date: Date }[];
  availabilityMode: "specific" | "share";
  date?: Date;
  time?: string;
  timezone?: string;
  address?: string;
  videoUrl?: string;
  teamMembers?: string;
  selectedWeek?: Date;
  weeklyAvailability?: Record<
    string,
    {
      isAvailable: boolean;
      startTime: string;
      endTime: string;
    }
  >;
};

interface EntretienChoisirHeureProps {
  form: UseFormReturn<FormType>;
  fieldArray: UseFieldArrayReturn<FormType, "alternateSlots", "id">;
}

export function EntretienChoisirHeure({
  form,
  fieldArray,
}: EntretienChoisirHeureProps) {
  const { fields, append, remove } = fieldArray;

  const addAlternateSlot = () => {
    append({ date: new Date(), time: "09:00" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        {/* Calendar Popover */}
        <div className="flex-1 space-y-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "EEEE d MMMM yyyy", {
                            locale: fr,
                          })
                        ) : (
                          <span>Sélectionnez une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Time Select */}
        <div className="w-[120px] space-y-2">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heure de début</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Heure" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Alternate Slots */}
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            {/* Date Popover */}
            <div className="flex-1">
              <FormField
                control={form.control}
                name={`alternateSlots.${index}.date`}
                render={({ field: dateField }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !dateField.value && "text-muted-foreground"
                            )}
                          >
                            {dateField.value ? (
                              format(dateField.value, "EEEE d MMMM yyyy", {
                                locale: fr,
                              })
                            ) : (
                              <span>Sélectionnez une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateField.value}
                          onSelect={dateField.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            {/* Time Select */}
            <div className="w-[120px]">
              <FormField
                control={form.control}
                name={`alternateSlots.${index}.time`}
                render={({ field: timeField }) => (
                  <FormItem>
                    <Select
                      onValueChange={timeField.onChange}
                      defaultValue={timeField.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Heure" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* Remove Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => remove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {/* Add Slot Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={addAlternateSlot}
        >
          <Plus className="h-4 w-4" />
          Suggérer plusieurs créneaux
        </Button>
      </div>

      {/* Timezone Select */}
      <FormField
        control={form.control}
        name="timezone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fuseau Horaire</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {TIMEZONES.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
