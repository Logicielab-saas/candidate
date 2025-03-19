/**
 * EditLanguageDialog - Dialog for editing an existing language in the resume
 *
 * Features:
 * - Language selection via Select
 * - Proficiency level selection
 * - Form validation
 * - Loading states
 */

"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguages } from "@/hooks/use-languages";
import { PROFICIENCY_OPTIONS } from "../../constants/language-proficiency";
import { useUpdateResumeLanguage } from "../../hooks/use-resume-language";
import type { ResumeLanguage } from "@/core/interfaces";
import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  language_uuid: z.string({
    required_error: "Please select a language",
  }),
  level: z.number({
    required_error: "Please select a proficiency level",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditLanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: ResumeLanguage;
}

export function EditLanguageDialog({
  open,
  onOpenChange,
  language,
}: EditLanguageDialogProps) {
  const { data: languages, isLoading } = useLanguages();
  const { mutate: updateLanguage, isPending } = useUpdateResumeLanguage();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language_uuid: "",
      level: 1,
    },
  });

  // Update form when language changes
  useEffect(() => {
    if (language) {
      form.reset({
        language_uuid: language.uuid,
        level: Number(language.level),
      });
    }
  }, [language, form]);

  function onSubmit(values: FormValues) {
    updateLanguage(
      {
        uuid: language.uuid,
        language_uuid: values.language_uuid,
        level: values.level.toString(),
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Language</DialogTitle>
          <DialogDescription>
            Update your language proficiency level.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="language_uuid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading || isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages?.map((language) => (
                        <SelectItem key={language.uuid} value={language.uuid}>
                          {language.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROFICIENCY_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
