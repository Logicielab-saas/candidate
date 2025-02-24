"use client";

import { Metadata } from "next";
import { ExperienceList } from "./ExperienceList";
import { EducationList } from "./EducationList";
import { SkillsList } from "./SkillsList";
import { LicensesList } from "./LicensesList";
import { CertificationsList } from "./CertificationsList";
import { LanguagesList } from "./LanguagesList";
import { QualificationSection } from "./QualificationSection";

export const metadata: Metadata = {
  title: "Qualifications et Compétences | Mon Profil",
  description:
    "Découvrez mes expériences professionnelles, formations, compétences, certifications, permis et langues maîtrisées.",
  keywords: [
    "expérience professionnelle",
    "formation",
    "compétences",
    "certifications",
    "permis",
    "langues",
    "CV",
    "profil professionnel",
  ],
  openGraph: {
    title: "Qualifications et Compétences | Mon Profil",
    description:
      "Découvrez mes expériences professionnelles, formations, compétences, certifications, permis et langues maîtrisées.",
    type: "profile",
  },
};

export function QualificationsContainer() {
  return (
    <div className="space-y-6">
      <QualificationSection title="Expériences Professionnelles">
        <ExperienceList />
      </QualificationSection>

      <QualificationSection title="Formations">
        <EducationList />
      </QualificationSection>

      <QualificationSection title="Compétences">
        <SkillsList />
      </QualificationSection>

      <QualificationSection title="Permis">
        <LicensesList />
      </QualificationSection>

      <QualificationSection title="Certifications">
        <CertificationsList />
      </QualificationSection>

      <QualificationSection title="Langues">
        <LanguagesList />
      </QualificationSection>
    </div>
  );
}
