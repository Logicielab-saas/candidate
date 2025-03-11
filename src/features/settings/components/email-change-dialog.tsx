/**
 * EmailChangeDialog - Dialog for changing user email
 *
 * A client component that provides a form to change the user's email address
 * with validation and loading states using React Hook Form and Zod.
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

// Static verification code (this will be replaced with real email verification later)
const VERIFICATION_CODE = "111111";

const verificationSchema = z.object({
  verificationCode: z.string().length(6, "Le code doit contenir 6 caractères"),
});

const emailChangeSchema = z
  .object({
    newEmail: z
      .string()
      .email("Adresse email invalide")
      .min(1, "L'email est requis"),
    confirmEmail: z.string().min(1, "La confirmation de l'email est requise"),
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    message: "Les adresses email ne correspondent pas",
    path: ["confirmEmail"],
  });

type VerificationForm = z.infer<typeof verificationSchema>;
type EmailChangeForm = z.infer<typeof emailChangeSchema>;

interface EmailChangeDialogProps {
  currentEmail: string;
  onEmailChange: (newEmail: string) => Promise<void>;
  trigger?: React.ReactNode;
}

export function EmailChangeDialog({
  currentEmail,
  onEmailChange,
  trigger,
}: EmailChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"verify" | "change">("verify");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const verificationForm = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const changeForm = useForm<EmailChangeForm>({
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
      setStep("verify");
    }
  };

  const handleSendVerification = async () => {
    try {
      setIsVerifying(true);
      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Code de vérification envoyé",
        description: `Un code de vérification a été envoyé à ${currentEmail}. Pour le test, utilisez le code: ${VERIFICATION_CODE}`,
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

    setStep("change");
  };

  const handleEmailChangeSubmit = async (data: EmailChangeForm) => {
    if (data.newEmail === currentEmail) {
      changeForm.setError("newEmail", {
        message: "La nouvelle adresse email doit être différente de l'actuelle",
      });
      return;
    }

    try {
      await onEmailChange(data.newEmail);
      setIsOpen(false);
      changeForm.reset();
      verificationForm.reset();
      setStep("verify");
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Changer</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === "verify"
              ? "Vérification de l'email"
              : "Changer l'adresse email"}
          </DialogTitle>
          <DialogDescription>
            {step === "verify"
              ? "Nous allons envoyer un code de vérification à votre adresse email actuelle."
              : "Entrez votre nouvelle adresse email."}
          </DialogDescription>
        </DialogHeader>

        {step === "verify" ? (
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
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleSendVerification}
                  disabled={isVerifying}
                >
                  {isVerifying
                    ? "Envoi en cours..."
                    : "Envoyer le code de vérification"}
                </Button>
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
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
        ) : (
          <Form {...changeForm}>
            <form
              onSubmit={changeForm.handleSubmit(handleEmailChangeSubmit)}
              className="space-y-4"
            >
              <FormField
                control={changeForm.control}
                name="newEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouvel email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nouvelle@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={changeForm.control}
                name="confirmEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le nouvel email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="nouvelle@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={changeForm.formState.isSubmitting}
                >
                  {changeForm.formState.isSubmitting
                    ? "Modification..."
                    : "Modifier"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
