/**
 * PasswordVerificationForm - Form component for verifying current password
 *
 * Handles the password verification step in the process,
 * requiring the user to enter their current password.
 */

"use client";

import { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

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
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
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
