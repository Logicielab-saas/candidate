import { Separator } from "@/components/ui/separator";
import { HelpForm } from "@/features/help/components/HelpForm";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function HelpPage() {
  const t = await getTranslations("help");
  const tCommon = await getTranslations("common");

  return (
    <div className="w-full py-6 flex items-start justify-center">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">{t("page.title")}</h1>
            <p className="text-muted-foreground mt-1">
              {t("page.description")}
            </p>
          </div>

          <Separator className="my-6" />
          <Suspense fallback={<div>{tCommon("loading")}</div>}>
            <HelpForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
