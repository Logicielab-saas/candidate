"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OpenQuestionProps {
  question: string;
  isRequired: boolean;
}

export function OpenQuestion({ question, isRequired }: OpenQuestionProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base">
        {question}
        {isRequired && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
        placeholder="Le candidat pourra répondre ici..."
        disabled
        className="min-h-[100px] bg-muted cursor-not-allowed"
      />
    </div>
  );
}
