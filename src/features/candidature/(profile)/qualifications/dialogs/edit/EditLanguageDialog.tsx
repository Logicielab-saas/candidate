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
import { useEffect, useMemo } from "react";

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
import { useTranslations } from "next-intl";

const formSchema = (t: (key: string) => string) =>
  z.object({
    language_uuid: z.string({
      required_error: t("validation.selectALanguage"),
    }),
    level: z.number({
      required_error: t("validation.languageProficiencyLevelRequired"),
    }),
  });

type FormValues = z.infer<ReturnType<typeof formSchema>>;

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
  const t = useTranslations("resumePage.languages.dialog.edit");
  const tCommon = useTranslations("common");

  const { data: languages, isLoading } = useLanguages();
  const { mutate: updateLanguage, isPending } =
    useUpdateResumeLanguage(tCommon);

  const editLanguageSchema = useMemo(() => formSchema(tCommon), [tCommon]);

  const form = useForm<FormValues>({
    resolver: zodResolver(editLanguageSchema),
    defaultValues: {
      language_uuid: "",
      level: 1,
    },
  });

  // Update form when language changes
  useEffect(() => {
    if (language) {
      form.reset({
        language_uuid: language.language_uuid,
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
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="language_uuid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tCommon("language")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading || isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={tCommon("exLangue")} />
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
                  <FormLabel>{tCommon("langueProficiencyLevel")}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={tCommon("exLangueProficiencyLevel")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROFICIENCY_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                        >
                          {tCommon(`${option.label}`)}
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
                {tCommon("actions.cancel")}
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? tCommon("actions.saving")
                  : tCommon("actions.save")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
