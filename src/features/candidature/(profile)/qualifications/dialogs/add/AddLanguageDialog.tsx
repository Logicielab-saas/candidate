/**
 * AddLanguageDialog - Dialog for adding a new language to the resume
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
import { useCreateResumeLanguage } from "../../hooks/use-resume-language";
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
import LoaderOne from "@/components/ui/loader-one";
import { useMemo } from "react";

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

interface AddLanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLanguageDialog({
  open,
  onOpenChange,
}: AddLanguageDialogProps) {
  const { data: languages, isLoading } = useLanguages();
  const { mutate: createLanguage, isPending } = useCreateResumeLanguage();

  const t = useTranslations("resumePage.languages.dialog.add");
  const tCommon = useTranslations("common");

  const addLanguageSchema = useMemo(() => formSchema(tCommon), [tCommon]);

  const form = useForm<FormValues>({
    resolver: zodResolver(addLanguageSchema),
  });

  function onSubmit(values: FormValues) {
    createLanguage(
      {
        language_uuid: values.language_uuid,
        level: values.level.toString(),
      },
      {
        onSuccess: () => {
          form.reset();
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
                        {isLoading ? (
                          <LoaderOne />
                        ) : (
                          <SelectValue placeholder={tCommon("exLangue")} />
                        )}
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
                          {tCommon(option.label)}
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
                {isPending ? tCommon("actions.adding") : tCommon("actions.add")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
