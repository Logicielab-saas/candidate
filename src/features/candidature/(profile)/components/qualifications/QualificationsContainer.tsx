"use client";

import { Metadata } from "next";
import { EducationList } from "./EducationList";
import { SkillsList } from "./SkillsList";
import { CertificationsList } from "./CertificationsList";
import { LanguagesList } from "./LanguagesList";
import { QualificationSection } from "./QualificationSection";
import { WorkExperienceList } from "./WorkExperienceList";
import { mockQualifications } from "@/core/mockData/qualifications";

export const metadata: Metadata = {
  title: "Qualifications et Compétences | Mon Profil",
  description:
    "Découvrez mes expériences professionnelles, formations, compétences, certifications, permis et langues maîtrisées.",
  keywords: [
    "expérience professionnelle",
    "formation",
    "compétences",
    "certifications",
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
      <QualificationSection>
        <WorkExperienceList
          initialExperiences={mockQualifications.experiences}
        />
      </QualificationSection>

      <QualificationSection>
        <EducationList />
      </QualificationSection>

      <QualificationSection>
        <CertificationsList />
      </QualificationSection>

      <QualificationSection>
        <SkillsList />
      </QualificationSection>

      <QualificationSection>
        <LanguagesList />
      </QualificationSection>
    </div>
  );
}
