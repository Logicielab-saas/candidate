/**
 * OpenQuestion - Component for open type questions
 *
 * Displays a question with a text input field for free-form answers
 */

"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { type QuestionFormData } from "@/features/job-apply/types/question-form";

interface OpenQuestionProps {
  question: {
    id: string;
    title: string;
    description?: string;
    isRequired: boolean;
  };
  form: UseFormReturn<QuestionFormData>;
}

export function OpenQuestion({ question, form }: OpenQuestionProps) {
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
            <Textarea
              placeholder="Votre réponse..."
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
