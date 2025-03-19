"use client";

import { generatePDF } from "@/core/utils/generate-pdf";
import { useRef, useState } from "react";
import { ColorPicker } from "./ColorPicker";
import { CVTemplate, TemplateSelector } from "./TemplateSelector";
import { ClassicCVTemplate } from "./ClassicCVTemplate";
import { ModernCVTemplate } from "./ModernCVTemplate";

export default function GenerateCV() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#1B2F3D");
  const [accentColor, setAccentColor] = useState("#29ABE2");
  const [template, setTemplate] = useState<CVTemplate>("classic");

  const handleGeneratePDF = async () => {
    if (!resumeRef.current) return;

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
            {!hasImageError && !isImageLoaded ? "Loading..." : "Download PDF"}
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
          />
        ) : (
          <ModernCVTemplate
            primaryColor={primaryColor}
            accentColor={accentColor}
            setImageLoaded={setIsImageLoaded}
            setImageError={setHasImageError}
          />
        )}
      </div>
    </div>
  );
}
