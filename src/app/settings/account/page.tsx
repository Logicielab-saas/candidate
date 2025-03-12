import { Separator } from "@/components/ui/separator";
import { AccountInfo } from "@/features/settings/account/components/AccountInfo";
import { AccountActions } from "@/features/settings/account/components/AccountSettings";

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Paramètres du compte</h1>
        <p className="text-muted-foreground mt-1">
          Gérez les paramètres de votre compte et vos préférences.
        </p>
      </div>

      <Separator className="my-6" />

      <AccountInfo />
      <Separator className="my-6" />
      <AccountActions />
    </div>
  );
}
