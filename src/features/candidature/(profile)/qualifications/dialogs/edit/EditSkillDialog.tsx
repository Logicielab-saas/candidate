/**
 * EditSkillDialog - Dialog for editing an existing skill in the resume
 */

"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateResumeSkill } from "../../hooks/use-resume-skill";
import { PROFICIENCY_OPTIONS } from "../../constants/skill-proficiency";
import type { ResumeSkill } from "@/core/interfaces";
import { useTranslations } from "next-intl";
import { SearchSkillSelect } from "@/components/shared/SearchSkillSelect";
import { useEffect } from "react";
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

const formSchema = (t: (key: string) => string) =>
  z.object({
    skill_uuid: z.string({
      required_error: t("validation.required"),
    }),
    resumeskill_level: z.string().optional(),
  });

type FormValues = z.infer<ReturnType<typeof formSchema>>;

interface EditSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: ResumeSkill;
}

export function EditSkillDialog({
  open,
  onOpenChange,
  skill,
}: EditSkillDialogProps) {
  const t = useTranslations("resumePage.skills.dialog");
  const tCommon = useTranslations("common");

  // Queries and mutations
  const { mutate: updateSkill, isPending } = useUpdateResumeSkill(tCommon);

  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema(tCommon)),
    defaultValues: {
      skill_uuid: skill.skill_uuid || undefined,
      resumeskill_level: skill.resumeskill_level || undefined,
    },
  });

  // Update form when skill changes
  useEffect(() => {
    if (skill) {
      form.reset({
        skill_uuid: skill.skill_uuid || undefined,
        resumeskill_level: skill.resumeskill_level || undefined,
      });
    }
  }, [skill, form]);

  function onSubmit(values: FormValues) {
    updateSkill(
      {
        resume_skills: [
          {
            uuid: skill.uuid,
            skill_uuid: values.skill_uuid,
            resumeskill_level: values.resumeskill_level || null,
          },
        ],
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("edit.title")}</DialogTitle>
          <DialogDescription>{t("edit.description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="skill_uuid"
              render={({ field }) => (
                <SearchSkillSelect
                  value={field.value}
                  onChange={field.onChange}
                  error={form.formState.errors.skill_uuid?.message}
                  disabled={isPending}
                  label="skill"
                  required
                  selectedSkill={
                    skill?.skill_uuid
                      ? {
                          uuid: skill.skill_uuid,
                          name: skill.resumeskill_name || "",
                        }
                      : undefined
                  }
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

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                {tCommon("actions.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isPending || !form.watch("skill_uuid")}
              >
                {isPending
                  ? tCommon("actions.saving")
                  : tCommon("actions.save")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
