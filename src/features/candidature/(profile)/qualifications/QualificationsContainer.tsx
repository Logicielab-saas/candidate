"use client";

import { EducationList } from "./EducationList";
import { SkillsList } from "./SkillsList";
import { CertificationsList } from "./CertificationsList";
import { LanguagesList } from "./LanguagesList";
import { QualificationSection } from "./QualificationSection";
import { WorkExperienceList } from "./WorkExperienceList";
import { ProjectsList } from "./ProjectsList";
import { AboutMe } from "./AboutMe";
import { ResumeItem } from "../../../../components/shared/ResumeItem";
import { useProfileResume } from "./hooks/use-profile-resume";
import { AboutMeSkeleton } from "./skeletons/AboutMeSkeleton";
import { WorkExperienceSkeleton } from "./skeletons/WorkExperienceSkeleton";
import { EducationSkeleton } from "./skeletons/EducationSkeleton";
import { ProjectsSkeleton } from "./skeletons/ProjectsSkeleton";
import { CertificationsSkeleton } from "./skeletons/CertificationsSkeleton";
import { LanguagesSkeleton } from "./skeletons/LanguagesSkeleton";
import { SkillsSkeleton } from "./skeletons/SkillsSkeleton";
import { ResumeSkeleton } from "../components/ResumeSkeleton";

export function QualificationsContainer() {
  const { data: resume, isLoading, error } = useProfileResume();

  if (error) {
    return (
      <div className="space-y-6">
        <div className="border p-4 rounded-lg shadow-sm">
          <p className="text-red-500">
            Failed to load profile data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <QualificationSection>
          <AboutMeSkeleton />
        </QualificationSection>
        <QualificationSection>
          <WorkExperienceSkeleton />
        </QualificationSection>
        <QualificationSection>
          <EducationSkeleton />
        </QualificationSection>
        <QualificationSection>
          <ProjectsSkeleton />
        </QualificationSection>
        <QualificationSection>
          <CertificationsSkeleton />
        </QualificationSection>
        <QualificationSection>
          <ResumeSkeleton />
        </QualificationSection>
        <QualificationSection>
          <SkillsSkeleton />
        </QualificationSection>
        <QualificationSection>
          <LanguagesSkeleton />
        </QualificationSection>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <QualificationSection>
        <AboutMe
          firstName={resume?.first_name ?? null}
          lastName={resume?.last_name ?? null}
          email={resume?.email ?? ""}
          phone={resume?.phone ?? null}
          image={resume?.image ?? null}
          description={resume?.resume?.description ?? null}
        />
      </QualificationSection>

      <QualificationSection>
        <WorkExperienceList
          experiences={resume?.resume?.resumeExperiences ?? null}
        />
      </QualificationSection>

      <QualificationSection>
        <EducationList educations={resume?.resume?.resumeEducations ?? null} />
      </QualificationSection>

      <QualificationSection>
        <ProjectsList projects={resume?.resume?.resumeProjects ?? null} />
      </QualificationSection>

      <QualificationSection>
        <CertificationsList
          certifications={resume?.resume?.resumeCertifications ?? null}
        />
      </QualificationSection>

      {/* <QualificationSection>
        <WatchedCoursesList />
      </QualificationSection> */}

      <QualificationSection>
        <div className="border p-4 rounded-lg shadow-sm">
          <ResumeItem
            subtitle="PDF format, max 2MB"
            type="custom"
            resumeFiles={resume?.resume?.resumeFiles}
          />
        </div>
      </QualificationSection>

      <QualificationSection>
        <SkillsList resumeSkills={resume?.resume?.skills ?? null} />
      </QualificationSection>

      <QualificationSection>
        <LanguagesList
          resumeLanguages={resume?.resume?.resumeLanguages ?? null}
        />
      </QualificationSection>
    </div>
  );
}
