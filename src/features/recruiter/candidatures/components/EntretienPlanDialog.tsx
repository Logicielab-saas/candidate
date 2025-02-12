"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video, Phone, MapPin, Plus, CalendarIcon, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface EntretienPlanDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  candidat: {
    nom: string;
  };
}

const DURATIONS = [
  { value: "15", label: "15 min" },
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "1 heure" },
] as const;

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

type FormatType = {
  value: "video" | "telephone" | "person";
  label: string;
  icon: React.ElementType;
};

const FORMATS: FormatType[] = [
  {
    value: "video",
    label: "Vidéo",
    icon: Video,
  },
  {
    value: "telephone",
    label: "Téléphone",
    icon: Phone,
  },
  {
    value: "person",
    label: "En personne",
    icon: MapPin,
  },
];

const formSchema = z.object({
  duration: z.enum(["15", "30", "45", "60"], {
    required_error: "Veuillez sélectionner une durée",
  }),
  format: z.enum(["video", "telephone", "person"], {
    required_error: "Veuillez sélectionner un format",
  }),
  address: z.string().min(1, "L'adresse est requise"),
  message: z.string().min(1, "Le message est requis"),
  teamMembers: z.string().optional(),
  date: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  time: z.string({
    required_error: "Veuillez sélectionner une heure",
  }),
  timezone: z.string({
    required_error: "Veuillez sélectionner un fuseau horaire",
  }),
  alternateSlots: z
    .array(
      z.object({
        date: z.date(),
        time: z.string(),
      })
    )
    .default([]),
});

type FormValues = z.infer<typeof formSchema>;

export function EntretienPlanDialog({
  isOpen,
  onOpenChange,
  candidat,
}: EntretienPlanDialogProps) {
  const [showAlternateSlots, setShowAlternateSlots] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: "video",
      duration: "30",
      address: "",
      message: "",
      teamMembers: "",
      timezone: "Europe/Paris",
      alternateSlots: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "alternateSlots",
  });

  const addAlternateSlot = () => {
    append({ date: new Date(), time: "09:00" });
  };

  function onSubmit(values: FormValues) {
    console.log(values);
    // Handle form submission
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Programmer un entretien avec {candidat.nom}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="flex flex-col gap-4">
                {/* Duration Select */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une durée" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DURATIONS.map((duration) => (
                            <SelectItem
                              key={duration.value}
                              value={duration.value}
                            >
                              {duration.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Format Radio Group */}
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Format</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-2"
                        >
                          {FORMATS.map(({ value, label, icon: Icon }) => (
                            <Label
                              key={value}
                              className={`flex flex-1 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium
                                ${
                                  field.value === value
                                    ? "border-primaryHex-500 text-primaryHex-500"
                                    : ""
                                } cursor-pointer`}
                            >
                              <RadioGroupItem
                                value={value}
                                className="sr-only"
                              />
                              <Icon className="h-4 w-4" />
                              {label}
                            </Label>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address Input */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse de l&apos;entretien</FormLabel>
                      <FormControl>
                        <Input placeholder="Saisissez l'adresse" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message Textarea */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message destiné à {candidat.nom}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Écrivez un message..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Team Members Input */}
                <FormField
                  control={form.control}
                  name="teamMembers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ajouter des membres d&apos;équipe</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Saisissez les adresses email en les séparant par une virgule"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Side */}
              <div className="border-l border-zinc-200 dark:border-zinc-700 pl-6 space-y-4">
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
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
                                        !dateField.value &&
                                          "text-muted-foreground"
                                      )}
                                    >
                                      {dateField.value ? (
                                        format(
                                          dateField.value,
                                          "EEEE d MMMM yyyy",
                                          {
                                            locale: fr,
                                          }
                                        )
                                      ) : (
                                        <span>Sélectionnez une date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={dateField.value}
                                    onSelect={dateField.onChange}
                                    disabled={(date) =>
                                      date < new Date() ||
                                      date < new Date("1900-01-01")
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
                                    <SelectItem
                                      key={slot.value}
                                      value={slot.value}
                                    >
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TIMEZONES.map((timezone) => (
                            <SelectItem
                              key={timezone.value}
                              value={timezone.value}
                            >
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
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit">Programmer</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
