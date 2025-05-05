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
import { useTranslations } from "next-intl";

export const otpVerificationSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    verificationCode: z
      .string()
      .length(6, t("common.validation.otpLength", { length: 6 })),
  });

export type OtpVerificationForm = z.infer<
  ReturnType<typeof otpVerificationSchema>
>;

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
  const tCommon = useTranslations("common");

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium">
          {tCommon("form.email.verification.title")}
        </p>
        <p className="text-sm text-muted-foreground">
          {tCommon("form.email.verification.description", {
            email: newEmailAddress,
          })}
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
                  {tCommon("form.email.verification.code.label")}
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
              {tCommon("form.email.verification.code.resend")}
            </Button>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onBack}>
                {tCommon("actions.back")}
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isVerifying}
              >
                {tCommon("form.email.verification.code.verify")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
