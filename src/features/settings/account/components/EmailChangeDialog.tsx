/**
 * EmailChangeDialog - Dialog for changing user email
 *
 * A client component that provides a form to change the user's email address
 * with a three-step process:
 * 1. Enter current password for verification
 * 2. Enter new email
 * 3. Verify new email with OTP
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { StepIndicator } from "@/components/shared/StepIndicator";
import {
  PasswordVerificationForm,
  VerificationForm,
  verificationSchema,
} from "./PasswordVerificationForm";
import {
  EmailChangeForm,
  EmailChangeForm as EmailChangeFormType,
  emailChangeSchema,
} from "./EmailChangeForm";
import { MOCK_USER } from "@/core/mockData/user";
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
import * as z from "zod";

// Static verification code (this will be replaced with real email verification later)
const VERIFICATION_CODE = "111111";

const otpVerificationSchema = z.object({
  verificationCode: z.string().length(6, "Le code doit contenir 6 chiffres"),
});

type OtpVerificationForm = z.infer<typeof otpVerificationSchema>;

type Step = "verify-password" | "change" | "confirm";

interface EmailChangeDialogProps {
  currentEmail: string;
  onEmailChange: (newEmail: string) => Promise<void>;
  trigger?: React.ReactNode;
}

const STEPS = [
  { title: "Vérification" },
  { title: "Nouvel email" },
  { title: "Confirmation" },
];

export function EmailChangeDialog({
  currentEmail,
  onEmailChange,
  trigger,
}: EmailChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("verify-password");
  const [newEmailAddress, setNewEmailAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const verificationForm = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      currentPassword: "",
    },
  });

  const changeForm = useForm<EmailChangeFormType>({
    resolver: zodResolver(emailChangeSchema),
    defaultValues: {
      newEmail: "",
      confirmEmail: "",
    },
  });

  const otpForm = useForm<OtpVerificationForm>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const resetForms = () => {
    verificationForm.reset();
    changeForm.reset();
    otpForm.reset();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForms();
    }
  };

  const handleVerificationSubmit = async (data: VerificationForm) => {
    if (data.currentPassword !== MOCK_USER.password) {
      verificationForm.setError("currentPassword", {
        message: "Mot de passe incorrect",
      });
      return;
    }

    setStep("change");
    verificationForm.reset();
  };

  const handleEmailChangeSubmit = async (data: EmailChangeFormType) => {
    if (data.newEmail === currentEmail) {
      changeForm.setError("newEmail", {
        message: "La nouvelle adresse email doit être différente de l'actuelle",
      });
      return;
    }

    setNewEmailAddress(data.newEmail);
    setStep("confirm");
    // Send verification code when entering confirmation step
    handleSendVerification();
  };

  const handleSendVerification = async () => {
    try {
      setIsVerifying(true);
      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Code de vérification envoyé",
        description: `Un code de vérification a été envoyé à ${newEmailAddress}. Pour le test, utilisez le code: ${VERIFICATION_CODE}`,
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer le code de vérification",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpSubmit = async (data: OtpVerificationForm) => {
    if (data.verificationCode !== VERIFICATION_CODE) {
      otpForm.setError("verificationCode", {
        message: "Code de vérification incorrect",
      });
      return;
    }

    try {
      await onEmailChange(newEmailAddress);
      setIsOpen(false);
      resetForms();
      setStep("verify-password"); // Reset step only after successful email change
      toast({
        variant: "success",
        title: "Email modifié",
        description: "Votre adresse email a été modifiée avec succès",
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier l'adresse email",
      });
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetForms();
    setStep("verify-password"); // Reset step when user explicitly cancels
  };

  const handleBack = () => {
    setStep("change");
    otpForm.reset();
  };

  const getStepContent = () => {
    switch (step) {
      case "verify-password":
        return (
          <PasswordVerificationForm
            form={verificationForm}
            onCancel={handleCancel}
            onSubmit={handleVerificationSubmit}
          />
        );
      case "change":
        return (
          <EmailChangeForm
            form={changeForm}
            onCancel={handleCancel}
            onSubmit={handleEmailChangeSubmit}
          />
        );
      case "confirm":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">
                Vérification du nouvel email
              </p>
              <p className="text-sm text-muted-foreground">
                Un code de vérification a été envoyé à{" "}
                <span className="font-medium text-foreground">
                  {newEmailAddress}
                </span>
              </p>
            </div>
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={otpForm.control}
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
                    onClick={handleSendVerification}
                    disabled={isVerifying}
                    className="block mx-auto"
                  >
                    Renvoyer le code
                  </Button>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={handleBack}>
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      disabled={otpForm.formState.isSubmitting || isVerifying}
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
  };

  const getStepTitle = () => {
    switch (step) {
      case "verify-password":
        return "Vérification du mot de passe";
      case "change":
        return "Changer l'adresse email";
      case "confirm":
        return "Vérification du nouvel email";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "verify-password":
        return "Entrez votre mot de passe pour continuer.";
      case "change":
        return "Entrez votre nouvelle adresse email.";
      case "confirm":
        return "Entrez le code de vérification envoyé à votre nouvelle adresse email.";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Changer</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getStepTitle()}</DialogTitle>
          <DialogDescription>{getStepDescription()}</DialogDescription>
        </DialogHeader>
        <StepIndicator
          currentStep={
            step === "verify-password" ? 0 : step === "change" ? 1 : 2
          }
          steps={STEPS}
        />
        {getStepContent()}
      </DialogContent>
    </Dialog>
  );
}
