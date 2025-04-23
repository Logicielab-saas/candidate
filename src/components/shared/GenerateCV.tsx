/**
 * GenerateCV - A component for generating and downloading CV in different templates
 *
 * Handles CV template selection, color customization, and PDF generation
 * with proper loading and error states for resume data.
 */

"use client";

import { generatePDF } from "@/core/utils/generate-pdf";
import { useRef, useState } from "react";
import { ColorPicker } from "./ColorPicker";
import { CVTemplate, TemplateSelector } from "./TemplateSelector";
import { ClassicCVTemplate } from "./ClassicCVTemplate";
import { ModernCVTemplate } from "./ModernCVTemplate";
import { useProfileResume } from "@/features/candidature/(profile)/qualifications/hooks/use-profile-resume";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

export default function GenerateCV() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#1B2F3D");
  const [accentColor, setAccentColor] = useState("#29ABE2");
  const [template, setTemplate] = useState<CVTemplate>("classic");
  const { data: resume, isLoading, error } = useProfileResume();
  const t = useTranslations("postulyCVPage");
  const tCommon = useTranslations("common");

  const handleGeneratePDF = async () => {
    if (!resumeRef.current || !resume) return;

    try {
      await generatePDF({
        element: resumeRef.current,
        isImageLoaded: hasImageError ? true : isImageLoaded,
        filename: "postuly-cv.pdf",
      });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 space-y-4">
        <Skeleton className="h-12 w-full max-w-md" />
        <Skeleton className="h-[800px] w-full max-w-[800px] mx-auto" />
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {t("error.title")}
          </h2>
          <p className="text-gray-600">{t("error.description")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <TemplateSelector selectedTemplate={template} onChange={setTemplate} />

        <div className="flex items-center gap-4">
          <ColorPicker
            primaryColor={primaryColor}
            accentColor={accentColor}
            onPrimaryChange={setPrimaryColor}
            onAccentChange={setAccentColor}
          />
          <button
            onClick={handleGeneratePDF}
            disabled={!hasImageError && !isImageLoaded}
            className="px-6 py-3 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentColor }}
          >
            {!hasImageError && !isImageLoaded
              ? tCommon("loading")
              : tCommon("actions.download")}
          </button>
        </div>
      </div>

      <div className="mx-auto" ref={resumeRef} style={{ maxWidth: "800px" }}>
        {template === "classic" ? (
          <ClassicCVTemplate
            primaryColor={primaryColor}
            accentColor={accentColor}
            setImageLoaded={setIsImageLoaded}
            setImageError={setHasImageError}
            resume={resume}
          />
        ) : (
          <ModernCVTemplate
            primaryColor={primaryColor}
            accentColor={accentColor}
            setImageLoaded={setIsImageLoaded}
            setImageError={setHasImageError}
            resume={resume}
          />
        )}
      </div>
    </div>
  );
}
