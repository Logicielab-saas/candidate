import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type JobDetails } from "@/core/mockData/annonces";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface AnnonceQuestionsProps {
  annonce: JobDetails;
}

export function AnnonceQuestions({ annonce }: AnnonceQuestionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {annonce.questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <Label
              htmlFor={question.id}
              className={cn(
                "block text-base",
                question.isRequired &&
                  "after:content-['*'] after:ml-1 after:text-destructive"
              )}
            >
              {question.question}
            </Label>

            {/* Text Input */}
            {(question.type === "experience" || question.type === "open") && (
              <Input
                id={question.id}
                type="text"
                placeholder="Votre réponse"
                required={question.isRequired}
              />
            )}

            {/* Textarea for long text responses */}
            {question.type === "experience" && question.isMultipleChoices && (
              <Textarea
                id={question.id}
                placeholder="Votre réponse"
                required={question.isRequired}
                className="min-h-[100px]"
              />
            )}

            {/* Multiple Choice */}
            {question.type === "choice" && question.options && (
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
            {question.type === "yesno" && (
              <RadioGroup
                id={question.id}
                className="space-y-2"
                required={question.isRequired}
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
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
