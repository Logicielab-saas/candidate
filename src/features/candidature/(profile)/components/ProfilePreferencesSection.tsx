import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HideJobDetailsDialog } from "./HideJobDetailsDialog";
import { AvailabilityStatusDialog } from "./AvailabilityStatusDialog";

export function ProfilePreferencesSection() {
  const [showHideDetailsDialog, setShowHideDetailsDialog] = useState(false);
  const [showAvailabilityDialog, setShowAvailabilityDialog] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Préférences</h3>

      <div className="divide-y">
        {/* Employment Preferences */}
        <Link
          href="/profile/preferences"
          className="flex items-center justify-between py-4 hover:bg-muted/50 transition-colors"
        >
          <div className="space-y-1">
            <h4 className="text-base font-medium">Préférences d&apos;emploi</h4>
            <p className="text-sm text-muted-foreground">
              Précisez certaines informations, telles que le salaire minimum et
              l&apos;horaire désirés.
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
              Masquer les emplois avec ces détails
            </h4>
            <p className="text-sm text-muted-foreground">
              Gérez les qualifications et préférences à prendre en compte pour
              masquer certains emplois de votre recherche.
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
            <h4 className="text-base font-medium">Disponible maintenant</h4>
            <p className="text-sm text-muted-foreground">
              Indiquez aux employeurs que vous pouvez commencer dès que
              possible.
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
      <AvailabilityStatusDialog
        open={showAvailabilityDialog}
        onOpenChange={setShowAvailabilityDialog}
      />
    </div>
  );
}
