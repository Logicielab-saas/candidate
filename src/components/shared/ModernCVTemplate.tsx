import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Resume } from "@/core/interfaces";
import { sampleDataCV } from "@/core/mockData/simple-data-cv";

interface ModernCVProps {
  primaryColor: string;
  accentColor: string;
  setImageLoaded: (loaded: boolean) => void;
  setImageError: (error: boolean) => void;
  resume: Resume;
}

export function ModernCVTemplate({
  primaryColor,
  accentColor,
  setImageLoaded,
  setImageError,
  resume,
}: ModernCVProps) {
  return (
    <div className="bg-white shadow-lg" style={{ maxWidth: "800px" }}>
      {/* Header Section */}
      <div className="p-8" style={{ backgroundColor: accentColor }}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-32 h-32 rounded-full border-4 border-white">
            <AvatarImage
              src={sampleDataCV.personalInfo.avatar}
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
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-white text-center md:text-left">
            <h1 className="text-4xl font-bold">
              {sampleDataCV.personalInfo.name}
            </h1>
            <h2 className="text-2xl mt-2">{sampleDataCV.personalInfo.title}</h2>
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
            About Me
          </h3>
          <p className="text-gray-600">{sampleDataCV.personalInfo.about}</p>
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
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span
                    className="p-2 rounded-full"
                    style={{ backgroundColor: accentColor, color: "white" }}
                  >
                    📱
                  </span>
                  <span>{sampleDataCV.personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="p-2 rounded-full"
                    style={{ backgroundColor: accentColor, color: "white" }}
                  >
                    ✉️
                  </span>
                  <span>{sampleDataCV.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="p-2 rounded-full"
                    style={{ backgroundColor: accentColor, color: "white" }}
                  >
                    📍
                  </span>
                  <span>{sampleDataCV.personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {sampleDataCV.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-white text-sm"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages Section */}
            <div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                Languages
              </h3>
              <div className="space-y-3">
                {sampleDataCV.languages.map((language) => (
                  <div key={language.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{language.name}</span>
                      <span>{language.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          backgroundColor: accentColor,
                          width:
                            language.level === "Native"
                              ? "100%"
                              : language.level === "Professional"
                              ? "80%"
                              : "60%",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-2/3 space-y-8">
            {/* Experience Section */}
            <div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                Professional Experience
              </h3>
              <div className="space-y-6">
                {sampleDataCV.experience.map((exp) => (
                  <div
                    key={exp.company}
                    className="p-4 rounded-lg border-l-4"
                    style={{ borderColor: accentColor }}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                      <h4
                        className="text-lg font-medium"
                        style={{ color: primaryColor }}
                      >
                        {exp.role}
                      </h4>
                      <span className="text-sm" style={{ color: accentColor }}>
                        {exp.period}
                      </span>
                    </div>
                    <p
                      className="text-sm font-medium mb-2"
                      style={{ color: accentColor }}
                    >
                      {exp.company}
                    </p>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                Education
              </h3>
              <div className="space-y-6">
                {sampleDataCV.education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="p-4 rounded-lg border-l-4"
                    style={{ borderColor: accentColor }}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                      <h4
                        className="text-lg font-medium"
                        style={{ color: primaryColor }}
                      >
                        {edu.degree}
                      </h4>
                      <span className="text-sm" style={{ color: accentColor }}>
                        {edu.period}
                      </span>
                    </div>
                    <p
                      className="text-sm font-medium mb-2"
                      style={{ color: accentColor }}
                    >
                      {edu.institution}
                    </p>
                    <p className="text-gray-600">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
