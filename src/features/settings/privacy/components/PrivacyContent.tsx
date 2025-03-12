/**
 * PrivacyContent - Component for displaying all privacy sections
 *
 * Server component that combines all privacy-related sections
 * into a single cohesive view.
 */

import { Button } from "@/components/ui/button";
import { PrivacySection } from "./PrivacySection";
import { ResumeVisibility } from "./ResumeVisibility";
import { FileDown, Shield } from "lucide-react";

export function PrivacyContent() {
  return (
    <div className="space-y-6">
      <PrivacySection title="Types de données collectées">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Nous collectons les informations suivantes pour améliorer votre
            expérience :
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Informations de profil (nom, email, etc.)</li>
            <li>CV et documents professionnels</li>
            <li>Préférences de recherche d&apos;emploi</li>
            <li>Historique de navigation sur le site</li>
          </ul>
        </div>
      </PrivacySection>

      <PrivacySection title="Utilisation et divulgation de mes données">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Vos données sont utilisées pour :
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Personnaliser votre recherche d&apos;emploi</li>
            <li>Améliorer nos services et recommandations</li>
            <li>Communiquer avec les recruteurs (avec votre accord)</li>
          </ul>
        </div>
      </PrivacySection>

      <PrivacySection title="Cookies">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Nous utilisons des cookies pour :
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Maintenir votre session</li>
            <li>Mémoriser vos préférences</li>
            <li>Analyser l&apos;utilisation du site</li>
          </ul>
        </div>
      </PrivacySection>

      <PrivacySection title="Accéder à mes données et les supprimer">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Vous pouvez à tout moment accéder à vos données personnelles ou
            demander leur suppression.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              Télécharger mes données
            </Button>
            <Button variant="destructive" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Supprimer mes données
            </Button>
          </div>
        </div>
      </PrivacySection>

      <PrivacySection title="Visibilité du profil">
        <ResumeVisibility />
      </PrivacySection>
    </div>
  );
}
