"use client";

import { Metadata } from "next";
import { EducationList } from "./EducationList";
import { SkillsList } from "./SkillsList";
import { CertificationsList } from "./CertificationsList";
import { LanguagesList } from "./LanguagesList";
import { QualificationSection } from "./QualificationSection";
import { WorkExperienceList } from "./WorkExperienceList";
import { mockQualifications } from "@/core/mockData/qualifications";
import { ProjectsList } from "./ProjectsList";
import { WatchedCoursesList } from "./WatchedCoursesList";
import { SectionHeader } from "./SectionHeader";
import { File } from "lucide-react";
import { AboutMe } from "./AboutMe";
import { UserContactInfo } from "./UserContactInfo";
import { ResumeItem } from "../components/ResumeItem";

export const metadata: Metadata = {
  title: "Qualifications et Compétences | Mon Profil",
  description:
    "Découvrez mes expériences professionnelles, formations, compétences, certifications, courses et langues maîtrisées.",
  keywords: [
    "about me",
    "expérience professionnelle",
    "formation",
    "compétences",
    "certifications",
    "langues",
    "CV",
    "profil professionnel",
    "courses",
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
        <UserContactInfo />
      </QualificationSection>

      <QualificationSection>
        <AboutMe />
      </QualificationSection>

      <QualificationSection>
        <WorkExperienceList
          initialExperiences={mockQualifications.experiences}
        />
      </QualificationSection>

      <QualificationSection>
        <ProjectsList />
      </QualificationSection>

      <QualificationSection>
        <EducationList />
      </QualificationSection>

      <QualificationSection>
        <CertificationsList />
      </QualificationSection>

      <QualificationSection>
        <WatchedCoursesList />
      </QualificationSection>

      <QualificationSection>
        <div className="border p-4 rounded-lg shadow-sm">
          <SectionHeader
            title="Resume"
            icon={<File className="w-6 h-6 text-primaryHex-400 mr-2" />}
            onAdd={() => {}}
          />
          <ResumeItem title="Bilal_Nnasser_CV" />
        </div>
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
