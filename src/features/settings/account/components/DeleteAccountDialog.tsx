/**
 * DeleteAccountDialog - Dialog for account deletion confirmation
 *
 * A client component that provides a confirmation dialog for account deletion,
 * requiring password verification and confirmation phrase before deletion.
 * Handles the complete deletion flow including verification, deletion, and redirect.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyPassword } from "../hooks/use-verify-password";
import { useDeleteAccount } from "../hooks/use-delete-account";
import { logout } from "@/features/auth/services/logout";
import { useTranslations } from "next-intl";

export function DeleteAccountDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const t = useTranslations("settings.account");
  const tCommon = useTranslations("common");

  const { mutateAsync: verifyPassword, isPending: isVerifying } =
    useVerifyPassword(tCommon);
  const { deleteAccount, isPending: isDeletingAccount } =
    useDeleteAccount(tCommon);

  const DELETE_CONFIRMATION = t("accountSettings.deleteConfirmationValue");

  const handleDeleteAccount = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (deleteConfirmation !== DELETE_CONFIRMATION) {
      setShowDeleteError(true);
      return;
    }

    if (!password.trim()) {
      setShowPasswordError(true);
      return;
    }

    try {
      setIsDeleting(true);

      // First verify the password
      await verifyPassword(password);

      // If password verification succeeds, proceed with account deletion
      deleteAccount({
        password,
        email: "", // This will be filled from the backend context
        token_device: "", // This will be handled by the backend
      });

      // Use the auth service's logout function to handle cleanup and redirect
      await logout();

      window.location.href = "/login";
    } catch (_error) {
      // Error handling is managed by the hooks, but we'll reset the deleting state
      setIsDeleting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    // Prevent closing if we're in the middle of an operation
    if (isVerifying || isDeletingAccount || isDeleting) {
      return;
    }

    setIsOpen(open);
    if (!open) {
      setDeleteConfirmation("");
      setPassword("");
      setShowDeleteError(false);
      setShowPasswordError(false);
    }
  };

  const isLoading = isVerifying || isDeletingAccount || isDeleting;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full sm:w-auto">
          {t("accountSettings.deleteAccountLabel")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("accountSettings.deleteAccountConfirm")}
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <span className="block">
                {t("accountSettings.deleteAccountConfirmDescription")}
              </span>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  {tCommon("enterPassword")}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setShowPasswordError(false);
                  }}
                  className={showPasswordError ? "border-destructive" : ""}
                  placeholder={tCommon("passwordMask")}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmation" className="text-sm font-medium">
                  {t("accountSettings.reConfirmation", { DELETE_CONFIRMATION })}
                </Label>
                <Input
                  id="confirmation"
                  value={deleteConfirmation}
                  onChange={(e) => {
                    setDeleteConfirmation(e.target.value);
                    setShowDeleteError(false);
                  }}
                  className={showDeleteError ? "border-destructive" : ""}
                  placeholder={DELETE_CONFIRMATION}
                  disabled={isLoading}
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            className="bg-destructive hover:bg-destructive/90 disabled:opacity-50"
            disabled={
              isLoading ||
              deleteConfirmation !== DELETE_CONFIRMATION ||
              !password.trim()
            }
          >
            {isLoading
              ? tCommon("actions.deleting")
              : tCommon("actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
