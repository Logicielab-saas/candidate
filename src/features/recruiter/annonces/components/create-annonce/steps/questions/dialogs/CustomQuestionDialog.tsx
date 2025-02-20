"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { QuestionType } from "@/features/recruiter/annonces/common/interfaces/questions.interface";
import { Plus } from "lucide-react";

type CustomQuestionType = Exclude<QuestionType, "experience">;

interface CustomQuestionDialogProps {
  onAddQuestion: (question: {
    type: CustomQuestionType;
    label: string;
    isRequired: boolean;
    isMultipleChoices?: boolean;
    options?: string[];
  }) => void;
  disabled?: boolean;
}

export function CustomQuestionDialog({
  onAddQuestion,
  disabled = false,
}: CustomQuestionDialogProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<CustomQuestionType | "">("");
  const [label, setLabel] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [isMultipleChoices, setIsMultipleChoices] = useState(false);
  const [options, setOptions] = useState<string[]>([""]);

  const resetForm = () => {
    setType("");
    setLabel("");
    setIsRequired(false);
    setIsMultipleChoices(false);
    setOptions([""]);
  };

  const handleSubmit = () => {
    if (!type || !label.trim()) return;

    onAddQuestion({
      type,
      label: label.trim(),
      isRequired,
      ...(type === "choice" && {
        isMultipleChoices,
        options: options.filter((opt) => opt.trim() !== ""),
      }),
    });

    setOpen(false);
    resetForm();
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto py-4 px-6 flex items-center gap-3 justify-start rounded-full hover:bg-primaryHex-50 dark:hover:bg-primaryHex-900/50 w-full"
          disabled={disabled}
        >
          <div className="w-8 h-8 rounded-full bg-primaryHex-100 dark:bg-primaryHex-900 flex items-center justify-center flex-shrink-0">
            <Plus className="w-4 h-4 text-primaryHex-500" />
          </div>
          <span className="text-left font-medium">
            Ajouter une question personnalisée
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Créer une question personnalisée</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Type de question</Label>
            <Select
              value={type}
              onValueChange={(value: CustomQuestionType) => setType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Question ouverte</SelectItem>
                <SelectItem value="choice">Choix multiples</SelectItem>
                <SelectItem value="yesno">Oui/Non</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Question</Label>
            <Textarea
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Saisissez votre question..."
            />
          </div>

          {type === "choice" && (
            <div className="space-y-4">
              <Label>Options</Label>
              {options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  {options.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOption(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddOption}
                className="w-full"
              >
                Ajouter une option
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={isRequired}
                onCheckedChange={(checked) => setIsRequired(checked as boolean)}
              />
              <Label htmlFor="required">Question obligatoire</Label>
            </div>

            {type === "choice" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="multiple"
                  checked={isMultipleChoices}
                  onCheckedChange={(checked) =>
                    setIsMultipleChoices(checked as boolean)
                  }
                />
                <Label htmlFor="multiple">Choix multiples</Label>
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={
              !type ||
              !label.trim() ||
              (type === "choice" && options.every((opt) => !opt.trim()))
            }
            className="w-full"
          >
            Ajouter la question
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
