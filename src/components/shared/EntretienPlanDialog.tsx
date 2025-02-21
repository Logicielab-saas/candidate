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
import { Video, Phone, MapPin } from "lucide-react";
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
import { EntretienChoisirHeure } from "./EntretienChoisirHeure";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarView } from "../../features/recruiter/interviews/components/CalendarView";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { EntretienReprogramDialog } from "./EntretienReprogramDialog";

interface EntretienPlanDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  candidat: {
    nom: string;
    telephone?: string;
  };
}

const DURATIONS = [
  { value: "15", label: "15 min" },
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "1 heure" },
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

const formSchema = z
  .object({
    duration: z.enum(["15", "30", "45", "60"], {
      required_error: "Veuillez sélectionner une durée",
    }),
    format: z.enum(["video", "telephone", "person"], {
      required_error: "Veuillez sélectionner un format",
    }),
    videoUrl: z.string().optional(),
    address: z.string().optional(),
    mapUrl: z.string().optional(),
    message: z.string().min(1, "Le message est requis"),
    teamMembers: z.string().optional(),
    date: z.date({
      required_error: "sélectionner date",
    }),
    time: z.string({
      required_error: "select heure",
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
  })
  .superRefine((data, ctx) => {
    if (data.format === "video" && !data.videoUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "L'URL de la visioconférence est requise",
        path: ["videoUrl"],
      });
    }
    if (data.format === "person") {
      if (!data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "L'adresse est requise",
          path: ["address"],
        });
      }
      if (!data.mapUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Le lien Google Maps est requis",
          path: ["mapUrl"],
        });
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;

export function EntretienPlanDialog({
  isOpen,
  onOpenChange,
  candidat,
}: EntretienPlanDialogProps) {
  const [isReprogramDialogOpen, setIsReprogramDialogOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: "video",
      duration: "30",
      address: "",
      mapUrl: "",
      message: "",
      teamMembers: "",
      timezone: "Europe/Paris",
      alternateSlots: [],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "alternateSlots",
  });

  console.log(candidat);
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
            <div className="grid grid-cols-[2fr_3fr] gap-6">
              {/* Left Side */}
              <div className="flex flex-col gap-4 max-w-md">
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
                              className={`flex flex-1 items-center justify-center gap-2 rounded-md border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 px-3 py-2 text-sm font-medium
                                ${
                                  field.value === value
                                    ? "border-primaryHex-500 text-primaryHex-500 dark:border-primaryHex-400 dark:text-primaryHex-400"
                                    : "dark:text-zinc-300"
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

                {/* Conditional Format-specific Fields */}
                {form.watch("format") === "video" && (
                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lien de la visioconférence</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://meet.google.com/..."
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch("format") === "telephone" && (
                  <FormItem className="space-y-2">
                    <FormLabel>Numéro de téléphone du candidat</FormLabel>
                    <div className="rounded-lg border bg-card p-4">
                      {candidat.telephone ? (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {candidat.telephone}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>Numéro de téléphone non disponible</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Ce numéro sera utilisé pour l&apos;entretien téléphonique
                    </p>
                  </FormItem>
                )}

                {form.watch("format") === "person" && (
                  <>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse de l&apos;entretien</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Saisissez l'adresse complète"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mapUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lien Google Maps</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://maps.google.com/..."
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

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
              <div className="border-l border-zinc-200 dark:border-zinc-700 pl-6">
                <Tabs defaultValue="specific-time" className="w-full">
                  <div className="w-full border-secondaryHex-200 dark:border-secondaryHex-800">
                    <TabsList className="flex h-12 w-full items-center bg-transparent p-0">
                      <TabsTrigger
                        value="share-availability"
                        className="relative flex-1 h-full rounded-none border-b-2 border-transparent px-4 font-medium text-secondaryHex-600 dark:text-secondaryHex-400 outline-none ring-offset-background transition-colors hover:text-primaryHex-600 dark:hover:text-primaryHex-400 data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500 dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
                      >
                        Partager vos disponibilités
                      </TabsTrigger>
                      <TabsTrigger
                        value="specific-time"
                        className="relative flex-1 h-full rounded-none border-b-2 border-transparent px-4 font-medium text-secondaryHex-600 dark:text-secondaryHex-400 outline-none ring-offset-background transition-colors hover:text-primaryHex-600 dark:hover:text-primaryHex-400 data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500 dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
                      >
                        Choisir une heure spécifique
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="share-availability" className="mt-4">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Indiquez vos disponibilités d&apos;entretien : ajoutez
                        et supprimez des créneaux qui s&apos;appliqueront à
                        l&apos;ensemble des candidat(e)s. Vous pourrez les
                        mettre à jour à tout moment.
                      </p>
                      <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <span>You are sharing</span>
                              <span className="font-medium text-foreground">
                                N/A time slots
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsReprogramDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                              Modifier les disponibilités
                            </Button>
                          </div>
                        </div>
                        <div className="relative">
                          <div
                            id="calendar-scroll-container"
                            className="h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent hover:scrollbar-thumb-zinc-300"
                          >
                            <CalendarView
                              availabilities={{
                                1: {
                                  isAvailable: true,
                                  startTime: "09:00",
                                  endTime: "17:00",
                                },
                                2: {
                                  isAvailable: true,
                                  startTime: "09:00",
                                  endTime: "17:00",
                                },
                                3: {
                                  isAvailable: true,
                                  startTime: "09:00",
                                  endTime: "17:00",
                                },
                                4: {
                                  isAvailable: true,
                                  startTime: "09:00",
                                  endTime: "14:00",
                                },
                                5: {
                                  isAvailable: false,
                                  startTime: "09:00",
                                  endTime: "17:00",
                                },
                                6: {
                                  isAvailable: false,
                                  startTime: "09:00",
                                  endTime: "17:00",
                                },
                                7: {
                                  isAvailable: false,
                                  startTime: "09:00",
                                  endTime: "17:00",
                                },
                              }}
                              className="border-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="specific-time" className="mt-4">
                    <EntretienChoisirHeure
                      form={form}
                      fieldArray={fieldArray}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <Separator />

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
      <EntretienReprogramDialog
        isOpen={isReprogramDialogOpen}
        onOpenChange={setIsReprogramDialogOpen}
      />
    </Dialog>
  );
}
