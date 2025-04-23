/**
 * SearchSkillSelect - Searchable skill selection component
 *
 * Provides a searchable dropdown for skill selection with data from the API
 * Supports both existing skills selection and adding new custom skills
 */

"use client";

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
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useSkills } from "@/hooks/use-skills";
import LoaderOne from "@/components/ui/loader-one";
import { useTranslations } from "next-intl";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Skills } from "@/core/interfaces";

interface SearchSkillSelectProps {
  value?: string;
  onChange: (value: string) => void;
  onAddNewSkill?: (skillName: string) => void;
  error?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  selectedSkill?: Skills;
}

export function SearchSkillSelect({
  value,
  onChange,
  onAddNewSkill,
  error,
  disabled,
  label,
  required,
  selectedSkill,
}: SearchSkillSelectProps) {
  const t = useTranslations("common");

  // Search state
  const [search, setSearch] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 600);

  // Fetch skills data
  const { data: skills, isLoading } = useSkills(debouncedSearch);

  function handleAddNewSkill() {
    if (!search.trim() || !onAddNewSkill) return;
    onAddNewSkill(search.trim());
    setSearch("");
    setCommandOpen(false);
  }

  const selectedSkillName = useMemo(
    () => skills?.find((s) => s.uuid === value)?.name ?? selectedSkill?.name,
    [skills, value, selectedSkill?.name]
  );

  return (
    <FormItem>
      {label && (
        <FormLabel>
          {t(label)}{" "}
          {required && (
            <span className="text-destructive">{t("form.required")}</span>
          )}
        </FormLabel>
      )}
      <Popover open={commandOpen} onOpenChange={setCommandOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={commandOpen}
              className={cn(
                "w-full justify-between",
                !value && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              {selectedSkillName ?? t("exSkill")}
              {isLoading ? (
                <LoaderOne />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={t("searchSkill")}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty className="py-6 text-center">
                {isLoading ? (
                  t("searching")
                ) : onAddNewSkill ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-center gap-2"
                    onClick={handleAddNewSkill}
                  >
                    <Plus className="h-4 w-4" />
                    {t("addNew", { name: search })}
                  </Button>
                ) : (
                  t("noVarFound", { variable: "skills" })
                )}
              </CommandEmpty>
              <CommandGroup>
                {skills?.map((s) => (
                  <CommandItem
                    key={s.uuid}
                    value={s.uuid}
                    onSelect={(value) => {
                      onChange(value);
                      setCommandOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === s.uuid ? "opacity-100" : "opacity-0"
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
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
}
