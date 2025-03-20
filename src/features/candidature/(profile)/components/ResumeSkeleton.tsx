/**
 * ResumeSkeleton - Loading state component for the resume files list
 *
 * Displays a placeholder animation while the resume files data is being loaded
 */

import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "../qualifications/SectionHeader";
import { File, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeSkeleton() {
  return (
    <div className="border p-4 rounded-lg shadow-sm space-y-4">
      <SectionHeader
        title="Resume"
        icon={<File className="w-6 h-6 text-primaryHex-400 mr-2" />}
      />

      {[1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Skeleton className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>

          {/* Action button with three dots */}
          <Button
            variant="ghost"
            size="icon"
            className="opacity-50 cursor-not-allowed"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
