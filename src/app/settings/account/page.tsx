import { Separator } from "@/components/ui/separator";
import { AccountInfo } from "@/features/settings/account/components/AccountInfo";
import { AccountActions } from "@/features/settings/account/components/AccountSettings";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Paramètres du compte</h3>
        <p className="text-sm text-muted-foreground">
          Gérez les paramètres de votre compte et vos préférences.
        </p>
      </div>
      <Separator />
      <AccountInfo />
      <Separator />
      <AccountActions />
    </div>
  );
}
