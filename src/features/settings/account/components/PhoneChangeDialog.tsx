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

type Step = "verify-current" | "change";

interface PhoneChangeDialogProps {
  currentPhone: string;
  trigger?: React.ReactNode;
}

const STEPS = [{ title: "Vérification" }, { title: "Nouveau numéro" }];

export function PhoneChangeDialog({
  currentPhone,
  trigger,
}: PhoneChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("verify-current");
  const { toast } = useToast();
  const verifyPasswordMutation = useVerifyPassword();
  const updatePhoneMutation = useUpdatePhone();

  const verificationForm = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      currentPassword: "",
    },
  });

  const changeForm = useForm<PhoneChangeFormType>({
    resolver: zodResolver(phoneChangeSchema),
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
        message: "Mot de passe incorrect",
      });
    }
  };

  const handlePhoneChangeSubmit = async (data: PhoneChangeFormType) => {
    const fullPhoneNumber = `${data.countryCode}${data.newPhone}`;

    if (fullPhoneNumber === currentPhone) {
      changeForm.setError("newPhone", {
        message: "Le nouveau numéro doit être différent de l'actuel",
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
        title: "Numéro modifié",
        description: "Votre numéro de téléphone a été modifié avec succès",
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
        return "Vérification du mot de passe";
      case "change":
        return "Changer le numéro de téléphone";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "verify-current":
        return "Entrez votre mot de passe pour continuer.";
      case "change":
        return "Entrez votre nouveau numéro de téléphone.";
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
          steps={STEPS}
        />
        {getStepContent()}
      </DialogContent>
    </Dialog>
  );
}
