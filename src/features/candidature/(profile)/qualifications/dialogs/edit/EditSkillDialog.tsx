/**
 * EditSkillDialog - Dialog for editing an existing skill in the resume
 *
 * Features:
 * - Skill selection via searchable combobox
 * - Level selection
 * - Form validation
 * - Loading states
 */

"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSkills } from "@/hooks/use-skills";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useUpdateResumeSkill } from "../../hooks/use-resume-skill";
import { PROFICIENCY_OPTIONS } from "../../constants/skill-proficiency";
import type { ResumeSkill } from "@/core/interfaces";

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  skill_uuid: z.string({
    required_error: "Please select a skill",
  }),
  resumeskill_level: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

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
  // Search state
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 600); // 600ms debounce
  const [commandOpen, setCommandOpen] = useState(false);

  // Queries and mutations
  const { data: skills, isLoading } = useSkills(debouncedSearch);
  const { mutate: updateSkill, isPending } = useUpdateResumeSkill();

  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill_uuid: skill.skill_uuid || undefined,
      resumeskill_level: skill.resumeskill_level || undefined,
    },
  });

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

  const selectedSkill = skills?.find(
    (s) => s.uuid === form.watch("skill_uuid")
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Skill</DialogTitle>
          <DialogDescription>
            Update your skill proficiency level.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="skill_uuid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill</FormLabel>
                  <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={commandOpen}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isPending}
                        >
                          {selectedSkill?.name ?? "Select skill..."}
                          {isLoading ? (
                            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                          ) : (
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder="Search skills..."
                          value={search}
                          onValueChange={setSearch}
                        />
                        <CommandList>
                          <CommandEmpty>
                            {isLoading ? "Searching..." : "No skills found."}
                          </CommandEmpty>
                          <CommandGroup>
                            {skills?.map((s) => (
                              <CommandItem
                                key={s.uuid}
                                value={s.uuid}
                                onSelect={(value) => {
                                  form.setValue("skill_uuid", value);
                                  setCommandOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === s.uuid
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {s.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resumeskill_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select proficiency level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROFICIENCY_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                        >
                          {option.label}
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
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !form.watch("skill_uuid")}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
