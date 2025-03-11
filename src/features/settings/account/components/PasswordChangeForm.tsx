/**
 * PasswordChangeForm - Form component for changing password
 *
 * Handles the password change step in the process,
 * including new password input and confirmation with validation.
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const passwordChangeSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"
      ),
    confirmPassword: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type PasswordChangeForm = z.infer<typeof passwordChangeSchema>;

interface PasswordChangeFormProps {
  form: UseFormReturn<PasswordChangeForm>;
  onCancel: () => void;
  onSubmit: (data: PasswordChangeForm) => Promise<void>;
}

export function PasswordChangeForm({
  form,
  onCancel,
  onSubmit,
}: PasswordChangeFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Le mot de passe doit contenir au moins 8 caractères, une
                majuscule, une minuscule et un chiffre.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Changer le mot de passe
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
