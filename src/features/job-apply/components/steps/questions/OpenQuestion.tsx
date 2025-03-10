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
import { type BaseQuestionWithId } from "@/core/types";
import { type QuestionFormData } from "@/core/interfaces";

interface OpenQuestionProps {
  question: BaseQuestionWithId;
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
            {question.question}
            {question.isRequired && (
              <span className="text-destructive ml-1">*</span>
            )}
          </FormLabel>
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
