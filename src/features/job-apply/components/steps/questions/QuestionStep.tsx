/**
 * QuestionStep - Main component for job application questions
 *
 * Manages different types of questions and their answers
 * Validates required questions before allowing to proceed
 */

"use client";

import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ExperienceQuestion } from "./ExperienceQuestion";
import { OpenQuestion } from "./OpenQuestion";
import { ChoiceQuestion } from "./ChoiceQuestion";
import { YesNoQuestion } from "./YesNoQuestion";
import { SubmissionQuestion } from "@/core/mockData/annonces";
import { type BaseQuestionWithId, isChoiceQuestion } from "@/core/types";

interface QuestionStepProps {
  questions: SubmissionQuestion[];
}

// Create a dynamic schema based on the questions
const createQuestionSchema = (questions: BaseQuestionWithId[]) => {
  const answerFields: Record<string, z.ZodTypeAny> = {};

  questions.forEach((question) => {
    if (question.type === "choice" && question.isMultipleChoices) {
      answerFields[question.id] = question.isRequired
        ? z.array(z.string()).min(1, "Sélectionnez au moins une option")
        : z.array(z.string()).default([]);
    } else {
      answerFields[question.id] = question.isRequired
        ? z.string().min(1, "Ce champ est requis")
        : z.string().default("");
    }
  });

  return z.object({
    answers: z.object(answerFields),
  });
};

export function QuestionStep({ questions }: QuestionStepProps) {
  const {
    questionsData,
    setQuestionsData,
    nextStep,
    prevStep,
    resumeData,
    personalInfo,
  } = useJobApplyStore();

  // Filter out questions without IDs
  const validQuestions = questions.filter((q): q is BaseQuestionWithId =>
    Boolean(q.id)
  );

  const schema = createQuestionSchema(validQuestions);
  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      answers: validQuestions.reduce((acc, question) => {
        const existingAnswer = questionsData.answers.find(
          (a) => a.id === question.id
        )?.answer;
        acc[question.id] =
          existingAnswer ||
          (question.type === "choice" && question.isMultipleChoices ? [] : "");
        return acc;
      }, {} as Record<string, string | string[]>),
    },
  });

  const onSubmit = (data: FormData) => {
    // Transform the form data into the expected format
    const answers = Object.entries(data.answers).map(([id, answer]) => ({
      id,
      answer: answer as string | string[],
    }));

    // Log current step data
    console.log("Current Step (Questions):", answers);

    // Update store
    setQuestionsData({ answers });

    // Prepare global application data with all steps
    const globalData = {
      // Include resume data based on its state
      resume: resumeData.skipped
        ? { skipped: true }
        : {
            selectedCVType: resumeData.selectedCVType,
            ...(resumeData.selectedCVType === "postuly"
              ? { postulyCVPath: resumeData.postulyCVPath }
              : { resumePath: resumeData.resumePath }),
          },
      // Include personal info data
      personalInfo: Object.entries(personalInfo).reduce(
        (acc: Record<string, string>, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        },
        {}
      ),
      // Include current questions data
      questions: answers,
    };

    // Log complete global application data
    console.log("Global Application Data:", globalData);

    nextStep();
  };

  const renderQuestion = (question: BaseQuestionWithId) => {
    switch (question.type) {
      case "experience":
        return (
          <ExperienceQuestion
            key={question.id}
            question={question}
            form={form}
          />
        );
      case "open":
        return (
          <OpenQuestion key={question.id} question={question} form={form} />
        );
      case "choice":
        // Only render choice question if it has options
        return isChoiceQuestion(question) ? (
          <ChoiceQuestion key={question.id} question={question} form={form} />
        ) : null;
      case "yesno":
        return (
          <YesNoQuestion key={question.id} question={question} form={form} />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Questions</CardTitle>
        <CardDescription>
          Répondez aux questions suivantes concernant votre candidature
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {validQuestions.map((question) => renderQuestion(question))}
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>

            <Button
              type="submit"
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              Continuer
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
