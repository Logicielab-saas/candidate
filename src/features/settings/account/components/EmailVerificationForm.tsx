/**
 * EmailVerificationForm - Form component for verifying new email with OTP
 *
 * Handles the email verification step in the process,
 * including OTP input and resend functionality.
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
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const otpVerificationSchema = z.object({
  verificationCode: z.string().length(6, "Le code doit contenir 6 chiffres"),
});

export type OtpVerificationForm = z.infer<typeof otpVerificationSchema>;

interface EmailVerificationFormProps {
  form: UseFormReturn<OtpVerificationForm>;
  newEmailAddress: string;
  isVerifying: boolean;
  onBack: () => void;
  onSubmit: (data: OtpVerificationForm) => Promise<void>;
  onResendCode: () => Promise<void>;
}

export function EmailVerificationForm({
  form,
  newEmailAddress,
  isVerifying,
  onBack,
  onSubmit,
  onResendCode,
}: EmailVerificationFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium">Vérification du nouvel email</p>
        <p className="text-sm text-muted-foreground">
          Un code de vérification a été envoyé à{" "}
          <span className="font-medium text-foreground">{newEmailAddress}</span>
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-center block">
                  Code de vérification
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
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
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <Button
              type="button"
              variant="link"
              onClick={onResendCode}
              disabled={isVerifying}
              className="block mx-auto"
            >
              Renvoyer le code
            </Button>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onBack}>
                Retour
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isVerifying}
              >
                Vérifier
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
