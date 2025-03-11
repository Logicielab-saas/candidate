/**
 * PhoneChangeDialog - Dialog for changing user phone number
 *
 * A client component that provides a form to change the user's phone number
 * with a three-step verification process:
 * 1. Verify current phone via OTP
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
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Static verification code (this will be replaced with real SMS verification later)
const VERIFICATION_CODE = "111111";

const verificationSchema = z.object({
  verificationCode: z.string().length(6, "Le code doit contenir 6 caractères"),
});

const phoneChangeSchema = z.object({
  newPhone: z
    .string()
    .min(10, "Le numéro doit contenir au moins 10 chiffres")
    .regex(/^\+?[0-9]+$/, "Format de numéro invalide"),
});

type VerificationForm = z.infer<typeof verificationSchema>;
type PhoneChangeForm = z.infer<typeof phoneChangeSchema>;

type Step = "verify-current" | "change" | "verify-new";

interface PhoneChangeDialogProps {
  currentPhone: string;
  onPhoneChange: (newPhone: string) => Promise<void>;
  trigger?: React.ReactNode;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: { title: string }[];
}

function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="relative mb-8">
      <div className="absolute top-5 left-1 right-1">
        <div className="h-[2px] bg-muted" />
      </div>
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.title} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary bg-background text-primary"
                    : "border-muted bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  isCompleted || isCurrent
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
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
}: PhoneChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("verify-current");
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
      newPhone: "",
    },
  });

  const resetDialog = () => {
    verificationForm.reset();
    changeForm.reset();
    setStep("verify-current");
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
    if (data.newPhone === currentPhone) {
      changeForm.setError("newPhone", {
        message: "Le nouveau numéro doit être différent de l'actuel",
      });
      return;
    }

    setNewPhoneNumber(data.newPhone);
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
                <Input placeholder="+33612345678" type="tel" {...field} />
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
            <StepIndicator currentStep={getCurrentStepIndex()} steps={STEPS} />
            {getStepContent()}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
