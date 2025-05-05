/**
 * QuestionsSection - Review step questions section
 *
 * Displays questions and answers and allows editing through a dialog
 */

"use client";

import { MessageSquare, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { EditQuestionsDialog } from "./EditQuestionsDialog";
import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import { type SubmissionQuestion } from "@/core/mockData/annonces";
import { useTranslations } from "next-intl";

interface QuestionsSectionProps {
  questions: SubmissionQuestion[];
}

export function QuestionsSection({ questions }: QuestionsSectionProps) {
  const tCommon = useTranslations("common");
  const { questionsData } = useJobApplyStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Find question text by ID
  const getQuestionText = (id: string) => {
    const question = questions.find((q) => q.id === id);
    if (!question) return `Question ${id}`;

    // For experience questions, combine label and question
    if (question.type === "experience") {
      return `${question.label} (${question.question})`;
    }

    // For other questions, use question text or label
    return question.question || question.label || `Question ${id}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">{tCommon("questions")}</h3>
        </div>
        <span
          className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 hover:text-primaryHex-600 cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <Pencil className="h-5 w-5" />
        </span>
      </div>
      <Separator />

      {questionsData.answers.length > 0 ? (
        <div className="space-y-4">
          {questionsData.answers.map((answer) => (
            <div key={answer.id}>
              <p className="text-sm text-muted-foreground">
                {getQuestionText(answer.id)}
              </p>
              <p className="font-medium">
                {Array.isArray(answer.answer)
                  ? answer.answer.join(", ")
                  : answer.answer}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground italic">{tCommon("noQuestions")}</p>
      )}

      <EditQuestionsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        questions={questions}
      />
    </div>
  );
}
