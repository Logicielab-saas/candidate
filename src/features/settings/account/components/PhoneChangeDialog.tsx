/**
 * PhoneChangeDialog - Dialog for changing user phone number
 *
 * A client component that provides a form to change the user's phone number
 * with a two-step process:
 * 1. Enter current password for verification
 * 2. Enter new phone number
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
  PhoneChangeForm,
  PhoneChangeForm as PhoneChangeFormType,
  phoneChangeSchema,
} from "./PhoneChangeForm";
import { useVerifyPassword } from "../hooks/use-verify-password";
import { useUpdatePhone } from "../hooks/use-update-phone";
import { useTranslations } from "next-intl";

type Step = "verify-current" | "change";

interface PhoneChangeDialogProps {
  currentPhone: string;
  trigger?: React.ReactNode;
}

const getSteps = (t: (key: string) => string) => [
  {
    title: t("settings.account.info.phoneChange.dialog.stepIndicator.0.title"),
  },
  {
    title: t("settings.account.info.phoneChange.dialog.stepIndicator.1.title"),
  },
];

export function PhoneChangeDialog({
  currentPhone,
  trigger,
}: PhoneChangeDialogProps) {
  const t = useTranslations();
  const tCommon = useTranslations("common");

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("verify-current");

  const { toast } = useToast();
  const steps = getSteps(t);

  const verifyPasswordMutation = useVerifyPassword(tCommon);
  const updatePhoneMutation = useUpdatePhone(tCommon);

  const verificationForm = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema(t)),
    defaultValues: {
      currentPassword: "",
    },
  });

  const changeForm = useForm<PhoneChangeFormType>({
    resolver: zodResolver(phoneChangeSchema(t)),
    defaultValues: {
      countryCode: "+212",
      newPhone: "",
    },
  });

  const resetForms = () => {
    verificationForm.reset();
    changeForm.reset();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForms();
      setStep("verify-current");
    }
  };

  const handleVerificationSubmit = async (data: VerificationForm) => {
    try {
      await verifyPasswordMutation.mutateAsync(data.currentPassword);
      setStep("change");
      verificationForm.reset();
    } catch {
      verificationForm.setError("currentPassword", {
        message: t(
          "settings.account.info.emailChange.dialog.validation.passwordIncorrect"
        ),
      });
    }
  };

  const handlePhoneChangeSubmit = async (data: PhoneChangeFormType) => {
    const fullPhoneNumber = `${data.countryCode}${data.newPhone}`;

    if (fullPhoneNumber === currentPhone) {
      changeForm.setError("newPhone", {
        message: t(
          "settings.account.info.phoneChange.dialog.validation.phoneSame"
        ),
      });
      return;
    }

    try {
      await updatePhoneMutation.mutateAsync(fullPhoneNumber);
      setIsOpen(false);
      resetForms();
      setStep("verify-current");
      toast({
        variant: "success",
        title: t("settings.account.info.phoneChange.success.title"),
        description: t("settings.account.info.phoneChange.success.description"),
      });
    } catch (_error) {
      // Error toast is handled by the mutation
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetForms();
    setStep("verify-current");
  };

  const getStepContent = () => {
    switch (step) {
      case "verify-current":
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
          <PhoneChangeForm
            form={changeForm}
            onCancel={handleCancel}
            onSubmit={handlePhoneChangeSubmit}
            isLoading={updatePhoneMutation.isPending}
          />
        );
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "verify-current":
        return t(
          "settings.account.info.phoneChange.dialog.steps.verification.title"
        );
      case "change":
        return t("settings.account.info.phoneChange.dialog.steps.change.title");
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "verify-current":
        return t(
          "settings.account.info.phoneChange.dialog.steps.verification.description"
        );
      case "change":
        return t(
          "settings.account.info.phoneChange.dialog.steps.change.description"
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
          currentStep={step === "verify-current" ? 0 : 1}
          steps={steps}
        />
        {getStepContent()}
      </DialogContent>
    </Dialog>
  );
}
