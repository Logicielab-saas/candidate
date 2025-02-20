"use client";

import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { useCreateAnnonceStore } from "@/features/recruiter/annonces/store/create-annonce-store";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { PREDEFINED_QUESTIONS } from "@/core/mockData/questions-data";
import { Button } from "@/components/ui/button";
import { QuestionFactory } from "./questions/QuestionFactory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuestionAnswer } from "@/features/recruiter/annonces/common/types/questions.types";
import {
  CustomQuestion,
  PredefinedQuestion,
} from "@/features/recruiter/annonces/common/interfaces/questions.interface";
import { CustomQuestionDialog } from "./questions/dialogs/CustomQuestionDialog";

const MAX_QUESTIONS = 5;

// TODO: Add Custom Questions and handle it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type QuestionWithAnswer = PredefinedQuestion & {
  answer?: QuestionAnswer;
};

export function QuestionsStep() {
  const { nextStep, previousStep, canProceed, questions, setQuestions } =
    useCreateAnnonceStore();

  const handleAddQuestion = (questionId: string) => {
    const predefinedQuestion = PREDEFINED_QUESTIONS.find(
      (q) => q.id === questionId
    );
    if (!predefinedQuestion) return;

    // Check if we've reached the maximum number of questions
    if (questions.length >= MAX_QUESTIONS) {
      // You might want to show a toast or alert here
      console.warn("Maximum number of questions reached");
      return;
    }

    // For questions with isMultiple=true, generate a unique ID
    if (predefinedQuestion.isMultiple) {
      const uniqueId = `${questionId}-${Date.now()}`;
      setQuestions([
        ...questions,
        { ...predefinedQuestion, id: uniqueId, answer: undefined },
      ]);
    } else if (!questions.some((q) => q.id === questionId)) {
      // For non-multiple questions, only add if not already present
      setQuestions([
        ...questions,
        { ...predefinedQuestion, answer: undefined },
      ]);
    }
  };

  const handleAddCustomQuestion = (customQuestion: CustomQuestion) => {
    // Check if we've reached the maximum number of questions
    if (questions.length >= MAX_QUESTIONS) {
      // You might want to show a toast or alert here
      console.warn("Maximum number of questions reached");
      return;
    }

    const baseQuestion = {
      id: `custom-${Date.now()}`,
      question: customQuestion.label,
      isRequired: customQuestion.isRequired,
      isMultiple: customQuestion.isMultipleChoices || false,
    };

    // Handle each type explicitly to satisfy TypeScript
    switch (customQuestion.type) {
      case "choice":
        setQuestions([
          ...questions,
          {
            ...baseQuestion,
            type: "choice",
            options: customQuestion.options || [],
            answer: undefined,
          } as PredefinedQuestion,
        ]);
        break;
      case "open":
        setQuestions([
          ...questions,
          {
            ...baseQuestion,
            type: "open",
            answer: undefined,
          } as PredefinedQuestion,
        ]);
        break;
      case "yesno":
        setQuestions([
          ...questions,
          {
            ...baseQuestion,
            type: "yesno",
            answer: undefined,
          } as PredefinedQuestion,
        ]);
        break;
    }
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

  // Function to check if a predefined question can be added
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

      <Card className="p-6">
        <div className="grid grid-cols-2 gap-4">
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
          <CustomQuestionDialog
            onAddQuestion={handleAddCustomQuestion}
            disabled={questions.length >= MAX_QUESTIONS}
          />
        </div>
      </Card>

      {questions.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Questions sélectionnées</h3>
            <span className="text-sm text-muted-foreground">
              {questions.length} / {MAX_QUESTIONS} questions
            </span>
          </div>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-8">
              {questions.map((question) => (
                <div key={question.id} className="relative">
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
                    onChange={(value) =>
                      handleQuestionChange(question.id, value)
                    }
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
          </ScrollArea>
        </Card>
      )}

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={nextStep}
        canProceed={canProceed()}
      />
    </div>
  );
}
