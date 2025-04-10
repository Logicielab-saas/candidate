/**
 * AddSkillDialog - Dialog for adding new skills to the resume
 *
 * Features:
 * - Skill selection via searchable combobox
 * - Option to add new skills when not found
 * - Tags-style multiple skills support
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
import { useCreateResumeSkill } from "../../hooks/use-resume-skill";
import { PROFICIENCY_OPTIONS } from "../../constants/skill-proficiency";
import { X, Check, ChevronsUpDown, LoaderPinwheel, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Badge } from "@/components/ui/badge";

interface SelectedSkill {
  uuid?: string;
  name: string;
  level: string;
}

const formSchema = z.object({
  skill_uuid: z.string().optional(),
  resumeskill_level: z.string({
    required_error: "Please select a proficiency level",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSkillDialog({ open, onOpenChange }: AddSkillDialogProps) {
  // Search state
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 600);
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);

  // Queries and mutations
  const { data: skills, isLoading } = useSkills(debouncedSearch);
  const { mutate: createSkill, isPending } = useCreateResumeSkill();

  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

    // Add to selected skills
    const skillToAdd = skills?.find((s) => s.uuid === values.skill_uuid);
    if (!skillToAdd) return;

    // Check for duplicates
    if (isSkillNameDuplicate(skillToAdd.name)) {
      form.setError("skill_uuid", {
        type: "manual",
        message: "This skill has already been added",
      });
      return;
    }

    setSelectedSkills((prev) => [
      ...prev,
      {
        uuid: values.skill_uuid,
        name: skillToAdd.name,
        level: values.resumeskill_level,
      },
    ]);

    // Reset form
    form.reset({
      skill_uuid: undefined,
      resumeskill_level: values.resumeskill_level, // Keep the same level for convenience
    });
  }

  function handleAddNewSkill() {
    if (!search.trim()) return;

    const newSkillName = search.trim();

    // Check for duplicates
    if (isSkillNameDuplicate(newSkillName)) {
      form.setError("skill_uuid", {
        type: "manual",
        message: "This skill has already been added",
      });
      return;
    }

    setSelectedSkills((prev) => [
      ...prev,
      {
        name: newSkillName,
        level: form.getValues("resumeskill_level") || "1",
      },
    ]);

    setSearch("");
    setCommandOpen(false);
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
          <DialogTitle>Add Skills</DialogTitle>
          <DialogDescription>
            Add new skills to your profile. Search for existing skills or add
            new ones if not found.
          </DialogDescription>
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
                <FormItem>
                  <FormLabel>Select Skill</FormLabel>
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
                          {skills?.find((s) => s.uuid === field.value)?.name ??
                            "Select skill..."}
                          {isLoading ? (
                            <LoaderPinwheel className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />
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
                          <CommandEmpty className="py-6 text-center">
                            {isLoading ? (
                              "Searching..."
                            ) : (
                              <Button
                                variant="ghost"
                                className="w-full justify-center gap-2"
                                onClick={handleAddNewSkill}
                              >
                                <Plus className="h-4 w-4" />
                                Add
                                <span className="font-bold text-primary">
                                  &quot;{search}&quot;{" "}
                                </span>
                                as a new skill
                              </Button>
                            )}
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

            <div className="flex justify-between items-center pt-4">
              <Button
                type="submit"
                className="text-white bg-primaryHex-600 hover:bg-primary/90"
                disabled={isPending || !form.watch("skill_uuid")}
              >
                Add to List
              </Button>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={isPending || selectedSkills.length === 0}
                  onClick={handleSave}
                >
                  {isPending ? "Saving..." : "Save All"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
