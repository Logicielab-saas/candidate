/**
 * ChoiceQuestion - Component for choice type questions
 *
 * Displays a question with radio buttons or checkboxes based on isMultipleChoices
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
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { type ChoiceQuestionWithId } from "@/core/types";
import { type QuestionFormData } from "@/core/interfaces";
import { Label } from "@/components/ui/label";

interface ChoiceQuestionProps {
  question: ChoiceQuestionWithId;
  form: UseFormReturn<QuestionFormData>;
}

export function ChoiceQuestion({ question, form }: ChoiceQuestionProps) {
  if (!question.options.length) return null;

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
            {question.isMultipleChoices ? (
              // Checkboxes for multiple choices
              <div className="grid gap-4">
                {question.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${option}`}
                      checked={(field.value || []).includes(option)}
                      onCheckedChange={(checked) => {
                        const currentValue = (field.value || []) as string[];
                        if (checked) {
                          field.onChange([...currentValue, option]);
                        } else {
                          field.onChange(
                            currentValue.filter((value) => value !== option)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            ) : (
              // Radio group for single choice
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value as string}
                className="grid gap-4"
              >
                {question.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option}
                      id={`${question.id}-${option}`}
                    />
                    <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
