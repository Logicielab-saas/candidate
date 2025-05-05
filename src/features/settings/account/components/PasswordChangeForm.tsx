/**
 * PasswordChangeForm - Form component for changing password
 *
 * Handles the password change step in the process,
 * including current password, new password input and confirmation.
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { UseFormReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import { useTranslations } from "next-intl";

export const passwordChangeSchema = (t: (key: string) => string) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(1, t("common.validation.passwordRequired")),
      newPassword: z
        .string()
        .min(8, t("common.validation.passwordMinLength"))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          t("common.validation.passwordPattern")
        ),
      confirmPassword: z
        .string()
        .min(1, t("common.validation.passwordRequired")),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("common.validation.passwordMismatch"),
      path: ["confirmPassword"],
    });

export type PasswordChangeForm = z.infer<
  ReturnType<typeof passwordChangeSchema>
>;

interface PasswordChangeFormProps {
  form: UseFormReturn<PasswordChangeForm>;
  onCancel: () => void;
  onSubmit: (data: PasswordChangeForm) => Promise<void>;
  isLoading?: boolean;
}

export function PasswordChangeForm({
  form,
  onCancel,
  onSubmit,
  isLoading = false,
}: PasswordChangeFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const tCommon = useTranslations("common");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tCommon("form.password.current")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder={tCommon("passwordMask")}
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    disabled={isLoading}
                  >
                    {showCurrentPassword ? (
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
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tCommon("form.password.new")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder={tCommon("passwordMask")}
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    disabled={isLoading}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                {tCommon("form.password.requirements")}
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
              <FormLabel>{tCommon("form.password.confirm")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={tCommon("passwordMask")}
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
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
            {tCommon("actions.cancel")}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? tCommon("actions.changing")
              : tCommon("actions.change")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
