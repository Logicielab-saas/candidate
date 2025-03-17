import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "../SectionHeader";
import { Briefcase } from "lucide-react";

export function WorkExperienceSkeleton() {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Work Experience"
        icon={<Briefcase className="w-6 h-6 text-primaryHex-400 mr-2" />}
      />

      <div className="space-y-0">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative flex flex-col items-start w-full pl-2"
          >
            {/* Circle */}
            <div
              className="absolute w-4 h-4 bg-primaryHex-500 rounded-full"
              style={{ left: "0.5px" }}
            ></div>

            {/* Content with line */}
            <div className="border-l-2 border-primaryHex-400 pl-5 w-full mt-2 pb-8 last:pb-0">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
