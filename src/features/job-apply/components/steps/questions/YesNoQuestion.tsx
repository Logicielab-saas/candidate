/**
 * YesNoQuestion - Component for yes/no type questions
 *
 * Displays a question with radio buttons for yes/no answers
 */

"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { type BaseQuestionWithId } from "@/core/types";
import { type QuestionFormData } from "@/core/interfaces";
import { Label } from "@/components/ui/label";

interface YesNoQuestionProps {
  question: BaseQuestionWithId;
  form: UseFormReturn<QuestionFormData>;
}

export function YesNoQuestion({ question, form }: YesNoQuestionProps) {
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
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value as string}
              className="grid grid-cols-2 gap-4 max-w-[400px]"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                <Label htmlFor={`${question.id}-yes`}>Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${question.id}-no`} />
                <Label htmlFor={`${question.id}-no`}>Non</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
