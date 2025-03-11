/**
 * PhoneChangeDialog - Dialog for changing user phone number
 *
 * A client component that provides a form to change the user's phone number
 * with a verification process that can be either two or three steps:
 * 1. Verify current phone via OTP (optional, can be skipped if already verified)
 * 2. Enter new phone number
 * 3. Verify new phone via OTP
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepIndicator } from "@/components/shared/StepIndicator";
import {
  PhoneVerificationForm,
  VerificationForm,
  verificationSchema,
} from "./PhoneVerificationForm";
import {
  PhoneChangeForm,
  PhoneChangeForm as PhoneChangeFormType,
  phoneChangeSchema,
} from "./PhoneChangeForm";

// Static verification code (this will be replaced with real SMS verification later)
const VERIFICATION_CODE = "111111";

type Step = "verify-current" | "change" | "verify-new";

interface PhoneChangeDialogProps {
  currentPhone: string;
  onPhoneChange: (newPhone: string) => Promise<void>;
  trigger?: React.ReactNode;
  skipInitialVerification?: boolean;
}

const STEPS = [
  { title: "Vérification" },
  { title: "Nouveau numéro" },
  { title: "Confirmation" },
];

export function PhoneChangeDialog({
  currentPhone,
  onPhoneChange,
  trigger,
  skipInitialVerification = false,
}: PhoneChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(
    skipInitialVerification ? "change" : "verify-current"
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const { toast } = useToast();

  const verificationForm = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const changeForm = useForm<PhoneChangeFormType>({
    resolver: zodResolver(phoneChangeSchema),
    defaultValues: {
      countryCode: "+212",
      newPhone: "",
    },
  });

  const resetDialog = () => {
    verificationForm.reset();
    changeForm.reset();
    setStep(skipInitialVerification ? "change" : "verify-current");
    setNewPhoneNumber("");
    setIsVerifying(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetDialog();
    }
  };

  const handleSendVerification = async (phoneNumber: string) => {
    try {
      setIsVerifying(true);
      // Simulate SMS sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Code de vérification envoyé",
        description: `Un code de vérification a été envoyé au ${phoneNumber}. Pour le test, utilisez le code: ${VERIFICATION_CODE}`,
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
        await onPhoneChange(newPhoneNumber);
        setIsOpen(false);
        resetDialog();
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

    setNewPhoneNumber(fullPhoneNumber);
    setStep("verify-new");
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetDialog();
  };

  const handleBack = () => {
    setStep("change");
    verificationForm.reset();
  };

  const getStepContent = () => {
    switch (step) {
      case "verify-current":
        return (
          <PhoneVerificationForm
            form={verificationForm}
            phone={currentPhone}
            isVerifying={isVerifying}
            onSendVerification={handleSendVerification}
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
      case "verify-new":
        return (
          <PhoneVerificationForm
            form={verificationForm}
            phone={newPhoneNumber}
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
        return "Vérification du numéro actuel";
      case "change":
        return "Changer le numéro de téléphone";
      case "verify-new":
        return "Vérification du nouveau numéro";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "verify-current":
        return "Nous allons envoyer un code de vérification à votre numéro actuel.";
      case "change":
        return "Entrez votre nouveau numéro de téléphone.";
      case "verify-new":
        return "Nous allons envoyer un code de vérification au nouveau numéro.";
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
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden p-0">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{getStepTitle()}</DialogTitle>
              <DialogDescription>{getStepDescription()}</DialogDescription>
            </DialogHeader>
            <StepIndicator
              currentStep={getCurrentStepIndex()}
              steps={skipInitialVerification ? STEPS.slice(1) : STEPS}
            />
            {getStepContent()}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
