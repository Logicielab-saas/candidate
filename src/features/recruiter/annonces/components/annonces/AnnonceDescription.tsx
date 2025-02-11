import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Gift } from "lucide-react";

export function AnnonceDescription() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
        Description du poste
      </h2>

      <div className="grid gap-6">
        <Card className="bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50">
          <CardContent className="flex flex-col gap-6 p-6">
            {/* Description Section */}
            <div className="flex gap-4 items-start">
              <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-2.5">
                <Briefcase className="w-5 h-5 text-primaryHex-600 dark:text-primaryHex-400" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
                  Description du poste
                </h3>
                <p className="text-secondaryHex-600 dark:text-secondaryHex-400 text-sm leading-relaxed">
                  Nous recherchons un(e) stagiaire PFE motivé(e) pour rejoindre notre équipe en tant que Social Media Manager. Vous serez impliqué(e) dans :
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-secondaryHex-600 dark:text-secondaryHex-400 ml-4">
                  <li>Création de contenu : Conception de contenus variés (photos, vidéos, textes) adaptés aux plateformes sociales.</li>
                  <li>Gestion des réseaux sociaux : Participer à la planification, publication, et modération des publications.</li>
                  <li>Veille et brainstorming : Analyser les tendances digitales et contribuer à la création de concepts innovants.</li>
                </ul>
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex gap-4 items-start">
              <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-2.5">
                <GraduationCap className="w-5 h-5 text-primaryHex-600 dark:text-primaryHex-400" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
                  Profil recherché
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-secondaryHex-600 dark:text-secondaryHex-400 ml-4">
                  <li>Formation : Étudiant(e) en fin de cycle (Bac+4/Bac+5) en communication, marketing, audiovisuel, ou équivalent.</li>
                  <li>Compétences techniques : Maîtrise des outils de tournage et montage.</li>
                  <li>Créativité : Capacité à produire des contenus visuellement attractifs et engageants.</li>
                  <li>Organisation : Esprit structuré et aptitude à respecter les délais.</li>
                  <li>Passion : Grand intérêt pour les réseaux sociaux et les nouvelles tendances digitales.</li>
                </ul>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="flex gap-4 items-start">
              <div className="rounded-full bg-primaryHex-50 dark:bg-primaryHex-900/20 p-2.5">
                <Gift className="w-5 h-5 text-primaryHex-600 dark:text-primaryHex-400" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
                  Ce que nous offrons
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-secondaryHex-600 dark:text-secondaryHex-400 ml-4">
                  <li>Une expérience enrichissante au sein d'une équipe dynamique et bienveillante.</li>
                  <li>L'opportunité de travailler sur des projets variés et d'apporter des idées créatives.</li>
                  <li>Possibilité d'embauche à l'issue du stage pour les profils performants</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}