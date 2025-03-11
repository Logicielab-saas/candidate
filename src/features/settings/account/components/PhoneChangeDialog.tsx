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
import { MOCK_USER } from "@/core/mockData/user";

type Step = "verify-current" | "change";

interface PhoneChangeDialogProps {
  currentPhone: string;
  onPhoneChange: (newPhone: string) => Promise<void>;
  trigger?: React.ReactNode;
}

const STEPS = [{ title: "Vérification" }, { title: "Nouveau numéro" }];

export function PhoneChangeDialog({
  currentPhone,
  onPhoneChange,
  trigger,
}: PhoneChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("verify-current");
  const { toast } = useToast();

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

  const handlePhoneChangeSubmit = async (data: PhoneChangeFormType) => {
    const fullPhoneNumber = `${data.countryCode}${data.newPhone}`;

    if (fullPhoneNumber === currentPhone) {
      changeForm.setError("newPhone", {
        message: "Le nouveau numéro doit être différent de l'actuel",
      });
      return;
    }

    try {
      await onPhoneChange(fullPhoneNumber);
      setIsOpen(false);
      resetForms();
      setStep("verify-current"); // Reset step only after successful phone change
      toast({
        variant: "success",
        title: "Numéro modifié",
        description: "Votre numéro de téléphone a été modifié avec succès",
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le numéro de téléphone",
      });
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetForms();
    setStep("verify-current"); // Reset step when user explicitly cancels
  };

  const getStepContent = () => {
    switch (step) {
      case "verify-current":
        return (
          <PasswordVerificationForm
            form={verificationForm}
            onCancel={handleCancel}
            onSubmit={handleVerificationSubmit}
          />
        );
      case "change":
        return (
          <PhoneChangeForm
            form={changeForm}
            onCancel={handleCancel}
            onSubmit={handlePhoneChangeSubmit}
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
