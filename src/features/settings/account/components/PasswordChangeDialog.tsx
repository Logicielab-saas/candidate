/**
 * PasswordChangeDialog - Dialog for changing password
 *
 * A client component that provides a dialog for changing the user's password,
 * with proper validation and error handling.
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PasswordChangeForm, passwordChangeSchema } from "./PasswordChangeForm";
import { useUpdatePassword } from "../hooks/use-update-password";

interface PasswordChangeDialogProps {
  trigger: React.ReactNode;
}

export function PasswordChangeDialog({ trigger }: PasswordChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const form = useForm<PasswordChangeForm>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: PasswordChangeForm) => {
    updatePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        password_confirmation: data.confirmPassword,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
      }
    );
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Changer le mot de passe</DialogTitle>
        </DialogHeader>
        <PasswordChangeForm
          form={form}
          onCancel={() => setIsOpen(false)}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
