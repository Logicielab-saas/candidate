/**
 * ModernCVTemplate - A modern style CV template component
 *
 * Renders a modern CV layout with a header section for personal info,
 * and a clean two-column layout for experience, projects, education,
 * skills, languages, and certifications.
 *
 * Props:
 * - primaryColor: string - Primary theme color
 * - accentColor: string - Secondary/accent theme color
 * - setImageLoaded: (loaded: boolean) => void - Image load state callback
 * - setImageError: (error: boolean) => void - Image error state callback
 * - resume: Resume - Resume data to display
 */

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Resume } from "@/core/interfaces";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ModernCVProps {
  primaryColor: string;
  accentColor: string;
  setImageLoaded: (loaded: boolean) => void;
  setImageError: (error: boolean) => void;
  resume: Resume;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
  });
}

export function ModernCVTemplate({
  primaryColor,
  accentColor,
  setImageLoaded,
  setImageError,
  resume,
}: ModernCVProps) {
  const tShared = useTranslations("postulyCVPage.resume.templates.shared");
  const t = useTranslations("postulyCVPage.resume.templates.modern.sections");

  const fullName = `${resume.first_name || ""} ${
    resume.last_name || ""
  }`.trim();
  const initials = `${resume.first_name?.[0] || ""}${
    resume.last_name?.[0] || ""
  }`.toUpperCase();

  return (
    <div className="bg-white shadow-lg" style={{ maxWidth: "800px" }}>
      {/* Header Section */}
      <div className="p-8" style={{ backgroundColor: accentColor }}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-32 h-32 rounded-full border-4 border-white">
            {resume.image ? (
              <Image
                src={resume.image}
                alt={fullName}
                width={128}
                height={128}
                className="rounded-full object-cover"
                crossOrigin="anonymous"
                onLoad={() => {
                  setImageLoaded(true);
                  setImageError(false);
                }}
                onError={() => {
                  setImageLoaded(false);
                  setImageError(true);
                }}
              />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
          <div className="text-white text-center md:text-left">
            <h1 className="text-4xl font-bold">{fullName}</h1>
            <h2 className="text-2xl mt-2">
              {resume.resume.resumeExperiences[0]?.job_title ||
                tShared("professional")}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* About Me */}
        <div className="mb-8">
          <h3
            className="text-2xl font-semibold mb-4"
            style={{ color: primaryColor }}
          >
            {t("about")}
          </h3>
          <p className="text-gray-600">
            {resume.resume.description || tShared("noDescription")}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="md:w-1/3 space-y-8">
            {/* Contact Section */}
            <div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                {tShared("sections.contact")}
              </h3>
              <div className="space-y-3">
                {resume.phone && (
                  <div className="flex items-center gap-3">
                    <span
                      className="p-2 rounded-full"
                      style={{ backgroundColor: accentColor, color: "white" }}
                    >
                      📱
                    </span>
                    <span>{resume.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span
                    className="p-2 rounded-full"
                    style={{ backgroundColor: accentColor, color: "white" }}
                  >
                    ✉️
                  </span>
                  <span>{resume.email}</span>
                </div>
                {resume.address && (
                  <div className="flex items-center gap-3">
                    <span
                      className="p-2 rounded-full"
                      style={{ backgroundColor: accentColor, color: "white" }}
                    >
                      📍
                    </span>
                    <span>{resume.address}</span>
                  </div>
                )}
                {resume.city && (
                  <div className="flex items-center gap-3">
                    <span
                      className="p-2 rounded-full"
                      style={{ backgroundColor: accentColor, color: "white" }}
                    >
                      🏙️
                    </span>
                    <span>{resume.city}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            {resume.resume.skills.length > 0 && (
              <div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: primaryColor }}
                >
                  {tShared("sections.skills")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resume.resume.skills.map((skill) => (
                    <div
                      key={skill.uuid}
                      className="px-3 py-1 rounded-full text-white text-sm flex items-center gap-1"
                      style={{ backgroundColor: accentColor }}
                    >
                      <span>{skill.resumeskill_name || skill.skill_uuid}</span>
                      {skill.resumeskill_level && (
                        <span className="opacity-75 text-xs">
                          • {tShared("skills.level")} {skill.resumeskill_level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages Section */}
            {resume.resume.resumeLanguages.length > 0 && (
              <div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: primaryColor }}
                >
                  {tShared("sections.languages")}
                </h3>
                <div className="space-y-3">
                  {resume.resume.resumeLanguages.map((language) => (
                    <div key={language.uuid} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex justify-between flex-1">
                          <span>{language.name}</span>
                          <span className="text-sm text-gray-600">
                            {tShared("languages.level")} {language.level}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            backgroundColor: accentColor,
                            width: `${(language.level / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="md:w-2/3 space-y-8">
            {/* Experience Section */}
            {resume.resume.resumeExperiences.length > 0 && (
              <div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: primaryColor }}
                >
                  {tShared("sections.experience")}
                </h3>
                <div className="space-y-6">
                  {resume.resume.resumeExperiences.map((exp) => (
                    <div
                      key={exp.uuid}
                      className="p-4 rounded-lg"
                      style={{ borderLeft: `4px solid ${accentColor}` }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                        <h4
                          className="text-lg font-medium"
                          style={{ color: primaryColor }}
                        >
                          {exp.job_title}
                        </h4>
                        <span
                          className="text-sm"
                          style={{ color: accentColor }}
                        >
                          {formatDate(exp.date_start)} -{" "}
                          {exp.current_time
                            ? tShared("present")
                            : formatDate(exp.date_end)}
                        </span>
                      </div>
                      <p
                        className="text-sm font-medium mb-2"
                        style={{ color: accentColor }}
                      >
                        {exp.company_name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {resume.resume.resumeProjects.length > 0 && (
              <div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: primaryColor }}
                >
                  {tShared("sections.projects")}
                </h3>
                <div className="space-y-6">
                  {resume.resume.resumeProjects.map((project) => (
                    <div
                      key={project.uuid}
                      className="p-4 rounded-lg"
                      style={{ borderLeft: `4px solid ${accentColor}` }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4
                              className="text-lg font-medium"
                              style={{ color: primaryColor }}
                            >
                              {project.name}
                            </h4>
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:underline inline-flex items-center gap-1"
                                style={{ color: accentColor }}
                              >
                                <span>🔗</span>
                                <span className="hidden md:inline">
                                  {tShared("projects.viewProject")}
                                </span>
                              </a>
                            )}
                          </div>
                          {project.description && (
                            <p className="text-gray-600 text-sm mt-1">
                              {project.description}
                            </p>
                          )}
                        </div>
                        <span
                          className="text-sm whitespace-nowrap"
                          style={{ color: accentColor }}
                        >
                          {formatDate(project.date_start)} -{" "}
                          {formatDate(project.date_end)}
                        </span>
                      </div>
                      {project.tasks && project.tasks.length > 0 && (
                        <div className="mt-3">
                          <h5
                            className="text-sm font-medium mb-2"
                            style={{ color: primaryColor }}
                          >
                            {tShared("projects.keyTasks")}:
                          </h5>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {project.tasks.map((task) => (
                              <li
                                key={task.uuid}
                                className="flex items-start gap-2 text-sm"
                              >
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs whitespace-nowrap ${
                                    task.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {tShared(
                                    `projects.status.${task.status.toLowerCase()}`
                                  )}
                                </span>
                                <div>
                                  <span className="text-gray-800">
                                    {task.name}
                                  </span>
                                  {task.description && (
                                    <p className="text-gray-500 text-xs mt-0.5">
                                      {task.description}
                                    </p>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {resume.resume.resumeEducations.length > 0 && (
              <div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: primaryColor }}
                >
                  {tShared("sections.education")}
                </h3>
                <div className="space-y-6">
                  {resume.resume.resumeEducations.map((edu) => (
                    <div
                      key={edu.uuid}
                      className="p-4 rounded-lg"
                      style={{ borderLeft: `4px solid ${accentColor}` }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                        <h4
                          className="text-lg font-medium"
                          style={{ color: primaryColor }}
                        >
                          {edu.title}
                        </h4>
                        <span
                          className="text-sm"
                          style={{ color: accentColor }}
                        >
                          {formatDate(edu.date_start)} -{" "}
                          {edu.is_current
                            ? tShared("present")
                            : formatDate(edu.date_end)}
                        </span>
                      </div>
                      <p
                        className="text-sm font-medium mb-2"
                        style={{ color: accentColor }}
                      >
                        {edu.degree}
                      </p>
                      {edu.description && (
                        <p className="text-gray-600 text-sm">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Section */}
            {resume.resume.resumeCertifications.length > 0 && (
              <div>
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: primaryColor }}
                >
                  {tShared("sections.certifications")}
                </h3>
                <div className="space-y-6">
                  {resume.resume.resumeCertifications.map((cert) => (
                    <div
                      key={cert.uuid}
                      className="p-4 rounded-lg"
                      style={{ borderLeft: `4px solid ${accentColor}` }}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                        <h4
                          className="text-lg font-medium"
                          style={{ color: primaryColor }}
                        >
                          {cert.name}
                        </h4>
                        <span
                          className="text-sm"
                          style={{ color: accentColor }}
                        >
                          {formatDate(cert.date)}
                          {cert.expiration_date && (
                            <span className="text-gray-500">
                              {" "}
                              - {tShared("certifications.expires")}:{" "}
                              {formatDate(cert.expiration_date)}
                            </span>
                          )}
                        </span>
                      </div>
                      <p
                        className="text-sm font-medium mb-2"
                        style={{ color: accentColor }}
                      >
                        {cert.organization}
                      </p>
                      {cert.description && (
                        <p className="text-gray-600 text-sm">
                          {cert.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
