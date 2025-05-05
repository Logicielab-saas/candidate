import { Award } from "lucide-react";
import { SectionHeader } from "../SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import CircleLineWrapper from "../CircleLineWrapper";
import { useTranslations } from "next-intl";

export function CertificationsSkeleton() {
  const t = useTranslations("resumePage.certifications");
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title={t("title")}
        icon={<Award className="w-6 h-6 text-primaryHex-400 mr-2" />}
      />
      <div className="space-y-0">
        {[1].map((index) => (
          <CircleLineWrapper key={index}>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-48 font-bold" />
              <div className="flex gap-1">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>

            <Skeleton className="h-5 w-56 mt-1" />

            <Skeleton className="h-5 w-40 mt-1 text-gray-500" />

            <Skeleton className="h-5 w-full max-w-[600px] mt-2" />
          </CircleLineWrapper>
        ))}
        <div className="py-4 text-center">
          <Skeleton className="h-5 w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
}
