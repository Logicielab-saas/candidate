/**
 * PhoneChangeForm - Form component for changing phone number
 *
 * Handles the phone change step in the process,
 * including country code selection and phone number input.
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
import { CountryCodeSelect } from "@/components/shared/CountryCodeSelect";
import * as z from "zod";
import { useTranslations } from "next-intl";

export const phoneChangeSchema = (t: (key: string) => string) =>
  z.object({
    countryCode: z.string(),
    newPhone: z
      .string()
      .min(
        9,
        t("settings.account.info.phoneChange.dialog.validation.phoneMinLength")
      )
      .regex(
        /^[0-9]+$/,
        t("settings.account.info.phoneChange.dialog.validation.phoneInvalid")
      ),
  });

export type PhoneChangeForm = z.infer<ReturnType<typeof phoneChangeSchema>>;

interface PhoneChangeFormProps {
  form: UseFormReturn<PhoneChangeForm>;
  onCancel: () => void;
  onSubmit: (data: PhoneChangeForm) => Promise<void>;
  isLoading?: boolean;
}

export function PhoneChangeForm({
  form,
  onCancel,
  onSubmit,
  isLoading = false,
}: PhoneChangeFormProps) {
  const t = useTranslations();
  const tCommon = useTranslations("common");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t(
                  "settings.account.info.phoneChange.dialog.form.newPhone.label"
                )}
              </FormLabel>
              <FormControl>
                <div className="flex">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <CountryCodeSelect
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    )}
                  />
                  <Input
                    placeholder={t(
                      "settings.account.info.phoneChange.dialog.form.newPhone.placeholder"
                    )}
                    type="tel"
                    className="rounded-l-none"
                    disabled={isLoading}
                    {...field}
                    onChange={(e) => {
                      // Remove any non-digit characters
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value);
                    }}
                  />
                </div>
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
