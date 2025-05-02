/**
 * QuestionStep - Handles job application questions
 *
 * Displays and manages answers for job-specific questions using different question types
 */

"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import type { EmploisQuestions } from "@/core/interfaces";
import { ChoiceQuestion } from "./questions/ChoiceQuestion";
import { ExperienceQuestion } from "./questions/ExperienceQuestion";
import { OpenQuestion } from "./questions/OpenQuestion";
import { YesNoQuestion } from "./questions/YesNoQuestion";
import type { QuestionFormData } from "@/features/job-apply/types/question-form";
import { StepNavigation } from "../../../../components/shared/StepNavigation";

interface QuestionStepProps {
  questions: EmploisQuestions[];
}

// Create dynamic schema based on questions
function createQuestionSchema(questions: EmploisQuestions[]) {
  const answersSchema: Record<string, z.ZodType> = {};

  questions.forEach((question) => {
    if (question.type === "selection") {
      if (question.is_multiple) {
        answersSchema[question.uuid] = question.is_required
          ? z.array(z.string()).min(1, "Ce champ est requis")
          : z.array(z.string()).optional();
      } else {
        answersSchema[question.uuid] = question.is_required
          ? z.string().min(1, "Ce champ est requis")
          : z.string().optional();
      }
    } else if (question.type === "yes_no") {
      answersSchema[question.uuid] = question.is_required
        ? z.enum(["yes", "no"], { required_error: "Ce champ est requis" })
        : z.enum(["yes", "no"]).optional();
    } else {
      answersSchema[question.uuid] = question.is_required
        ? z.string().min(1, "Ce champ est requis")
        : z.string().optional();
    }
  });

  return z.object({
    answers: z.object(answersSchema),
  });
}

export function QuestionStep({ questions }: QuestionStepProps) {
  const { nextStep, prevStep, questionsData, setQuestionsData } =
    useJobApplyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(createQuestionSchema(questions || [])),
    defaultValues: {
      answers: Object.fromEntries(
        (questions || []).map((question) => [
          question.uuid,
          questionsData.answers.find((a) => a.id === question.uuid)?.answer ||
            (question.type === "selection" && question.is_multiple
              ? []
              : undefined),
        ])
      ),
    },
  });

  // Handle auto-skip when no questions
  useEffect(() => {
    if (!questions?.length) {
      nextStep();
    }
  }, [questions, nextStep]);

  // If no questions, return null immediately
  if (!questions?.length) {
    return null;
  }

  const onSubmit = async (data: QuestionFormData) => {
    setIsSubmitting(true);
    try {
      // Filter out empty answers for non-required fields
      const formattedAnswers = Object.entries(data.answers)
        .filter(([id, answer]) => {
          const question = questions.find((q) => q.uuid === id);
          return (
            question?.is_required || (answer !== "" && answer !== undefined)
          );
        })
        .map(([id, answer]) => ({
          id,
          answer,
        }));

      setQuestionsData({ answers: formattedAnswers });
      nextStep();
    } catch (error) {
      console.error("Error submitting questions:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question: EmploisQuestions) => {
    const baseQuestionProps = {
      id: question.uuid,
      title: question.title,
      description: question.description,
      isRequired: question.is_required,
    };

    switch (question.type) {
      case "selection":
        return (
          <ChoiceQuestion
            key={question.uuid}
            question={{
              ...baseQuestionProps,
              isMultipleChoices: question.is_multiple,
              options: question.options || [],
            }}
            form={form}
          />
        );
      case "experience":
        return (
          <ExperienceQuestion
            key={question.uuid}
            question={baseQuestionProps}
            form={form}
          />
        );
      case "open":
        return (
          <OpenQuestion
            key={question.uuid}
            question={baseQuestionProps}
            form={form}
          />
        );
      case "yes_no":
        return (
          <YesNoQuestion
            key={question.uuid}
            question={baseQuestionProps}
            form={form}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-6">
              Questions supplémentaires
            </h2>
            {questions.map((question) => renderQuestion(question))}
          </CardContent>

          <CardFooter>
            <StepNavigation
              onBack={prevStep}
              onNext={form.handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              continueButtonText="Continuer"
            />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
