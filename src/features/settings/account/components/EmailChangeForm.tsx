/**
 * EmailChangeForm - Form component for changing email
 *
 * Handles the email change step in the process,
 * including new email input and confirmation.
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";

export const emailChangeSchema = (t: (key: string) => string) =>
  z
    .object({
      newEmail: z
        .string()
        .email(
          t("settings.account.info.emailChange.dialog.validation.emailInvalid")
        )
        .min(
          1,
          t("settings.account.info.emailChange.dialog.validation.emailRequired")
        ),
      confirmEmail: z
        .string()
        .min(
          1,
          t(
            "settings.account.info.emailChange.dialog.validation.confirmEmailRequired"
          )
        ),
    })
    .refine((data) => data.newEmail === data.confirmEmail, {
      message: t(
        "settings.account.info.emailChange.dialog.validation.emailMismatch"
      ),
      path: ["confirmEmail"],
    });

export type EmailChangeForm = z.infer<ReturnType<typeof emailChangeSchema>>;

interface EmailChangeFormProps {
  form: UseFormReturn<EmailChangeForm>;
  onCancel: () => void;
  onSubmit: (data: EmailChangeForm) => Promise<void>;
  isLoading?: boolean;
}

export function EmailChangeForm({
  form,
  onCancel,
  onSubmit,
  isLoading = false,
}: EmailChangeFormProps) {
  const t = useTranslations();
  const tCommon = useTranslations("common");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t(
                  "settings.account.info.emailChange.dialog.form.newEmail.label"
                )}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "settings.account.info.emailChange.dialog.form.newEmail.placeholder"
                  )}
                  type="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t(
                  "settings.account.info.emailChange.dialog.form.confirmEmail.label"
                )}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "settings.account.info.emailChange.dialog.form.confirmEmail.placeholder"
                  )}
                  type="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
          >
            {tCommon("actions.cancel")}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {tCommon("actions.continue")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
