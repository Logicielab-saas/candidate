/**
 * QuestionStep - Handles job application questions
 *
 * Displays and manages answers for job-specific questions
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import { useState, useEffect } from "react";
import { QuestionForm } from "./QuestionForm";
import type { EmploisQuestions } from "@/core/interfaces";

interface QuestionStepProps {
  questions: EmploisQuestions[];
}

export function QuestionStep({ questions }: QuestionStepProps) {
  const { nextStep, questionsData, setQuestionsData } = useJobApplyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for no questions and skip to next step
  useEffect(() => {
    if (!questions?.length) {
      nextStep();
    }
  }, [questions, nextStep]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Save answers and move to next step
      nextStep();
    } catch (error) {
      console.error("Error submitting questions:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no questions, don't render anything
  if (!questions?.length) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Questions supplémentaires</h2>
      <div className="space-y-8">
        <QuestionForm
          questions={questions}
          answers={questionsData.answers}
          onChange={(answers) => setQuestionsData({ answers })}
        />

        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : "Continuer"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
