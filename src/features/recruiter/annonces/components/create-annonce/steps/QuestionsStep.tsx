"use client";

import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { useCreateAnnonceStore } from "@/features/recruiter/annonces/store/create-annonce-store";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { PREDEFINED_QUESTIONS } from "@/core/mockData/questions-data";
import { Button } from "@/components/ui/button";
import { QuestionFactory } from "./questions/QuestionFactory";
import {
  ChoiceSelectedQuestion,
  QuestionAnswer,
  SimpleSelectedQuestion,
} from "@/features/recruiter/annonces/common/types/questions.types";
import { PredefinedQuestion } from "@/features/recruiter/annonces/common/interfaces/questions.interface";
import { CustomQuestionDialog } from "./questions/dialogs/CustomQuestionDialog";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createPredefinedFromCustom } from "@/features/recruiter/annonces/common";
import type { CustomQuestionProps } from "./questions/dialogs/CustomQuestionDialog";
import { FloatingScrollButton } from "./questions/FloatingScrollButton";
import { SelectedQuestion } from "@/features/recruiter/annonces/common/types/questions.types";

const MAX_QUESTIONS = 5;

interface QuestionsStepProps {
  isDialog?: boolean;
  onDialogClose?: () => void;
}

export function QuestionsStep({
  isDialog = false,
  onDialogClose,
}: QuestionsStepProps) {
  const { nextStep, previousStep, canProceed, questions, setQuestions } =
    useCreateAnnonceStore();
  const { toast } = useToast();

  // Local state for dialog mode
  const [localQuestions, setLocalQuestions] =
    useState<SelectedQuestion[]>(questions);

  // ? Ref for the last question to scroll to it
  const lastQuestionRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const containerRef = useRef<HTMLDivElement>(null);

  // ? Effect to scroll to the last question when questions array changes & show toast if max questions reached
  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if ((isDialog ? localQuestions : questions).length == MAX_QUESTIONS) {
      toast({
        variant: "warning",
        title: "Limite atteinte",
        description: `Vous ne pouvez pas ajouter plus de ${MAX_QUESTIONS} questions.`,
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialog ? localQuestions.length : questions.length]); // ! Only trigger when questions length changes

  const handleAddQuestion = (questionId: string) => {
    const predefinedQuestion = PREDEFINED_QUESTIONS.find(
      (q) => q.id === questionId
    );
    if (!predefinedQuestion) return;

    const currentQuestions = isDialog ? localQuestions : questions;
    let newQuestions: SelectedQuestion[];

    // For questions with isMultiple=true, generate a unique ID
    if (predefinedQuestion.isMultiple) {
      const uniqueId = `${questionId}-${Date.now()}`;

      if (predefinedQuestion.type === "choice") {
        const choiceQuestion: ChoiceSelectedQuestion = {
          id: uniqueId,
          type: "choice",
          question: predefinedQuestion.question,
          isRequired: predefinedQuestion.isRequired,
          isMultiple: predefinedQuestion.isMultiple,
          options: predefinedQuestion.options,
          isMultipleChoices: false,
          answer: undefined,
        };
        newQuestions = [...currentQuestions, choiceQuestion];
      } else {
        const simpleQuestion: SimpleSelectedQuestion = {
          id: uniqueId,
          type: predefinedQuestion.type,
          question: predefinedQuestion.question,
          isRequired: predefinedQuestion.isRequired,
          isMultiple: predefinedQuestion.isMultiple,
          answer:
            predefinedQuestion.type === "experience"
              ? "Aucune expérience requise"
              : undefined,
        };
        newQuestions = [...currentQuestions, simpleQuestion];
      }
    } else if (!currentQuestions.some((q) => q.id === questionId)) {
      // * For non-multiple questions, only add if not already present
      if (predefinedQuestion.type === "choice") {
        const choiceQuestion: ChoiceSelectedQuestion = {
          id: predefinedQuestion.id,
          type: "choice",
          question: predefinedQuestion.question,
          isRequired: predefinedQuestion.isRequired,
          isMultiple: predefinedQuestion.isMultiple,
          options: predefinedQuestion.options,
          isMultipleChoices: false,
          answer: undefined,
        };
        newQuestions = [...currentQuestions, choiceQuestion];
      } else {
        const simpleQuestion: SimpleSelectedQuestion = {
          id: predefinedQuestion.id,
          type: predefinedQuestion.type,
          question: predefinedQuestion.question,
          isRequired: predefinedQuestion.isRequired,
          isMultiple: predefinedQuestion.isMultiple,
          answer:
            predefinedQuestion.type === "experience"
              ? "Aucune expérience requise"
              : undefined,
        };
        newQuestions = [...currentQuestions, simpleQuestion];
      }
    } else {
      return;
    }

    if (isDialog) {
      setLocalQuestions(newQuestions);
    } else {
      setQuestions(newQuestions);
    }
  };

  const handleAddCustomQuestion = (customQuestion: CustomQuestionProps) => {
    const newQuestion = createPredefinedFromCustom(customQuestion);
    const baseQuestion = {
      ...newQuestion,
      answer: undefined,
    };

    const typedQuestion =
      newQuestion.type === "choice"
        ? {
            ...baseQuestion,
            type: "choice" as const,
            options: newQuestion.options || [],
            isMultipleChoices: newQuestion.isMultiple,
          }
        : {
            ...baseQuestion,
            type: newQuestion.type as "experience" | "open" | "yesno",
          };

    if (isDialog) {
      setLocalQuestions([...localQuestions, typedQuestion]);
    } else {
      setQuestions([...questions, typedQuestion]);
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    if (isDialog) {
      setLocalQuestions(localQuestions.filter((q) => q.id !== questionId));
    } else {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
  };

  const handleQuestionChange = (questionId: string, value: QuestionAnswer) => {
    if (isDialog) {
      setLocalQuestions(
        localQuestions.map((q) =>
          q.id === questionId ? { ...q, answer: value } : q
        )
      );
    } else {
      setQuestions(
        questions.map((q) =>
          q.id === questionId ? { ...q, answer: value } : q
        )
      );
    }
  };

  const handleRequiredChange = (questionId: string, required: boolean) => {
    if (isDialog) {
      setLocalQuestions(
        localQuestions.map((q) =>
          q.id === questionId ? { ...q, isRequired: required } : q
        )
      );
    } else {
      setQuestions(
        questions.map((q) =>
          q.id === questionId ? { ...q, isRequired: required } : q
        )
      );
    }
  };

  const handleMultipleChoicesChange = (
    questionId: string,
    multiple: boolean
  ) => {
    if (isDialog) {
      setLocalQuestions(
        localQuestions.map((q) =>
          q.id === questionId && q.type === "choice"
            ? ({ ...q, isMultipleChoices: multiple } as ChoiceSelectedQuestion)
            : q
        )
      );
    } else {
      setQuestions(
        questions.map((q) =>
          q.id === questionId && q.type === "choice"
            ? ({ ...q, isMultipleChoices: multiple } as ChoiceSelectedQuestion)
            : q
        )
      );
    }
  };

  // * Function to check if a predefined question can be added
  const canAddQuestion = (question: PredefinedQuestion) => {
    const currentQuestions = isDialog ? localQuestions : questions;
    if (currentQuestions.length >= MAX_QUESTIONS) return false;
    return (
      question.isMultiple || !currentQuestions.some((q) => q.id === question.id)
    );
  };

  const handleSave = () => {
    // const questionsToValidate = isDialog ? localQuestions : questions;

    // if (questionsToValidate.length === 0) {
    //   toast({
    //     variant: "destructive",
    //     title: "Validation",
    //     description: "Veuillez ajouter au moins une question",
    //   });
    //   return;
    // }

    if (isDialog) {
      setQuestions(localQuestions); // Update the store with local questions
    }

    toast({
      title: "Questions enregistrées",
      description: "Les questions ont été enregistrées avec succès.",
      variant: "success",
    });

    if (isDialog) {
      onDialogClose?.();
    } else {
      nextStep();
    }
  };

  // Initialize local questions when dialog opens
  useEffect(() => {
    if (isDialog) {
      setLocalQuestions(questions);
    }
  }, [isDialog, questions]);

  return (
    <>
      <FloatingScrollButton />
      <div className="container max-w-4xl mx-auto py-8 space-y-8">
        {!isDialog && (
          <HeaderSectionStepsForm
            title="Questions pour les candidats"
            description={`Ajoutez des questions pour mieux évaluer les candidats (maximum ${MAX_QUESTIONS} questions)`}
          />
        )}

        {/* Card for adding predefined and custom questions */}
        <Card className="p-6">
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
            {/* Render predefined questions as buttons */}
            {PREDEFINED_QUESTIONS.map((question) => (
              <Button
                key={question.id}
                variant="ghost"
                className="h-auto py-4 px-6 flex items-start gap-3 justify-start rounded-full hover:bg-primaryHex-50 dark:hover:bg-primaryHex-900/50
                overflow-hidden text-wrap"
                onClick={() => handleAddQuestion(question.id)}
                disabled={!canAddQuestion(question)}
              >
                <div className="w-8 h-8 rounded-full bg-primaryHex-100 dark:bg-primaryHex-900 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4 text-primaryHex-500" />
                </div>
                <span className="font-medium justify-center items-center text-center">
                  {question.question}
                  {question.isMultiple && (
                    <span className="block text-xs text-muted-foreground ">
                      (Peut être ajoutée plusieurs fois)
                    </span>
                  )}
                </span>
              </Button>
            ))}
            {/* Custom question dialog for adding new questions */}
            <CustomQuestionDialog
              onAddQuestion={handleAddCustomQuestion}
              disabled={
                (isDialog ? localQuestions : questions).length >= MAX_QUESTIONS
              }
            />
          </div>
        </Card>

        {/* Display selected questions if any */}
        {(isDialog ? localQuestions : questions).length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Questions sélectionnées</h3>
              <span className="text-sm text-muted-foreground">
                {(isDialog ? localQuestions : questions).length} /{" "}
                {MAX_QUESTIONS} questions
              </span>
            </div>
            {/* Render selected questions with remove button */}
            <div className="space-y-8">
              {(isDialog ? localQuestions : questions).map(
                (question, index) => (
                  <div
                    key={question.id}
                    className="relative"
                    ref={
                      index ===
                      (isDialog ? localQuestions : questions).length - 1
                        ? lastQuestionRef
                        : null
                    }
                  >
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
                      onRemove={() => handleRemoveQuestion(question.id)}
                    />
                  </div>
                )
              )}
            </div>
          </Card>
        )}

        {/* Navigation buttons */}
        {isDialog ? (
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onDialogClose}>
              Annuler
            </Button>
            <Button onClick={handleSave}>Enregistrer les modifications</Button>
          </div>
        ) : (
          <FormStepsNavigation
            onPrevious={previousStep}
            onNext={handleSave}
            canProceed={canProceed()}
            showPreview={true}
          />
        )}
      </div>
    </>
  );
}
