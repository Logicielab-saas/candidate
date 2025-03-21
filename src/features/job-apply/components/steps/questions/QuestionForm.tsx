/**
 * QuestionForm - Form component for job application questions
 *
 * Renders a form with text inputs for each question
 */

"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QuestionAnswer } from "@/features/job-apply/store/useJobApplyStore";
import type { EmploisQuestions } from "@/core/interfaces";

interface QuestionFormProps {
  questions: EmploisQuestions[];
  answers: QuestionAnswer[];
  onChange: (answers: QuestionAnswer[]) => void;
}

export function QuestionForm({
  questions,
  answers,
  onChange,
}: QuestionFormProps) {
  const handleAnswerChange = (questionId: string, value: string) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      (a) => a.id === questionId
    );

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { id: questionId, answer: value };
    } else {
      newAnswers.push({ id: questionId, answer: value });
    }

    onChange(newAnswers);
  };

  return (
    <div className="space-y-6">
      {questions.map((question) => {
        const answer =
          (answers.find((a) => a.id === question.uuid)?.answer as string) || "";

        return (
          <div key={question.uuid} className="space-y-2">
            <Label htmlFor={`question-${question.uuid}`} className="text-base">
              {question.title}
            </Label>
            <Textarea
              id={`question-${question.uuid}`}
              value={answer}
              onChange={(e) =>
                handleAnswerChange(question.uuid, e.target.value)
              }
              placeholder="Votre réponse..."
              className="min-h-[100px]"
            />
          </div>
        );
      })}
    </div>
  );
}
