import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function ProfilePreferencesSection() {
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
        <Link
          href="/profile/preferences/hidden"
          className="flex items-center justify-between py-4 hover:bg-muted/50 transition-colors"
        >
          <div className="space-y-1">
            <h4 className="text-base font-medium">
              Masquer les emplois avec ces détails
            </h4>
            <p className="text-sm text-muted-foreground">
              Gérez les qualifications et préférences à prendre en compte pour
              masquer certains emplois de votre recherche.
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>

        {/* Availability Status */}
        <Link
          href="/profile/preferences/availability"
          className="flex items-center justify-between py-4 hover:bg-muted/50 transition-colors"
        >
          <div className="space-y-1">
            <h4 className="text-base font-medium">Disponible maintenant</h4>
            <p className="text-sm text-muted-foreground">
              Indiquez aux employeurs que vous pouvez commencer dès que
              possible.
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
