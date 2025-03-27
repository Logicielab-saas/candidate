/**
 * PasswordVerificationForm - Form component for verifying current password
 *
 * Handles the password verification step in the process,
 * requiring the user to enter their current password.
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

export const verificationSchema = z.object({
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
});

export type VerificationForm = z.infer<typeof verificationSchema>;

interface PasswordVerificationFormProps {
  form: UseFormReturn<VerificationForm>;
  onCancel: () => void;
  onSubmit: (data: VerificationForm) => Promise<void>;
  isLoading?: boolean;
}

export function PasswordVerificationForm({
  form,
  onCancel,
  onSubmit,
  isLoading = false,
}: PasswordVerificationFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe actuel</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
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
