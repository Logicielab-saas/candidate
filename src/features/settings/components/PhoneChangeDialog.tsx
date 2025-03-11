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
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StepIndicator } from "@/components/shared/StepIndicator";
import { CountryCodeSelect } from "@/components/shared/country-code-select";

// Static verification code (this will be replaced with real SMS verification later)
const VERIFICATION_CODE = "111111";

const verificationSchema = z.object({
  verificationCode: z.string().length(6, "Le code doit contenir 6 caractères"),
});

const phoneChangeSchema = z.object({
  countryCode: z.string(),
  newPhone: z
    .string()
    .min(9, "Le numéro doit contenir au moins 9 chiffres")
    .regex(/^[0-9]+$/, "Format de numéro invalide"),
});

type VerificationForm = z.infer<typeof verificationSchema>;
type PhoneChangeForm = z.infer<typeof phoneChangeSchema>;

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

  const changeForm = useForm<PhoneChangeForm>({
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

  const handlePhoneChangeSubmit = async (data: PhoneChangeForm) => {
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

  const renderVerificationStep = (phoneNumber: string) => (
    <Form {...verificationForm}>
      <form
        onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)}
        className="space-y-4"
      >
        <div className="flex flex-col items-center gap-4">
          <FormField
            control={verificationForm.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-center w-full block">
                  Code de vérification
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center gap-2">
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
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
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col w-full gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSendVerification(phoneNumber)}
              disabled={isVerifying}
            >
              {isVerifying
                ? "Envoi en cours..."
                : "Envoyer le code de vérification"}
            </Button>
            {step === "verify-new" && (
              <Button type="button" variant="ghost" onClick={handleBack}>
                Retour à la modification
              </Button>
            )}
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
            className="max-sm:mt-2 mt-0"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={
              !verificationForm.getValues("verificationCode") ||
              verificationForm.formState.isSubmitting
            }
          >
            Vérifier
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );

  const renderChangeStep = () => (
    <Form {...changeForm}>
      <form
        onSubmit={changeForm.handleSubmit(handlePhoneChangeSubmit)}
        className="space-y-4"
      >
        <FormField
          control={changeForm.control}
          name="newPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau numéro</FormLabel>
              <FormControl>
                <div className="flex">
                  <FormField
                    control={changeForm.control}
                    name="countryCode"
                    render={({ field }) => (
                      <CountryCodeSelect
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    )}
                  />
                  <Input
                    placeholder="612345678"
                    type="tel"
                    className="rounded-l-none"
                    {...field}
                    onChange={(e) => {
                      // Remove any non-digit characters
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={handleCancel}>
            Annuler
          </Button>
          <Button type="submit" disabled={changeForm.formState.isSubmitting}>
            Continuer
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );

  const getStepContent = () => {
    switch (step) {
      case "verify-current":
        return renderVerificationStep(currentPhone);
      case "change":
        return renderChangeStep();
      case "verify-new":
        return renderVerificationStep(newPhoneNumber);
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
        <ScrollArea className="h-full max-h-[90vh] ">
          <div className="p-6 ">
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
