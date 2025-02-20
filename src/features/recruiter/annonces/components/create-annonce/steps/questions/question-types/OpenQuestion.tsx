"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QuestionSettings } from "./QuestionSettings";

interface OpenQuestionProps {
  question: string;
  isRequired: boolean;
  questionId: string;
  onRequiredChange: (required: boolean) => void;
}

export function OpenQuestion({
  question,
  isRequired,
  questionId,
  onRequiredChange,
}: OpenQuestionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Label className="text-base">{question}</Label>
        <QuestionSettings
          questionId={questionId}
          isRequired={isRequired}
          onRequiredChange={onRequiredChange}
        />
      </div>
      <Textarea
        placeholder="Le candidat pourra répondre ici..."
        disabled
        className="min-h-[100px] bg-muted cursor-not-allowed"
      />
    </div>
  );
}
