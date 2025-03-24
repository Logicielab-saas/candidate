/**
 * ChoiceQuestion - Component for selection type questions
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
import { Label } from "@/components/ui/label";
import { type QuestionFormData } from "@/features/job-apply/types/question-form";

interface Option {
  value: string;
}

interface ChoiceQuestionProps {
  question: {
    id: string;
    title: string;
    description?: string;
    isRequired: boolean;
    isMultipleChoices: boolean;
    options: Option[];
  };
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
            {question.isMultipleChoices ? (
              // Checkboxes for multiple choices
              <div className="grid gap-4">
                {question.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`${question.id}-${option.value}`}
                      checked={(field.value || []).includes(option.value)}
                      onCheckedChange={(checked) => {
                        const currentValue = (field.value || []) as string[];
                        if (checked) {
                          field.onChange([...currentValue, option.value]);
                        } else {
                          field.onChange(
                            currentValue.filter(
                              (value) => value !== option.value
                            )
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`${question.id}-${option.value}`}>
                      {option.value}
                    </Label>
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
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${question.id}-${option.value}`}
                    />
                    <Label htmlFor={`${question.id}-${option.value}`}>
                      {option.value}
                    </Label>
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
