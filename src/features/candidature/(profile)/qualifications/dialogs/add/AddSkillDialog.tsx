/**
 * AddSkillDialog - Dialog for adding new skills to the resume
 */

"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useCreateResumeSkill } from "../../hooks/use-resume-skill";
import { PROFICIENCY_OPTIONS } from "../../constants/skill-proficiency";
import { X } from "lucide-react";
import {
  getSkillBadgeStyle,
  getSkillLevelBadgeStyle,
} from "@/core/styles/skill-badge.style";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { SearchSkillSelect } from "@/components/shared/SearchSkillSelect";

interface SelectedSkill {
  uuid?: string;
  name: string;
  level: string;
}

const formSchema = (t: (key: string) => string) =>
  z.object({
    skill_uuid: z.string().optional(),
    resumeskill_level: z.string({
      required_error: t("validation.skillLevelRequired"),
    }),
  });

type FormValues = z.infer<ReturnType<typeof formSchema>>;

interface AddSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSkillDialog({ open, onOpenChange }: AddSkillDialogProps) {
  const t = useTranslations("resumePage.skills.dialog");
  const tCommon = useTranslations("common");

  // Selected skills state
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);

  // Queries and mutations
  const { mutate: createSkill, isPending } = useCreateResumeSkill();

  const skillFormSchema = useMemo(() => formSchema(tCommon), [tCommon]);

  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      skill_uuid: undefined,
      resumeskill_level: undefined,
    },
  });

  function isSkillNameDuplicate(skillName: string): boolean {
    const normalizedName = skillName.toLowerCase();
    return selectedSkills.some(
      (skill) => skill.name.toLowerCase() === normalizedName
    );
  }

  function onSubmit(values: FormValues) {
    if (!values.skill_uuid) return;

    const skillToAdd = {
      uuid: values.skill_uuid,
      name: values.skill_uuid, // Will be updated when skill is found
      level: values.resumeskill_level,
    };

    if (isSkillNameDuplicate(skillToAdd.name)) {
      form.setError("skill_uuid", {
        type: "manual",
        message: tCommon("validation.skillDuplicate"),
      });
      return;
    }

    setSelectedSkills((prev) => [...prev, skillToAdd]);

    form.reset({
      skill_uuid: undefined,
      resumeskill_level: values.resumeskill_level, // Keep the same level for convenience
    });
  }

  function handleAddNewSkill(skillName: string) {
    if (isSkillNameDuplicate(skillName)) {
      form.setError("skill_uuid", {
        type: "manual",
        message: t("validation.skillDuplicate"),
      });
      return;
    }

    setSelectedSkills((prev) => [
      ...prev,
      {
        name: skillName,
        level: form.getValues("resumeskill_level") || "1",
      },
    ]);
  }

  function handleSave() {
    createSkill(
      {
        resume_skills: selectedSkills.map((skill) => ({
          skill_uuid: skill.uuid || null,
          resumeskill_name: !skill.uuid ? skill.name : null,
          resumeskill_level: skill.level || null,
        })),
      },
      {
        onSuccess: () => {
          setSelectedSkills([]);
          onOpenChange(false);
        },
      }
    );
  }

  function removeSkill(index: number) {
    setSelectedSkills((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("add.title")}</DialogTitle>
          <DialogDescription>{t("add.description")}</DialogDescription>
        </DialogHeader>

        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-muted/50">
            {selectedSkills.map((skill, index) => (
              <div key={index} className={getSkillBadgeStyle()}>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-medium truncate max-w-[150px]">
                    {skill.name}
                  </span>
                  <Badge
                    variant="secondary"
                    className={getSkillLevelBadgeStyle(Number(skill.level))}
                  >
                    {
                      PROFICIENCY_OPTIONS.find(
                        (opt) => opt.value.toString() === skill.level
                      )?.label
                    }
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeSkill(index)}
                  >
                    <X className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="skill_uuid"
              render={({ field }) => (
                <SearchSkillSelect
                  value={field.value}
                  onChange={field.onChange}
                  onAddNewSkill={handleAddNewSkill}
                  error={form.formState.errors.skill_uuid?.message}
                  disabled={isPending}
                  label="skill"
                />
              )}
            />

            <FormField
              control={form.control}
              name="resumeskill_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tCommon("skillLevel")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={tCommon("exSkillLevel")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROFICIENCY_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                        >
                          {tCommon(option.label)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center pt-4">
              <Button
                type="submit"
                className="text-white bg-primaryHex-600 hover:bg-primary/90"
                disabled={isPending || !form.watch("skill_uuid")}
              >
                {tCommon("addToList")}
              </Button>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isPending}
                >
                  {tCommon("actions.cancel")}
                </Button>
                <Button
                  type="button"
                  disabled={isPending || selectedSkills.length === 0}
                  onClick={handleSave}
                >
                  {isPending
                    ? tCommon("actions.saving")
                    : tCommon("actions.saveAll")}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
