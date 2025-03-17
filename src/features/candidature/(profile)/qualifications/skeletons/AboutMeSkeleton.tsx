import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "../SectionHeader";
import { UserCircle } from "lucide-react";

export function AboutMeSkeleton() {
  return (
    <div className="border p-4 rounded-lg shadow-sm space-y-6">
      <SectionHeader
        title="About Me"
        icon={<UserCircle className="w-6 h-6 text-primaryHex-400 mr-2" />}
      />
      <div className="flex items-center">
        <Skeleton className="h-24 w-24 rounded-full mr-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
