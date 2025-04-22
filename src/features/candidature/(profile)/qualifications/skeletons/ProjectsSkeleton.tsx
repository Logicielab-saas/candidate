import { Code2 } from "lucide-react";
import { SectionHeader } from "../SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import CircleLineWrapper from "../CircleLineWrapper";
import { useTranslations } from "next-intl";

export function ProjectsSkeleton() {
  const t = useTranslations("resumePage.projects");
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title={t("title")}
        icon={<Code2 className="w-6 h-6 text-primaryHex-400 mr-2" />}
      />
      <div className="space-y-0">
        {[1].map((index) => (
          <CircleLineWrapper key={index}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-48" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Skeleton className="aspect-video rounded-lg" />
                <Skeleton className="aspect-video rounded-lg hidden sm:block" />
                <Skeleton className="aspect-video rounded-lg hidden lg:block" />
              </div>

              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full max-w-[600px]" />
              <Skeleton className="h-4 w-24" />

              <div className="mt-4">
                <Skeleton className="h-5 w-20 mb-3" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </CircleLineWrapper>
        ))}
      </div>
    </div>
  );
}
