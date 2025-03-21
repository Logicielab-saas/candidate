/**
 * QuestionForm - Form component for job application questions
 *
 * Renders a form with text inputs for each question
 */

"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QuestionAnswer } from "@/features/job-apply/store/useJobApplyStore";

interface QuestionFormProps {
  questions: string[];
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
      {questions.map((question, index) => {
        const answer =
          (answers.find((a) => a.id === String(index))?.answer as string) || "";

        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={`question-${index}`} className="text-base">
              {question}
            </Label>
            <Textarea
              id={`question-${index}`}
              value={answer}
              onChange={(e) =>
                handleAnswerChange(String(index), e.target.value)
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
