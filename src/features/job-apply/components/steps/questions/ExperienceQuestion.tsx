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
import { type BaseQuestionWithId } from "@/core/types";
import { type QuestionFormData } from "@/core/interfaces";

interface ExperienceQuestionProps {
  question: BaseQuestionWithId;
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
            {question.label}
            {question.isRequired && (
              <span className="text-destructive ml-1">*</span>
            )}
          </FormLabel>
          <div className="text-sm text-muted-foreground mb-2">
            {question.question}
          </div>
          <FormControl>
            <Input placeholder="Votre expérience..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
