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
import { useVerifyPassword } from "../hooks/use-verify-password";

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
  const verifyPasswordMutation = useVerifyPassword();

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

  const handlePasswordChangeSubmit = async (data: PasswordChangeFormType) => {
    try {
      await onPasswordChange(data.newPassword);
      setIsOpen(false);
      resetForms();
      setStep("verify-current");
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
