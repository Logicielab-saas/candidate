"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OpenQuestionProps {
  question: string;
  isRequired: boolean;
  onChange: (value: string) => void;
  value?: string;
}

export function OpenQuestion({
  question,
  isRequired,
  onChange,
  value,
}: OpenQuestionProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base">
        {question}
        {isRequired && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
        placeholder="Votre réponse..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px]"
      />
    </div>
  );
}
