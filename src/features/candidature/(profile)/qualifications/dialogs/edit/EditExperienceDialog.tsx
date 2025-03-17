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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeExperience } from "@/core/interfaces/resume-experience.interface";
import { useUpdateResumeExperience } from "../../hooks/use-resume-experience";

// Internal form schema uses Date objects for better date handling
const experienceFormSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  company_name: z.string().min(1, "Company name is required"),
  date_start: z.date({
    required_error: "Start date is required",
  }),
  date_end: z.date().optional(),
  current_time: z.boolean().default(false),
});

type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

interface EditExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: ResumeExperience;
}

export function EditExperienceDialog({
  open,
  onOpenChange,
  experience,
}: EditExperienceDialogProps) {
  const { mutate: updateExperience, isPending } = useUpdateResumeExperience();

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      job_title: "",
      company_name: "",
      current_time: false,
    },
  });

  // Update form when experience changes
  useEffect(() => {
    if (experience) {
      form.reset({
        job_title: experience.job_title,
        company_name: experience.company_name,
        date_start: new Date(experience.date_start),
        date_end: experience.date_end
          ? new Date(experience.date_end)
          : undefined,
        current_time: experience.current_time,
      });
    }
  }, [experience, form]);

  function onSubmit(values: ExperienceFormValues) {
    updateExperience(
      {
        uuid: experience.uuid,
        data: {
          ...values,
          date_start: format(values.date_start, "yyyy-MM-dd"),
          date_end: values.current_time
            ? format(new Date(), "yyyy-MM-dd")
            : values.date_end
            ? format(values.date_end, "yyyy-MM-dd")
            : format(new Date(), "yyyy-MM-dd"),
        },
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
      <DialogContent className="max-h-[90vh] p-0 sm:max-w-[600px]">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Edit Work Experience</DialogTitle>
          <DialogDescription>
            Update your professional experience information.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-6 max-h-[60vh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-3"
            >
              <FormField
                control={form.control}
                name="job_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Job Title <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Company <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Acme Inc." {...field} />
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
                        Start Date <span className="text-destructive">*</span>
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
                                format(field.value, "d MMMM yyyy", {
                                  locale: fr,
                                })
                              ) : (
                                <span>Pick a date</span>
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
                  name="date_end"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={form.watch("current_time")}
                            >
                              {field.value ? (
                                format(field.value, "d MMMM yyyy", {
                                  locale: fr,
                                })
                              ) : (
                                <span>Pick a date</span>
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
                              date < form.getValues("date_start")
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
                name="current_time"
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
                      <FormLabel>Current Position</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter className="p-6 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
