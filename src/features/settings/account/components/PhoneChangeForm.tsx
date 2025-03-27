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

export const phoneChangeSchema = z.object({
  countryCode: z.string(),
  newPhone: z
    .string()
    .min(9, "Le numéro doit contenir au moins 9 chiffres")
    .regex(/^[0-9]+$/, "Format de numéro invalide"),
});

export type PhoneChangeForm = z.infer<typeof phoneChangeSchema>;

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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau numéro</FormLabel>
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
                    placeholder="612345678"
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
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            Continuer
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
