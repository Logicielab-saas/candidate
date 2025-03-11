/**
 * PasswordChangeDialog - Dialog for changing user password
 *
 * A client component that provides a form to change the user's password
 * with a two-step process:
 * 1. Enter current password for verification
 * 2. Enter and confirm new password
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
  PasswordChangeForm,
  PasswordChangeForm as PasswordChangeFormType,
  passwordChangeSchema,
} from "./PasswordChangeForm";
import { MOCK_USER } from "@/core/mockData/user";

type Step = "verify-current" | "change";

interface PasswordChangeDialogProps {
  onPasswordChange: (newPassword: string) => Promise<void>;
  trigger?: React.ReactNode;
}

const STEPS = [{ title: "Vérification" }, { title: "Nouveau mot de passe" }];

export function PasswordChangeDialog({
  onPasswordChange,
  trigger,
}: PasswordChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("verify-current");
  const { toast } = useToast();

  const verificationForm = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      currentPassword: "",
    },
  });

  const changeForm = useForm<PasswordChangeFormType>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
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

  const handlePasswordChangeSubmit = async (data: PasswordChangeFormType) => {
    if (data.newPassword === MOCK_USER.password) {
      changeForm.setError("newPassword", {
        message: "Le nouveau mot de passe doit être différent de l'actuel",
      });
      return;
    }

    try {
      await onPasswordChange(data.newPassword);
      setIsOpen(false);
      resetForms();
      setStep("verify-current"); // Reset step only after successful password change
      toast({
        variant: "success",
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été modifié avec succès",
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de modifier le mot de passe",
      });
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetForms();
    setStep("verify-current"); // Reset step when user cancels
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
          <PasswordChangeForm
            form={changeForm}
            onCancel={handleCancel}
            onSubmit={handlePasswordChangeSubmit}
          />
        );
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "verify-current":
        return "Vérification du mot de passe actuel";
      case "change":
        return "Changer le mot de passe";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "verify-current":
        return "Entrez votre mot de passe actuel pour continuer.";
      case "change":
        return "Choisissez un nouveau mot de passe sécurisé.";
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
