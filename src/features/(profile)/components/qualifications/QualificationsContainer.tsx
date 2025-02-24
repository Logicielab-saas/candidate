"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExperienceList } from "./ExperienceList";
import { EducationList } from "./EducationList";
import { SkillsList } from "./SkillsList";
import { LicensesList } from "./LicensesList";
import { CertificationsList } from "./CertificationsList";
import { LanguagesList } from "./LanguagesList";
import { mockQualifications } from "../../../../core/mockData/qualifications";

interface QualificationSectionProps {
  title: string;
  onAdd: () => void;
  children?: React.ReactNode;
}

function QualificationSection({
  title,
  onAdd,
  children,
}: QualificationSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAdd}
          className="hover:text-primary"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function QualificationsContainer() {
  // Handlers for adding new items
  const handleAddExperience = () => {
    console.log("Add experience");
  };

  const handleAddEducation = () => {
    console.log("Add education");
  };

  const handleAddSkills = () => {
    console.log("Add skills");
  };

  const handleAddLicenses = () => {
    console.log("Add licenses");
  };

  const handleAddCertifications = () => {
    console.log("Add certifications");
  };

  const handleAddLanguages = () => {
    console.log("Add languages");
  };

  // Handlers for editing items
  const handleEditExperience = (id: string) => {
    console.log("Edit experience", id);
  };

  const handleEditEducation = (id: string) => {
    console.log("Edit education", id);
  };

  const handleEditSkills = (id: string) => {
    console.log("Edit skills", id);
  };

  const handleEditLicenses = (id: string) => {
    console.log("Edit licenses", id);
  };

  const handleEditCertifications = (id: string) => {
    console.log("Edit certifications", id);
  };

  const handleEditLanguages = (id: string) => {
    console.log("Edit languages", id);
  };

  // Handlers for deleting items
  const handleDeleteExperience = (id: string) => {
    console.log("Delete experience", id);
  };

  const handleDeleteEducation = (id: string) => {
    console.log("Delete education", id);
  };

  const handleDeleteSkills = (id: string) => {
    console.log("Delete skills", id);
  };

  const handleDeleteLicenses = (id: string) => {
    console.log("Delete licenses", id);
  };

  const handleDeleteCertifications = (id: string) => {
    console.log("Delete certifications", id);
  };

  const handleDeleteLanguages = (id: string) => {
    console.log("Delete languages", id);
  };

  return (
    <div className="space-y-6">
      <QualificationSection
        title="Expériences Professionnelles"
        onAdd={handleAddExperience}
      >
        <ExperienceList
          experiences={mockQualifications.experiences}
          onEdit={handleEditExperience}
          onDelete={handleDeleteExperience}
        />
      </QualificationSection>

      <QualificationSection title="Formations" onAdd={handleAddEducation}>
        <EducationList
          education={mockQualifications.education}
          onEdit={handleEditEducation}
          onDelete={handleDeleteEducation}
        />
      </QualificationSection>

      <QualificationSection title="Compétences" onAdd={handleAddSkills}>
        <SkillsList
          skills={mockQualifications.skills}
          onEdit={handleEditSkills}
          onDelete={handleDeleteSkills}
        />
      </QualificationSection>

      <QualificationSection title="Permis" onAdd={handleAddLicenses}>
        <LicensesList
          licenses={mockQualifications.licenses}
          onEdit={handleEditLicenses}
          onDelete={handleDeleteLicenses}
        />
      </QualificationSection>

      <QualificationSection
        title="Certifications"
        onAdd={handleAddCertifications}
      >
        <CertificationsList
          certifications={mockQualifications.certifications}
          onEdit={handleEditCertifications}
          onDelete={handleDeleteCertifications}
        />
      </QualificationSection>

      <QualificationSection title="Langues" onAdd={handleAddLanguages}>
        <LanguagesList
          languages={mockQualifications.languages}
          onEdit={handleEditLanguages}
          onDelete={handleDeleteLanguages}
        />
      </QualificationSection>
    </div>
  );
}
