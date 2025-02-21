"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionSettings } from "./QuestionSettings";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface ExperienceQuestionProps {
  question: string;
  isRequired: boolean;
  onChange: (value: string) => void;
  value?: string;
  questionId: string;
  onRequiredChange: (required: boolean) => void;
}

const EXPERIENCE_OPTIONS = [
  { value: "0", label: "Aucune expérience requise" },
  { value: "1", label: "Au moins 1 an" },
  { value: "2", label: "Au moins 2 ans" },
  { value: "3", label: "Au moins 3 ans" },
  { value: "5", label: "Au moins 5 ans" },
  { value: "7", label: "Au moins 7 ans" },
  { value: "10", label: "Au moins 10 ans" },
];

export function ExperienceQuestion({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  question,
  isRequired,
  onChange,
  value,
  questionId,
  onRequiredChange,
}: ExperienceQuestionProps) {
  const skill = value?.split(" au moins ")[0] || "";
  const years = value?.split(" au moins ")[1]?.split(" ")[0] || "0";
  const hasError = years !== "0" && !skill.trim();

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <Label className="text-base">
            Créer une question d&apos;expérience
          </Label>
          <QuestionSettings
            questionId={questionId}
            isRequired={isRequired}
            onRequiredChange={onRequiredChange}
          />
        </div>
        <div className="flex items-end gap-3">
          <div className="flex-1 space-y-2">
            <Label
              htmlFor="skill"
              className="text-sm mb-2 text-muted-foreground"
            >
              Compétence ou technologie requise
            </Label>
            <div className="relative">
              <Input
                id="skill"
                placeholder="Ex: React, Flutter, Java, Management..."
                value={skill}
                onChange={(e) => {
                  const newSkill = e.target.value;
                  if (years === "0") {
                    onChange("Aucune expérience requise");
                  } else {
                    onChange(`${newSkill} au moins ${years} ans`);
                  }
                }}
                className={cn(
                  hasError && "border-destructive",
                  "transition-colors"
                )}
                disabled={years === "0"}
              />
              {hasError && (
                <AlertCircle className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-destructive" />
              )}
            </div>
          </div>
          <div className="w-[200px] space-y-2">
            <Label
              htmlFor="years"
              className="text-sm mb-2 text-muted-foreground"
            >
              Expérience requise
            </Label>
            <div className="relative">
              <Select
                defaultValue="0"
                value={years}
                onValueChange={(newYears) => {
                  if (newYears === "0") {
                    onChange("Aucune expérience requise");
                  } else {
                    onChange(`${skill} au moins ${newYears} ans`);
                  }
                }}
              >
                <SelectTrigger id="years">
                  <SelectValue placeholder="Années" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
