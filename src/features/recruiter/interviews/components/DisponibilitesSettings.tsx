"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import {
  WEEKDAYS,
  TIME_SLOTS,
  CALENDAR_CONNECTIONS,
  WeekdayAvailability,
  DEFAULT_AVAILABILITIES,
} from "@/core/mockData/dispo-data";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarView } from "./CalendarView";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { fr } from "date-fns/locale";
import { FormField } from "@/components/ui/form";

const exceptionSchema = z.object({
  date: z.date(),
  isAvailable: z.boolean(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

const weekdaySchema = z.object({
  isAvailable: z.boolean(),
  startTime: z.string(),
  endTime: z.string(),
});

const formSchema = z.object({
  calendarConnections: z.object(
    CALENDAR_CONNECTIONS.reduce(
      (acc, connection) => ({
        ...acc,
        [connection.id]: z.boolean(),
      }),
      {} as { [key: string]: z.ZodBoolean }
    )
  ),
  exceptions: z.array(exceptionSchema),
  availabilities: z.object(
    WEEKDAYS.reduce(
      (acc, day) => ({
        ...acc,
        [day.id]: weekdaySchema,
      }),
      {} as { [key: string]: typeof weekdaySchema }
    )
  ),
});

type FormValues = z.infer<typeof formSchema>;

export function DisponibilitesSettings() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calendarConnections: CALENDAR_CONNECTIONS.reduce(
        (acc, connection) => ({
          ...acc,
          [connection.id]: connection.isConnected,
        }),
        {} as { [key: string]: boolean }
      ),
      exceptions: [],
      availabilities: WEEKDAYS.reduce(
        (acc, day) => ({
          ...acc,
          [day.id]: DEFAULT_AVAILABILITIES[day.id],
        }),
        {} as { [key: string]: WeekdayAvailability }
      ),
    },
  });

  const handleDateSelect = (dates: Date[] | undefined) => {
    if (!dates) return;

    const currentExceptions = form.getValues("exceptions");
    const newExceptions = dates.map((date) => {
      const existing = currentExceptions.find(
        (e) => e.date.getTime() === date.getTime()
      );
      return (
        existing || {
          date,
          isAvailable: false,
          startTime: undefined,
          endTime: undefined,
        }
      );
    });

    form.setValue("exceptions", newExceptions);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Form data:", data);
      // Here you would typically send the data to your API
      toast({
        title: "Paramètres de disponibilité mis à jour",
        description:
          "Les paramètres de disponibilité ont été mis à jour avec succès.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erreur lors de la mise à jour des paramètres",
        description:
          "Une erreur est survenue lors de la mise à jour des paramètres.",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(400px,500px)_1fr] gap-6">
        {/* Left Side - Settings */}
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <CardTitle>Paramètres de disponibilité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Calendar Connections */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">
                Connecter avec d&apos;autres calendriers
              </h3>
              <div className="flex flex-wrap gap-2">
                {CALENDAR_CONNECTIONS.map((connection) => {
                  const isConnected = form.watch(
                    `calendarConnections.${connection.id}`
                  );
                  return (
                    <Button
                      key={connection.id}
                      type="button"
                      variant={isConnected ? "default" : "outline"}
                      size="sm"
                      className="min-w-[100px] flex-auto truncate lg:flex-1"
                      onClick={() =>
                        form.setValue(
                          `calendarConnections.${connection.id}`,
                          !isConnected
                        )
                      }
                    >
                      <connection.icon className="mr-2 h-4 w-4 shrink-0" />
                      <span>{connection.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Regular Time Slots */}
            <div className="space-y-3">
              <div className="space-y-3">
                {WEEKDAYS.map((day) => {
                  const dayAvailability = form.watch(
                    `availabilities.${day.id}`
                  );
                  return (
                    <div key={day.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">{day.name}</Label>
                        <div className="flex items-center gap-3">
                          {!dayAvailability.isAvailable && (
                            <span className="text-xs text-muted-foreground">
                              Indisponible
                            </span>
                          )}
                          <Switch
                            checked={dayAvailability.isAvailable}
                            onCheckedChange={(checked) =>
                              form.setValue(
                                `availabilities.${day.id}.isAvailable`,
                                checked
                              )
                            }
                          />
                        </div>
                      </div>
                      {dayAvailability.isAvailable && (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Select
                              value={dayAvailability.startTime}
                              onValueChange={(value) =>
                                form.setValue(
                                  `availabilities.${day.id}.startTime`,
                                  value
                                )
                              }
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Début" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_SLOTS.map((slot) => (
                                  <SelectItem
                                    key={slot.value}
                                    value={slot.value}
                                    className="text-sm"
                                  >
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Select
                              value={dayAvailability.endTime}
                              onValueChange={(value) =>
                                form.setValue(
                                  `availabilities.${day.id}.endTime`,
                                  value
                                )
                              }
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Fin" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_SLOTS.map((slot) => (
                                  <SelectItem
                                    key={slot.value}
                                    value={slot.value}
                                    className="text-sm"
                                  >
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Exceptions Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Exceptions</h3>
              <div className="space-y-2">
                <Label className="text-sm">
                  Quand êtes-vous indisponible ?
                </Label>
                <FormField
                  control={form.control}
                  name="exceptions"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value?.length && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.length === 0 &&
                              "Sélectionner des dates"}
                            {field.value?.length > 0 && (
                              <>
                                {field.value.length} date
                                {field.value.length > 1 ? "s" : ""} sélectionnée
                                {field.value.length > 1 ? "s" : ""}
                              </>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="multiple"
                            selected={field.value.map((e) => e.date)}
                            onSelect={handleDateSelect}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {field.value?.length > 0 && (
                        <div className="space-y-2">
                          {field.value.map((exception, index) => (
                            <div
                              key={exception.date.toISOString()}
                              className="space-y-2 rounded-md border p-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm">
                                  {format(exception.date, "dd MMMM yyyy", {
                                    locale: fr,
                                  })}
                                </span>
                                <div className="flex items-center gap-3">
                                  {!exception.isAvailable && (
                                    <span className="text-xs text-muted-foreground">
                                      Indisponible
                                    </span>
                                  )}
                                  <Switch
                                    checked={exception.isAvailable}
                                    onCheckedChange={(checked) => {
                                      const newExceptions = [...field.value];
                                      newExceptions[index] = {
                                        ...exception,
                                        isAvailable: checked,
                                        startTime: checked
                                          ? "09:00"
                                          : undefined,
                                        endTime: checked ? "17:00" : undefined,
                                      };
                                      form.setValue(
                                        "exceptions",
                                        newExceptions
                                      );
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const newExceptions = [...field.value];
                                      newExceptions.splice(index, 1);
                                      form.setValue(
                                        "exceptions",
                                        newExceptions
                                      );
                                    }}
                                  >
                                    Supprimer
                                  </Button>
                                </div>
                              </div>
                              {exception.isAvailable && (
                                <div className="grid grid-cols-2 gap-2">
                                  <Select
                                    value={exception.startTime}
                                    onValueChange={(value) => {
                                      const newExceptions = [...field.value];
                                      newExceptions[index] = {
                                        ...exception,
                                        startTime: value,
                                      };
                                      form.setValue(
                                        "exceptions",
                                        newExceptions
                                      );
                                    }}
                                  >
                                    <SelectTrigger className="h-8">
                                      <SelectValue placeholder="Début" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {TIME_SLOTS.map((slot) => (
                                        <SelectItem
                                          key={slot.value}
                                          value={slot.value}
                                          className="text-sm"
                                        >
                                          {slot.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Select
                                    value={exception.endTime}
                                    onValueChange={(value) => {
                                      const newExceptions = [...field.value];
                                      newExceptions[index] = {
                                        ...exception,
                                        endTime: value,
                                      };
                                      form.setValue(
                                        "exceptions",
                                        newExceptions
                                      );
                                    }}
                                  >
                                    <SelectTrigger className="h-8">
                                      <SelectValue placeholder="Fin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {TIME_SLOTS.map((slot) => (
                                        <SelectItem
                                          key={slot.value}
                                          value={slot.value}
                                          className="text-sm"
                                        >
                                          {slot.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-6">
            <Button type="submit">Appliquer les modifications</Button>
          </CardFooter>
        </Card>

        {/* Right Side - Calendar View */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px] lg:w-full">
            <CalendarView
              className="h-fit"
              availabilities={form.watch("availabilities")}
              exceptions={form.watch("exceptions")}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
