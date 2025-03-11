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

export const emailChangeSchema = z
  .object({
    newEmail: z
      .string()
      .email("Adresse email invalide")
      .min(1, "L'email est requis"),
    confirmEmail: z.string().min(1, "La confirmation de l'email est requise"),
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    message: "Les adresses email ne correspondent pas",
    path: ["confirmEmail"],
  });

export type EmailChangeForm = z.infer<typeof emailChangeSchema>;

interface EmailChangeFormProps {
  form: UseFormReturn<EmailChangeForm>;
  onCancel: () => void;
  onSubmit: (data: EmailChangeForm) => Promise<void>;
}

export function EmailChangeForm({
  form,
  onCancel,
  onSubmit,
}: EmailChangeFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouvel email</FormLabel>
              <FormControl>
                <Input
                  placeholder="nouvelle@email.com"
                  type="email"
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
              <FormLabel>Confirmer le nouvel email</FormLabel>
              <FormControl>
                <Input
                  placeholder="nouvelle@email.com"
                  type="email"
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
            Continuer
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
