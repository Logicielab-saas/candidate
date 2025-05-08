import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type JobDetails } from "@/core/mockData/annonces";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface AnnonceQuestionsProps {
  annonce: JobDetails;
}

export function AnnonceQuestions({ annonce }: AnnonceQuestionsProps) {
  const tCommon = useTranslations("common");
  const t = useTranslations("annonces");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tCommon("labels.questions")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {annonce.questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <Label
              htmlFor={question.id}
              className={cn(
                "block text-base",
                question.isRequired &&
                  `after:content-['${tCommon(
                    "form.required"
                  )}'] after:ml-1 after:text-destructive`
              )}
            >
              {question.question}
            </Label>

            {/* Text Input */}
            {(question.type === "experience" || question.type === "open") && (
              <Input
                id={question.id}
                type="text"
                placeholder={
                  question.type === "experience"
                    ? t("details.questions.types.experience.placeholder")
                    : t("details.questions.types.open.placeholder")
                }
                required={question.isRequired}
              />
            )}

            {/* Textarea for long text responses */}
            {question.type === "experience" && question.isMultipleChoices && (
              <Textarea
                id={question.id}
                placeholder={tCommon("form.placeholders.longAnswer")}
                required={question.isRequired}
                className="min-h-[100px]"
              />
            )}

            {/* Multiple Choice */}
            {question.type === "selection" && question.options && (
              <RadioGroup
                id={question.id}
                className="space-y-2"
                required={question.isRequired}
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

            {/* Yes/No */}
            {question.type === "yes_no" && (
              <RadioGroup
                id={question.id}
                className="space-y-2"
                required={question.isRequired}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                  <Label htmlFor={`${question.id}-yes`}>
                    {tCommon("actions.yes")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`${question.id}-no`} />
                  <Label htmlFor={`${question.id}-no`}>
                    {tCommon("actions.no")}
                  </Label>
                </div>
              </RadioGroup>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
