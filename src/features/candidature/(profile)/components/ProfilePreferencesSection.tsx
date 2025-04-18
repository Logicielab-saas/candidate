"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import LoaderOne from "@/components/ui/loader-one";
import { useTranslations } from "next-intl";

//* Dynamically import dialogs with loading states
const HideJobDetailsDialog = dynamic(
  () =>
    import("./HideJobDetailsDialog").then((mod) => mod.HideJobDetailsDialog),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

const AvailabilityStatusDialog = dynamic(
  () =>
    import("./AvailabilityStatusDialog").then(
      (mod) => mod.AvailabilityStatusDialog
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

export function ProfilePreferencesSection() {
  const [showHideDetailsDialog, setShowHideDetailsDialog] = useState(false);
  const [showAvailabilityDialog, setShowAvailabilityDialog] = useState(false);
  const tCommon = useTranslations("common");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{tCommon("preferences.title")}</h3>

      <div className="divide-y">
        {/* Employment Preferences */}
        <Link
          href="/profile/preferences"
          className="flex items-center justify-between py-4 hover:bg-muted/50 transition-colors"
        >
          <div className="space-y-1">
            <h4 className="text-base font-medium">
              {tCommon("preferences.employmentPreferences.title")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {tCommon("preferences.employmentPreferences.description")}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>

        {/* Hidden Job Details */}
        <button
          onClick={() => setShowHideDetailsDialog(true)}
          className="w-full flex items-center justify-between py-4 hover:bg-muted/50 transition-colors"
        >
          <div className="space-y-1 text-left">
            <h4 className="text-base font-medium">
              {tCommon("preferences.hideJobDetails.title")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {tCommon("preferences.hideJobDetails.description")}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Availability Status */}
        <button
          onClick={() => setShowAvailabilityDialog(true)}
          className="w-full flex items-center justify-between py-4 hover:bg-muted/50 transition-colors"
        >
          <div className="space-y-1 text-left">
            <h4 className="text-base font-medium">
              {tCommon("preferences.availability.title")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {tCommon("preferences.availability.description")}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
      {showHideDetailsDialog && (
        <HideJobDetailsDialog
          open={showHideDetailsDialog}
          onOpenChange={setShowHideDetailsDialog}
        />
      )}
      {showAvailabilityDialog && (
        <AvailabilityStatusDialog
          open={showAvailabilityDialog}
          onOpenChange={setShowAvailabilityDialog}
        />
      )}
    </div>
  );
}
