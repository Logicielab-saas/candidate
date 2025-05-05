import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export type CVTemplate = "classic" | "modern";

interface TemplateSelectorProps {
  selectedTemplate: CVTemplate;
  onChange: (template: CVTemplate) => void;
}

export function TemplateSelector({
  selectedTemplate,
  onChange,
}: TemplateSelectorProps) {
  const t = useTranslations("postulyCVPage.templates");
  return (
    <RadioGroup
      value={selectedTemplate}
      onValueChange={(value) => onChange(value as CVTemplate)}
      className="flex space-x-4"
    >
      <div className="flex flex-col items-center space-y-2">
        <Card
          className="relative w-32 h-44 border-2 cursor-pointer overflow-hidden transition-all hover:shadow-md"
          style={{
            borderColor:
              selectedTemplate === "classic" ? "#29ABE2" : "transparent",
          }}
          onClick={() => onChange("classic")}
        >
          {/* Classic Template Preview */}
          <div className="absolute inset-0 flex">
            <div className="w-1/3 bg-slate-800 h-full"></div>
            <div className="w-2/3 bg-white p-2">
              <div className="w-full h-2 bg-slate-800 mb-1"></div>
              <div className="w-3/4 h-2 bg-blue-400 mb-3"></div>
              <div className="w-full h-1 bg-slate-200 mb-1"></div>
              <div className="w-full h-1 bg-slate-200 mb-1"></div>
              <div className="w-full h-1 bg-slate-200 mb-3"></div>
              <div className="w-full h-2 bg-slate-800 mb-1"></div>
              <div className="w-3/4 h-2 bg-blue-400 mb-3"></div>
              <div className="w-full h-1 bg-slate-200 mb-1"></div>
            </div>
          </div>
          <RadioGroupItem value="classic" className="sr-only" id="classic" />
        </Card>
        <Label htmlFor="classic" className="text-sm">
          {t("classic")}
        </Label>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <Card
          className="relative w-32 h-44 border-2 cursor-pointer overflow-hidden transition-all hover:shadow-md"
          style={{
            borderColor:
              selectedTemplate === "modern" ? "#29ABE2" : "transparent",
          }}
          onClick={() => onChange("modern")}
        >
          {/* Modern Template Preview */}
          <div className="absolute inset-0 flex flex-col">
            <div className="h-1/4 bg-blue-500 w-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <div className="flex-1 bg-white p-2">
              <div className="w-full h-2 bg-slate-800 mb-1"></div>
              <div className="w-3/4 h-1 bg-slate-400 mb-3"></div>
              <div className="flex space-x-2 mb-3">
                <div className="w-1/2">
                  <div className="w-full h-1 bg-blue-500 mb-1"></div>
                  <div className="w-full h-1 bg-slate-200 mb-1"></div>
                  <div className="w-full h-1 bg-slate-200"></div>
                </div>
                <div className="w-1/2">
                  <div className="w-full h-1 bg-blue-500 mb-1"></div>
                  <div className="w-full h-1 bg-slate-200 mb-1"></div>
                  <div className="w-full h-1 bg-slate-200"></div>
                </div>
              </div>
            </div>
          </div>
          <RadioGroupItem value="modern" className="sr-only" id="modern" />
        </Card>
        <Label htmlFor="modern" className="text-sm">
          {t("modern")}
        </Label>
      </div>
    </RadioGroup>
  );
}
