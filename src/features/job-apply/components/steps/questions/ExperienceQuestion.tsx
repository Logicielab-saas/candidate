/**
 * ExperienceQuestion - Component for experience type questions
 *
 * Displays a question about experience with a label and input field
 */

"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { type QuestionFormData } from "@/features/job-apply/types/question-form";

interface ExperienceQuestionProps {
  question: {
    id: string;
    title: string;
    description?: string;
    isRequired: boolean;
  };
  form: UseFormReturn<QuestionFormData>;
}

export function ExperienceQuestion({
  question,
  form,
}: ExperienceQuestionProps) {
  return (
    <FormField
      control={form.control}
      name={`answers.${question.id}`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {question.title}
            {question.isRequired && (
              <span className="text-destructive ml-1">*</span>
            )}
          </FormLabel>
          {question.description && (
            <p className="text-sm text-muted-foreground mb-4">
              {question.description}
            </p>
          )}
          <FormControl>
            <Input placeholder="Votre expérience..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
