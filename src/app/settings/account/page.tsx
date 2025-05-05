import { Separator } from "@/components/ui/separator";
import { AccountInfo } from "@/features/settings/account/components/AccountInfo";
import { AccountSettings } from "@/features/settings/account/components/AccountSettings";
import { getTranslations } from "next-intl/server";

export default async function AccountPage() {
  const t = await getTranslations("settings.account.page");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("description")}</p>
      </div>

      <Separator className="my-6" />

      <AccountInfo />
      <Separator className="my-6" />
      <AccountSettings />
    </div>
  );
}
