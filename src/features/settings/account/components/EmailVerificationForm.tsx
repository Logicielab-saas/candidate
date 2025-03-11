/**
 * EmailVerificationForm - Form component for email verification
 *
 * Handles the verification step in the email change process,
 * including OTP input and verification code sending.
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { DialogFooter } from "@/components/ui/dialog";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const verificationSchema = z.object({
  verificationCode: z.string().length(6, "Le code doit contenir 6 caractères"),
});

export type VerificationForm = z.infer<typeof verificationSchema>;

interface EmailVerificationFormProps {
  form: UseFormReturn<VerificationForm>;
  email: string;
  isVerifying: boolean;
  showBackButton?: boolean;
  onSendVerification: (email: string) => Promise<void>;
  onCancel: () => void;
  onBack?: () => void;
  onSubmit: (data: VerificationForm) => Promise<void>;
}

export function EmailVerificationForm({
  form,
  email,
  isVerifying,
  showBackButton,
  onSendVerification,
  onCancel,
  onBack,
  onSubmit,
}: EmailVerificationFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-center w-full block">
                  Code de vérification
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center gap-2">
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col w-full gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onSendVerification(email)}
              disabled={isVerifying}
            >
              {isVerifying
                ? "Envoi en cours..."
                : "Envoyer le code de vérification"}
            </Button>
            {showBackButton && onBack && (
              <Button type="button" variant="ghost" onClick={onBack}>
                Retour à la modification
              </Button>
            )}
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={
              !form.getValues("verificationCode") || form.formState.isSubmitting
            }
          >
            Vérifier
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
