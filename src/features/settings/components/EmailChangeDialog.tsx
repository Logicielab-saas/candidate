/**
 * EmailChangeDialog - Dialog for changing user email
 *
 * A client component that provides a form to change the user's email address
 * with a three-step verification process:
 * 1. Verify current email via OTP (optional, can be skipped if already verified)
 * 2. Enter new email
 * 3. Verify new email via OTP
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
  EmailVerificationForm,
  VerificationForm,
  verificationSchema,
} from "./EmailVerificationForm";
import {
  EmailChangeForm,
  EmailChangeForm as EmailChangeFormType,
  emailChangeSchema,
} from "./EmailChangeForm";

// Static verification code (this will be replaced with real email verification later)
const VERIFICATION_CODE = "111111";

type Step = "verify-current" | "change" | "verify-new";

interface EmailChangeDialogProps {
  currentEmail: string;
  onEmailChange: (newEmail: string) => Promise<void>;
  trigger?: React.ReactNode;
  skipInitialVerification?: boolean;
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
  skipInitialVerification = false,
}: EmailChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(
    skipInitialVerification ? "change" : "verify-current"
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [newEmailAddress, setNewEmailAddress] = useState("");
  const { toast } = useToast();

  const verificationForm = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const changeForm = useForm<EmailChangeFormType>({
    resolver: zodResolver(emailChangeSchema),
    defaultValues: {
      newEmail: "",
      confirmEmail: "",
    },
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      verificationForm.reset();
      changeForm.reset();
      setStep(skipInitialVerification ? "change" : "verify-current");
      setNewEmailAddress("");
    }
  };

  const handleSendVerification = async (email: string) => {
    try {
      setIsVerifying(true);
      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Code de vérification envoyé",
        description: `Un code de vérification a été envoyé à ${email}. Pour le test, utilisez le code: ${VERIFICATION_CODE}`,
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer l'email de vérification",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerificationSubmit = async (data: VerificationForm) => {
    if (data.verificationCode !== VERIFICATION_CODE) {
      verificationForm.setError("verificationCode", {
        message: "Code de vérification incorrect",
      });
      return;
    }

    if (step === "verify-current") {
      setStep("change");
      verificationForm.reset();
    } else if (step === "verify-new") {
      try {
        await onEmailChange(newEmailAddress);
        setIsOpen(false);
        verificationForm.reset();
        changeForm.reset();
        setStep(skipInitialVerification ? "change" : "verify-current");
        setNewEmailAddress("");
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
    setStep("verify-new");
  };

  const handleCancel = () => {
    setIsOpen(false);
    verificationForm.reset();
    changeForm.reset();
    setStep(skipInitialVerification ? "change" : "verify-current");
    setNewEmailAddress("");
  };

  const handleBack = () => {
    setStep("change");
    verificationForm.reset();
  };

  const getStepContent = () => {
    switch (step) {
      case "verify-current":
        return (
          <EmailVerificationForm
            form={verificationForm}
            email={currentEmail}
            isVerifying={isVerifying}
            onSendVerification={handleSendVerification}
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
      case "verify-new":
        return (
          <EmailVerificationForm
            form={verificationForm}
            email={newEmailAddress}
            isVerifying={isVerifying}
            showBackButton
            onSendVerification={handleSendVerification}
            onCancel={handleCancel}
            onBack={handleBack}
            onSubmit={handleVerificationSubmit}
          />
        );
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "verify-current":
        return "Vérification de l'email actuel";
      case "change":
        return "Changer l'adresse email";
      case "verify-new":
        return "Vérification du nouvel email";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "verify-current":
        return "Nous allons envoyer un code de vérification à votre adresse email actuelle.";
      case "change":
        return "Entrez votre nouvelle adresse email.";
      case "verify-new":
        return "Nous allons envoyer un code de vérification à la nouvelle adresse email.";
    }
  };

  const getCurrentStepIndex = () => {
    if (skipInitialVerification) {
      // If skipping initial verification, adjust step indices
      switch (step) {
        case "change":
          return 0;
        case "verify-new":
          return 1;
        default:
          return 0;
      }
    }

    // Original step indices when not skipping
    switch (step) {
      case "verify-current":
        return 0;
      case "change":
        return 1;
      case "verify-new":
        return 2;
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
          currentStep={getCurrentStepIndex()}
          steps={skipInitialVerification ? STEPS.slice(1) : STEPS}
        />
        {getStepContent()}
      </DialogContent>
    </Dialog>
  );
}
