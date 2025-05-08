/**
 * EditQuestionsDialog - Dialog for editing question answers in review step
 */

"use client";

import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { type SubmissionQuestion } from "@/core/mockData/annonces";
import { isChoiceQuestion, type ChoiceQuestionWithId } from "@/core/types";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

interface EditQuestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: SubmissionQuestion[];
}

export function EditQuestionsDialog({
  open,
  onOpenChange,
  questions,
}: EditQuestionsDialogProps) {
  const tCommon = useTranslations("common");
  const { questionsData, setQuestionsData } = useJobApplyStore();
  const { toast } = useToast();

  // Filter out questions without IDs - memoized to prevent recreation
  const validQuestions = useMemo(
    () =>
      questions.filter((q): q is SubmissionQuestion & { id: string } =>
        Boolean(q.id)
      ),
    [questions]
  );

  // Create schema - memoized to prevent recreation
  const schema = useMemo(
    () =>
      z.object({
        answers: z.object(
          validQuestions.reduce((acc, question) => {
            if (!question.id) return acc;

            if (question.type === "selection" && question.isMultipleChoices) {
              acc[question.id] = question.isRequired
                ? z.array(z.string()).min(1, tCommon("selectAtLeastOne"))
                : z.array(z.string()).default([]);
            } else {
              acc[question.id] = question.isRequired
                ? z.string().min(1, tCommon("validation.required"))
                : z.string().default("");
            }
            return acc;
          }, {} as Record<string, z.ZodTypeAny>)
        ),
      }),
    [validQuestions, tCommon]
  );

  type FormData = z.infer<typeof schema>;

  // Initialize form with memoized default values
  const defaultValues = useMemo(
    () => ({
      answers: validQuestions.reduce((acc, question) => {
        const existingAnswer = questionsData.answers.find(
          (a) => a.id === question.id
        )?.answer;
        acc[question.id] =
          existingAnswer ||
          (question.type === "selection" && question.isMultipleChoices
            ? []
            : "");
        return acc;
      }, {} as Record<string, string | string[]>),
    }),
    [validQuestions, questionsData.answers]
  );

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [open, form, defaultValues]);

  const onSubmit = (data: FormData) => {
    const answers = Object.entries(data.answers).map(([id, answer]) => ({
      id,
      answer: answer as string | string[],
    }));

    setQuestionsData({ answers });
    toast({
      variant: "success",
      title: tCommon("answersUpdated"),
      description: tCommon("answersUpdatedDescription"),
    });
    onOpenChange(false);
  };

  const renderQuestion = (question: SubmissionQuestion & { id: string }) => {
    switch (question.type) {
      case "experience":
        return (
          <FormField
            key={question.id}
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
                  <Input placeholder={tCommon("yourExperience")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "open":
        return (
          <FormField
            key={question.id}
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
                    placeholder={tCommon("yourAnswer")}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "selection":
        if (!isChoiceQuestion(question)) return null;

        const choiceQuestion = question as ChoiceQuestionWithId;

        return (
          <FormField
            key={choiceQuestion.id}
            control={form.control}
            name={`answers.${choiceQuestion.id}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {choiceQuestion.question}
                  {choiceQuestion.isRequired && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </FormLabel>
                <FormControl>
                  {choiceQuestion.isMultipleChoices ? (
                    <div className="grid gap-4">
                      {choiceQuestion.options.map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${choiceQuestion.id}-${option}`}
                            checked={(field.value || []).includes(option)}
                            onCheckedChange={(checked) => {
                              const currentValue = (field.value ||
                                []) as string[];
                              if (checked) {
                                field.onChange([...currentValue, option]);
                              } else {
                                field.onChange(
                                  currentValue.filter(
                                    (value) => value !== option
                                  )
                                );
                              }
                            }}
                          />
                          <Label htmlFor={`${choiceQuestion.id}-${option}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value as string}
                      className="grid gap-4"
                    >
                      {choiceQuestion.options.map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${choiceQuestion.id}-${option}`}
                          />
                          <Label htmlFor={`${choiceQuestion.id}-${option}`}>
                            {option}
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

      case "yes_no":
        return (
          <FormField
            key={question.id}
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
                      <Label htmlFor={`${question.id}-yes`}>
                        {tCommon("yes")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`${question.id}-no`} />
                      <Label htmlFor={`${question.id}-no`}>
                        {tCommon("no")}
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{tCommon("editQuestions")}</DialogTitle>
              <DialogDescription>
                {tCommon("editQuestionsDescription")}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {validQuestions.map((question) => renderQuestion(question))}

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    {tCommon("actions.cancel")}
                  </Button>
                  <Button type="submit">{tCommon("actions.save")}</Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
