/**
 * EditPersonalInfoDialog - Dialog for editing personal information in review step
 *
 * Allows users to:
 * - Edit their personal information
 * - Validates form fields before saving
 * - Uses local state to preview changes
 */

"use client";

import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface EditPersonalInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Form validation schema
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z
    .string()
    .regex(/^(\+\d{1,4}|0)[1-9](\d{8})$/, "Numéro de téléphone invalide"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export function EditPersonalInfoDialog({
  open,
  onOpenChange,
}: EditPersonalInfoDialogProps) {
  const { personalInfo, setPersonalInfo } = useJobApplyStore();
  const [_localInfo, setLocalInfo] = useState(personalInfo);
  const { toast } = useToast();

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset(personalInfo);
      setLocalInfo(personalInfo);
    }
  }, [open, personalInfo, form]);

  const onSubmit = (data: PersonalInfoFormData) => {
    setPersonalInfo(data);
    toast({
      variant: "success",
      title: "Informations modifiées",
      description:
        "Vos informations personnelles ont été mises à jour avec succès",
    });
    onOpenChange(false);
  };

  // Handle dialog close without saving
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset form when closing without saving
      form.reset(personalInfo);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>Modifier vos informations</DialogTitle>
              <DialogDescription>
                Modifiez vos informations personnelles
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jean.dupont@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="0612345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 rue de la République, 75001 Paris"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOpenChange(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">Enregistrer</Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
