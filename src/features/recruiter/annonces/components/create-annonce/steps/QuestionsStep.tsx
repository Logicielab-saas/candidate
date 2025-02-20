"use client";

import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { useCreateAnnonceStore } from "@/features/recruiter/annonces/store/create-annonce-store";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { PREDEFINED_QUESTIONS } from "@/core/mockData/questions-data";
import { Button } from "@/components/ui/button";
import { QuestionFactory } from "./questions/QuestionFactory";
import { QuestionAnswer } from "@/features/recruiter/annonces/common/types/questions.types";
import { PredefinedQuestion } from "@/features/recruiter/annonces/common/interfaces/questions.interface";
import { CustomQuestionDialog } from "./questions/dialogs/CustomQuestionDialog";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { createPredefinedFromCustom } from "@/core/utils";
import type { CustomQuestionProps } from "./questions/dialogs/CustomQuestionDialog";

const MAX_QUESTIONS = 5;

export function QuestionsStep() {
  const { nextStep, previousStep, canProceed, questions, setQuestions } =
    useCreateAnnonceStore();
  const { toast } = useToast();

  // ? Ref for the last question to scroll to it
  const lastQuestionRef = useRef<HTMLDivElement>(null);

  // ? Effect to scroll to the last question when questions array changes & show toast if max questions reached
  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (questions.length == MAX_QUESTIONS) {
      toast({
        variant: "warning",
        title: "Limite atteinte",
        description: `Vous ne pouvez pas ajouter plus de ${MAX_QUESTIONS} questions.`,
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions.length]); // ! Only trigger when questions length changes

  const handleAddQuestion = (questionId: string) => {
    const predefinedQuestion = PREDEFINED_QUESTIONS.find(
      (q) => q.id === questionId
    );
    if (!predefinedQuestion) return;

    // For questions with isMultiple=true, generate a unique ID
    if (predefinedQuestion.isMultiple) {
      const uniqueId = `${questionId}-${Date.now()}`;
      setQuestions([
        ...questions,
        { ...predefinedQuestion, id: uniqueId, answer: undefined },
      ]);
    } else if (!questions.some((q) => q.id === questionId)) {
      // * For non-multiple questions, only add if not already present
      setQuestions([
        ...questions,
        { ...predefinedQuestion, answer: undefined },
      ]);
    }
  };

  const handleAddCustomQuestion = (customQuestion: CustomQuestionProps) => {
    const newQuestion = createPredefinedFromCustom(customQuestion);
    setQuestions([...questions, { ...newQuestion, answer: undefined }]);
  };

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const handleQuestionChange = (questionId: string, value: QuestionAnswer) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, answer: value } : q))
    );
  };

  const handleRequiredChange = (questionId: string, required: boolean) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, isRequired: required } : q
      )
    );
  };

  const handleMultipleChoicesChange = (
    questionId: string,
    multiple: boolean
  ) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, isMultiple: multiple } : q
      )
    );
  };

  // * Function to check if a predefined question can be added
  const canAddQuestion = (question: PredefinedQuestion) => {
    if (questions.length >= MAX_QUESTIONS) return false;
    return question.isMultiple || !questions.some((q) => q.id === question.id);
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      <HeaderSectionStepsForm
        title="Questions pour les candidats"
        description={`Ajoutez des questions pour mieux évaluer les candidats (maximum ${MAX_QUESTIONS} questions)`}
      />

      {/* Card for adding predefined and custom questions */}
      <Card className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Render predefined questions as buttons */}
          {PREDEFINED_QUESTIONS.map((question) => (
            <Button
              key={question.id}
              variant="ghost"
              className="h-auto py-4 px-6 flex items-center gap-3 justify-start rounded-full hover:bg-primaryHex-50 dark:hover:bg-primaryHex-900/50"
              onClick={() => handleAddQuestion(question.id)}
              disabled={!canAddQuestion(question)}
            >
              <div className="w-8 h-8 rounded-full bg-primaryHex-100 dark:bg-primaryHex-900 flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4 text-primaryHex-500" />
              </div>
              <span className="text-left font-medium line-clamp-2">
                {question.question}
                {question.isMultiple && (
                  <span className="block text-xs text-muted-foreground">
                    (Peut être ajoutée plusieurs fois)
                  </span>
                )}
              </span>
            </Button>
          ))}
          {/* Custom question dialog for adding new questions */}
          <CustomQuestionDialog
            onAddQuestion={handleAddCustomQuestion}
            disabled={questions.length >= MAX_QUESTIONS}
          />
        </div>
      </Card>

      {/* Display selected questions if any */}
      {questions.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Questions sélectionnées</h3>
            <span className="text-sm text-muted-foreground">
              {questions.length} / {MAX_QUESTIONS} questions
            </span>
          </div>
          {/* Render selected questions with remove button */}
          <div className="space-y-8">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="relative"
                ref={index === questions.length - 1 ? lastQuestionRef : null}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -right-2 -top-2"
                  onClick={() => handleRemoveQuestion(question.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <QuestionFactory
                  question={question}
                  value={question.answer}
                  onChange={(value) => handleQuestionChange(question.id, value)}
                  onRequiredChange={(required) =>
                    handleRequiredChange(question.id, required)
                  }
                  onMultipleChoicesChange={
                    question.type === "choice"
                      ? (multiple) =>
                          handleMultipleChoicesChange(question.id, multiple)
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Navigation buttons for form steps */}
      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={nextStep}
        canProceed={canProceed()}
      />
    </div>
  );
}
