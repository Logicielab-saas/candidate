/**
 * ClassicCVTemplate - A classic style CV template component
 *
 * Renders a professional CV layout with a left sidebar containing personal info,
 * skills, languages and a main content area for experience and education.
 *
 * Props:
 * - primaryColor: string - Primary theme color
 * - accentColor: string - Secondary/accent theme color
 * - setImageLoaded: (loaded: boolean) => void - Image load state callback
 * - setImageError: (error: boolean) => void - Image error state callback
 * - resume: Resume - Resume data to display
 */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Resume } from "@/core/interfaces";

interface ClassicCVProps {
  primaryColor: string;
  accentColor: string;
  setImageLoaded: (loaded: boolean) => void;
  setImageError: (error: boolean) => void;
  resume: Resume;
}

export function ClassicCVTemplate({
  primaryColor,
  accentColor,
  setImageLoaded,
  setImageError,
  resume,
}: ClassicCVProps) {
  const fullName = `${resume.first_name || ""} ${
    resume.last_name || ""
  }`.trim();
  const initials = `${resume.first_name?.[0] || ""}${
    resume.last_name?.[0] || ""
  }`.toUpperCase();

  return (
    <div
      className="flex flex-col md:flex-row bg-white shadow-lg"
      style={{ padding: "0" }}
    >
      {/* Left Sidebar */}
      <div
        className="md:w-1/3 text-white p-6 space-y-6"
        style={{ backgroundColor: primaryColor, minHeight: "296.86mm" }}
      >
        <div className="flex flex-col items-center text-center">
          <Avatar
            className="w-48 h-48 rounded-full mb-4"
            style={{ borderColor: accentColor, borderWidth: "4px" }}
          >
            <AvatarImage
              src={resume.image || undefined}
              className="rounded-full"
              onLoad={() => {
                setImageLoaded(true);
                setImageError(false);
              }}
              onError={() => {
                setImageLoaded(false);
                setImageError(true);
              }}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* Contact Section */}
        <div className="space-y-6">
          <h3
            className="text-xl font-semibold border-b-2 pb-2"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            CONTACT
          </h3>
          <div className="space-y-3">
            {resume.phone && (
              <div className="flex items-center gap-3">
                <span style={{ color: accentColor }}>📱</span>
                <span>{resume.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span style={{ color: accentColor }}>✉️</span>
              <span>{resume.email}</span>
            </div>
            {resume.address && (
              <div className="flex items-center gap-3">
                <span style={{ color: accentColor }}>📍</span>
                <span>{resume.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {resume.resume.skills.length > 0 && (
          <div className="space-y-4">
            <h3
              className="text-xl font-semibold border-b-2 pb-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              SKILLS
            </h3>
            <ul className="space-y-2">
              {resume.resume.skills.map((skill) => (
                <li key={skill.uuid} className="flex items-center gap-2">
                  <span style={{ color: accentColor }}>•</span>
                  {skill.resumeskill_name || skill.skill_uuid}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages Section */}
        {resume.resume.resumeLanguages.length > 0 && (
          <div className="space-y-4">
            <h3
              className="text-xl font-semibold border-b-2 pb-2"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              LANGUAGES
            </h3>
            <div className="space-y-3">
              {resume.resume.resumeLanguages.map((language) => (
                <div key={language.uuid} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{language.name}</span>
                    <span>{language.level}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        backgroundColor: accentColor,
                        width: `${language.level}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="md:w-2/3 p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold" style={{ color: primaryColor }}>
            {fullName}
          </h1>
          <h2 className="text-2xl" style={{ color: accentColor }}>
            {resume.resume.resumeExperiences[0]?.job_title || "Professional"}
          </h2>
          <p className="text-gray-600 mt-4">
            {resume.resume.description || "No description provided"}
          </p>
        </div>

        {/* Work Experience */}
        {resume.resume.resumeExperiences.length > 0 && (
          <div className="space-y-6 page-break">
            <h3
              className="text-2xl font-semibold border-b-2 pb-2"
              style={{ color: primaryColor, borderColor: accentColor }}
            >
              WORK EXPERIENCE
            </h3>
            <div className="space-y-6">
              {resume.resume.resumeExperiences.map((exp) => (
                <div
                  key={exp.uuid}
                  className="relative pl-6"
                  style={{ borderLeft: `2px solid ${accentColor}` }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full -left-[7px] top-2"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <h4
                    className="text-xl font-semibold"
                    style={{ color: primaryColor }}
                  >
                    {exp.job_title}
                  </h4>
                  <div
                    className="flex justify-between"
                    style={{ color: accentColor }}
                  >
                    <span>{exp.company_name}</span>
                    <span>
                      {exp.date_start} - {exp.date_end || "Present"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.resume.resumeEducations.length > 0 && (
          <div className="space-y-6">
            <h3
              className="text-2xl font-semibold border-b-2 pb-2"
              style={{ color: primaryColor, borderColor: accentColor }}
            >
              EDUCATION
            </h3>
            <div className="space-y-6">
              {resume.resume.resumeEducations.map((edu) => (
                <div
                  key={edu.uuid}
                  className="relative pl-6"
                  style={{ borderLeft: `2px solid ${accentColor}` }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full -left-[7px] top-2"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <h4
                    className="text-xl font-semibold"
                    style={{ color: primaryColor }}
                  >
                    {edu.title}
                  </h4>
                  <div
                    className="flex justify-between"
                    style={{ color: accentColor }}
                  >
                    <span>{edu.degree}</span>
                    <span>
                      {edu.date_start} - {edu.date_end || "Present"}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{edu.description || ""}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
