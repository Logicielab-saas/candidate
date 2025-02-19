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

interface ExperienceQuestionProps {
  question: string;
  isRequired: boolean;
  onChange: (value: string) => void;
  value?: string;
}

const EXPERIENCE_OPTIONS = [
  { value: "1", label: "Au moins 1 an" },
  { value: "2", label: "Au moins 2 ans" },
  { value: "3", label: "Au moins 3 ans" },
  { value: "5", label: "Au moins 5 ans" },
  { value: "7", label: "Au moins 7 ans" },
  { value: "10", label: "Au moins 10 ans" },
];

export function ExperienceQuestion({
  question,
  isRequired,
  onChange,
  value,
}: ExperienceQuestionProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label className="text-base">
          Créer une question d&apos;expérience
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </Label>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Label
              htmlFor="skill"
              className="text-sm text-muted-foreground mb-2"
            >
              Compétence ou technologie requise
            </Label>
            <Input
              id="skill"
              placeholder="Ex: React, Flutter, Java, Management..."
              value={value?.split(" au moins ")[0] || ""}
              onChange={(e) => {
                const years =
                  value?.split(" au moins ")[1]?.split(" ")[0] || "";
                onChange(
                  `${e.target.value}${years ? ` au moins ${years} ans` : ""}`
                );
              }}
            />
          </div>
          <div className="w-[200px]">
            <Label
              htmlFor="years"
              className="text-sm text-muted-foreground mb-2"
            >
              Expérience requise
            </Label>
            <Select
              value={value?.split(" au moins ")[1]?.split(" ")[0] || ""}
              onValueChange={(newYears) => {
                const skill = value?.split(" au moins ")[0] || "";
                onChange(`${skill} au moins ${newYears} ans`);
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
  );
}
