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
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreateResumeEducation } from "../../hooks/use-resume-education";
import type { CreateEducationDTO } from "../../services/resume-education";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

// Internal form schema uses Date objects for better date handling
const educationFormSchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(1, t("validation.schoolNameRequired")),
    degree: z.string().min(1, t("validation.degreeRequired")),
    date_start: z.date({
      required_error: t("validation.startDateRequired"),
    }),
    date_end: z.date().optional(),
    is_current: z.boolean().default(false),
    description: z.string().optional(),
  });

type EducationFormValues = z.infer<ReturnType<typeof educationFormSchema>>;

interface AddEducationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEducationDialog({
  open,
  onOpenChange,
}: AddEducationDialogProps) {
  const t = useTranslations("resumePage.education.dialog.add");
  const tCommon = useTranslations("common");
  const { mutate: createEducation, isPending } =
    useCreateResumeEducation(tCommon);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const createEducationFormSchema = useMemo(
    () => educationFormSchema(tCommon),
    [tCommon]
  );

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(createEducationFormSchema),
    defaultValues: {
      title: "",
      degree: "",
      is_current: false,
      description: "",
    },
  });

  function onSubmit(values: EducationFormValues) {
    const educationData: CreateEducationDTO = {
      title: values.title,
      degree: values.degree,
      date_start: format(values.date_start, "yyyy-MM-dd"),
      date_end: values.is_current
        ? format(new Date(), "yyyy-MM-dd")
        : values.date_end
        ? format(values.date_end, "yyyy-MM-dd")
        : null,
      description: values.description || null,
      is_current: values.is_current,
    };

    createEducation(educationData, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[500px]">
        <ScrollArea className="px-3 max-h-[90vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("description")}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {tCommon("school")}{" "}
                      <span className="text-destructive">
                        {tCommon("form.required")}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={tCommon("exSchool")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {tCommon("degree")}{" "}
                      <span className="text-destructive">
                        {tCommon("form.required")}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={tCommon("exDegree")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date_start"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        {tCommon("startDate")}{" "}
                        <span className="text-destructive">
                          {tCommon("form.required")}
                        </span>
                      </FormLabel>
                      <div className="flex gap-2">
                        <Popover
                          open={startDateOpen}
                          onOpenChange={setStartDateOpen}
                        >
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
                                  format(field.value, "d MMMM yyyy", {
                                    locale: fr,
                                  })
                                ) : (
                                  <span>{tCommon("exDate")}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setStartDateOpen(false);
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date_end"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{tCommon("endDate")}</FormLabel>
                      <div className="flex gap-2">
                        <Popover
                          open={endDateOpen}
                          onOpenChange={setEndDateOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                                disabled={form.watch("is_current")}
                              >
                                {field.value ? (
                                  format(field.value, "d MMMM yyyy", {
                                    locale: fr,
                                  })
                                ) : (
                                  <span>{tCommon("exDate")}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setEndDateOpen(false);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {field.value && !form.watch("is_current") && (
                          <Button
                            variant="outline"
                            className="w-10"
                            type="button"
                            onClick={() => field.onChange(undefined)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="is_current"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) {
                            form.setValue("date_end", undefined);
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{tCommon("currentStudying")}</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tCommon("description")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={tCommon("exDescription")}
                        {...field}
                        value={field.value || ""}
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
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {tCommon("actions.cancel")}
            </Button>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? tCommon("actions.adding") : tCommon("actions.add")}
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
