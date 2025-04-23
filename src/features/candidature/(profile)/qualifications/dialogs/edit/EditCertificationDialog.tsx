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
import { useEffect, useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateResumeCertification } from "../../hooks/use-resume-certification";
import type { ResumeCertifications } from "@/core/interfaces";
import { useTranslations } from "next-intl";

const certificationFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("validation.certfNameRequired")),
    organization: z.string().min(1, t("validation.certfOrganizationRequired")),
    date: z.date({
      required_error: t("validation.certfDateRequired"),
    }),
    expiration_date: z.date().nullable().optional(),
    description: z.string().optional(),
  });

type CertificationFormValues = z.infer<
  ReturnType<typeof certificationFormSchema>
>;

interface EditCertificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certification: ResumeCertifications;
}

export function EditCertificationDialog({
  open,
  onOpenChange,
  certification,
}: EditCertificationDialogProps) {
  const t = useTranslations("resumePage.certifications.dialog");
  const tCommon = useTranslations("common");
  const { mutate: updateCertification, isPending } =
    useUpdateResumeCertification();

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const editCertificationSchema = useMemo(
    () => certificationFormSchema(tCommon),
    [tCommon]
  );

  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(editCertificationSchema),
    defaultValues: {
      name: "",
      organization: "",
      description: "",
    },
  });

  // Update form when certification changes
  useEffect(() => {
    if (certification) {
      form.reset({
        name: certification.name,
        organization: certification.organization,
        date: new Date(certification.date),
        expiration_date: certification.expiration_date
          ? new Date(certification.expiration_date)
          : undefined,
        description: certification.description || "",
      });
    }
  }, [certification, form]);

  function onSubmit(values: CertificationFormValues) {
    updateCertification(
      {
        ...values,
        uuid: certification.uuid,
        date: format(values.date, "yyyy-MM-dd"),
        expiration_date: values.expiration_date
          ? format(values.expiration_date, "yyyy-MM-dd")
          : null,
        description: values.description || null,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[500px]">
        <ScrollArea className="px-3 max-h-[90vh]">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>{t("edit.title")}</DialogTitle>
            <DialogDescription>{t("edit.description")}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-3"
            >
              {/* Certification Name Section */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {tCommon("certfName")}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={tCommon("exCertfName")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Organization Section */}
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {tCommon("certfOrganization")}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={tCommon("exCertfOrganization")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Section */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        {tCommon("certfDate")}
                        <span className="text-destructive">*</span>
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
                                  <span>{tCommon("exCertfDate")}</span>
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
                        {/* {field.value && (
                          <Button
                            variant="outline"
                            className="w-10"
                            onClick={() => field.onChange(undefined)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )} */}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Expiration Date Section */}
                <FormField
                  control={form.control}
                  name="expiration_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{tCommon("certfExpDate")}</FormLabel>
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
                              >
                                {field.value ? (
                                  format(field.value, "d MMMM yyyy", {
                                    locale: fr,
                                  })
                                ) : (
                                  <span>{tCommon("exCertfDate")}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ?? undefined}
                              onSelect={(date) => {
                                field.onChange(date);
                                setEndDateOpen(false);
                              }}
                              disabled={(date) => date < form.getValues("date")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {field.value && (
                          <Button
                            variant="outline"
                            className="w-10"
                            type="button"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              e.preventDefault();
                              field.onChange(null);
                            }}
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

              {/* Description Section */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tCommon("description")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={tCommon("exDescription")}
                        className="min-h-[120px]"
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
              {isPending ? tCommon("actions.saving") : tCommon("actions.save")}
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
