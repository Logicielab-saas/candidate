"use client";

import { ExperienceList } from "./ExperienceList";
import { EducationList } from "./EducationList";
import { SkillsList } from "./SkillsList";
import { LicensesList } from "./LicensesList";
import { CertificationsList } from "./CertificationsList";
import { LanguagesList } from "./LanguagesList";
import { QualificationSection } from "./QualificationSection";

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
