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
import {
  EmailVerificationForm,
  OtpVerificationForm,
  otpVerificationSchema,
} from "./EmailVerificationForm";
import { useVerifyPassword } from "../hooks/use-verify-password";
import { useTranslations } from "next-intl";

type Step = "verify-password" | "change" | "confirm";

interface EmailChangeDialogProps {
  currentEmail: string;
  onEmailChange: (newEmail: string) => Promise<void>;
  trigger?: React.ReactNode;
}

const getSteps = (t: ReturnType<typeof useTranslations>) => [
  {
    title: t("settings.account.info.emailChange.dialog.stepIndicator.0.title"),
  },
  {
    title: t("settings.account.info.emailChange.dialog.stepIndicator.1.title"),
  },
  {
    title: t("settings.account.info.emailChange.dialog.stepIndicator.2.title"),
  },
];

// Static verification code (this will be replaced with real email verification later)
const VERIFICATION_CODE = "111111";

export function EmailChangeDialog({
  currentEmail,
  onEmailChange,
  trigger,
}: EmailChangeDialogProps) {
  const t = useTranslations();
  const tCommon = useTranslations("common");

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("verify-password");
  const [newEmailAddress, setNewEmailAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const verifyPasswordMutation = useVerifyPassword(tCommon);
  const steps = getSteps(t);

  const verificationForm = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema(t)),
    defaultValues: {
      currentPassword: "",
    },
  });

  const changeForm = useForm<EmailChangeFormType>({
    resolver: zodResolver(emailChangeSchema(t)),
    defaultValues: {
      newEmail: "",
      confirmEmail: "",
    },
  });

  const otpForm = useForm<OtpVerificationForm>({
    resolver: zodResolver(otpVerificationSchema(t)),
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
      setStep("verify-password");
    }
  };

  const handleVerificationSubmit = async (data: VerificationForm) => {
    try {
      await verifyPasswordMutation.mutateAsync(data.currentPassword);
      setStep("change");
      verificationForm.reset();
    } catch {
      verificationForm.setError("currentPassword", {
        message: "Mot de passe incorrect",
      });
    }
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
        title: t(
          "settings.account.info.emailChange.dialog.form.verification.codeSent"
        ),
        description:
          t.rich(
            "settings.account.info.emailChange.dialog.form.verification.codeSentDescription",
            { email: newEmailAddress }
          ) + `. Pour le test, utilisez le code: ${VERIFICATION_CODE}`,
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: tCommon("error.title"),
        description: "Impossible d'envoyer le code de vérification",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpSubmit = async (data: OtpVerificationForm) => {
    if (data.verificationCode !== VERIFICATION_CODE) {
      otpForm.setError("verificationCode", {
        message: t(
          "settings.account.info.emailChange.dialog.validation.codeIncorrect"
        ),
      });
      return;
    }

    try {
      await onEmailChange(newEmailAddress);
      setIsOpen(false);
      resetForms();
      setStep("verify-password");
      toast({
        variant: "success",
        title: t("settings.account.info.emailChange.success.title"),
        description: t("settings.account.info.emailChange.success.description"),
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: t("settings.account.info.emailChange.error.title"),
        description: t("settings.account.info.emailChange.error.description"),
      });
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetForms();
    setStep("verify-password");
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
            isLoading={verifyPasswordMutation.isPending}
          />
        );
      case "change":
        return (
          <EmailChangeForm
            form={changeForm}
            onCancel={handleCancel}
            onSubmit={handleEmailChangeSubmit}
            isLoading={false}
          />
        );
      case "confirm":
        return (
          <EmailVerificationForm
            form={otpForm}
            newEmailAddress={newEmailAddress}
            isVerifying={isVerifying}
            onBack={handleBack}
            onSubmit={handleOtpSubmit}
            onResendCode={handleSendVerification}
          />
        );
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "verify-password":
        return t(
          "settings.account.info.emailChange.dialog.steps.verification.title"
        );
      case "change":
        return t("settings.account.info.emailChange.dialog.steps.change.title");
      case "confirm":
        return t(
          "settings.account.info.emailChange.dialog.steps.confirm.title"
        );
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "verify-password":
        return t(
          "settings.account.info.emailChange.dialog.steps.verification.description"
        );
      case "change":
        return t(
          "settings.account.info.emailChange.dialog.steps.change.description"
        );
      case "confirm":
        return t(
          "settings.account.info.emailChange.dialog.steps.confirm.description"
        );
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
          steps={steps}
        />
        {getStepContent()}
      </DialogContent>
    </Dialog>
  );
}
