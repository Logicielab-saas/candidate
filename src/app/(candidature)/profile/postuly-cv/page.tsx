import GenerateCV from "@/components/shared/GenerateCV";
import { getTranslations } from "next-intl/server";

export default async function PostulyCVPage() {
  const t = await getTranslations("postulyCVPage");
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <GenerateCV />
    </div>
  );
}
