"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Experience } from "@/core/interfaces/";
import { ScrollArea } from "@/components/ui/scroll-area";

// Internal form schema uses Date objects for better date handling
const experienceFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  company: z.string().min(1, "L'entreprise est requise"),
  startDate: z.date({
    required_error: "La date de début est requise",
  }),
  endDate: z.date().optional(),
  current: z.boolean().default(false),
  description: z.string().min(1, "La description est requise"),
});

type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

interface AddExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Omit<Experience, "id">) => void;
}

export function AddExperienceDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddExperienceDialogProps) {
  const { toast } = useToast();
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      title: "",
      company: "",
      current: false,
      description: "",
    },
  });

  const handleSubmit = (values: ExperienceFormValues) => {
    // Convert Date objects to formatted strings before submitting
    const formattedValues: Omit<Experience, "id"> = {
      ...values,
      startDate: format(values.startDate, "MMMM yyyy", { locale: fr }),
      endDate: values.endDate
        ? format(values.endDate, "MMMM yyyy", { locale: fr })
        : undefined,
    };
    onSubmit(formattedValues);
    form.reset();
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Expérience ajoutée",
      description: "L'expérience a été ajoutée avec succès.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[600px]">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Ajouter une expérience professionnelle</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle expérience professionnelle à votre profil.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-6 max-h-[60vh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 px-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Titre du poste <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Développeur Full Stack"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Entreprise <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: TechCorp Solutions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Date de début{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MMMM yyyy", { locale: fr })
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
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de fin</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={form.watch("current")}
                            >
                              {field.value ? (
                                format(field.value, "MMMM yyyy", { locale: fr })
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
                              date > new Date() ||
                              date < form.getValues("startDate")
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

              <FormField
                control={form.control}
                name="current"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) {
                            form.setValue("endDate", undefined);
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Poste actuel</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez vos responsabilités et réalisations..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter className="p-6 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button onClick={form.handleSubmit(handleSubmit)}>Ajouter</Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
