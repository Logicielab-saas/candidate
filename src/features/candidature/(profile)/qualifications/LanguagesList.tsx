/**
 * LanguagesList - Component for displaying and managing user's language proficiencies
 *
 * Displays a list of languages with their proficiency levels and allows adding, editing,
 * and deleting language entries.
 */

"use client";

import { Languages as LanguagesIcon, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ResumeLanguage } from "@/core/interfaces";
import { SectionHeader } from "./SectionHeader";
import {
  getProficiencyLabel,
  isValidProficiencyLevel,
} from "./constants/language-proficiency";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
import LoaderOne from "@/components/ui/loader-one";

// Dynamically import dialogs with loading states
const AddLanguageDialog = dynamic(
  () =>
    import("./dialogs/add/AddLanguageDialog").then(
      (mod) => mod.AddLanguageDialog
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

const EditLanguageDialog = dynamic(
  () =>
    import("./dialogs/edit/EditLanguageDialog").then(
      (mod) => mod.EditLanguageDialog
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

const DeleteLanguageDialog = dynamic(
  () =>
    import("./dialogs/delete/DeleteLanguageDialog").then(
      (mod) => mod.DeleteLanguageDialog
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

interface LanguagesListProps {
  resumeLanguages: ResumeLanguage[] | null;
}

export function LanguagesList({ resumeLanguages }: LanguagesListProps) {
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const [languageToEdit, setLanguageToEdit] = useState<ResumeLanguage | null>(
    null
  );
  const [languageToDelete, setLanguageToDelete] =
    useState<ResumeLanguage | null>(null);

  const handleAdd = () => {
    setIsAddLanguageOpen(true);
  };

  const handleEdit = (uuid: string) => {
    setLanguageToEdit(
      resumeLanguages?.find((lang) => lang.uuid === uuid) || null
    );
  };

  const handleDelete = (uuid: string) => {
    setLanguageToDelete(
      resumeLanguages?.find((lang) => lang.uuid === uuid) || null
    );
  };

  if (!resumeLanguages?.length) {
    return (
      <>
        <div className="text-center text-muted-foreground py-8">
          No languages added yet
        </div>
        <button className="hidden" data-add-button onClick={handleAdd} />
      </>
    );
  }

  return (
    <div className="border p-4 rounded-lg shadow-sm space-y-4">
      <SectionHeader
        title="Languages"
        icon={<LanguagesIcon className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setIsAddLanguageOpen(true)}
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {resumeLanguages.map((lang) => (
          <Card
            key={lang.uuid}
            className="p-4 group hover:border-primary/50 hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={lang.flag} alt={lang.name} />
                <AvatarFallback className="text-lg">
                  {lang.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-lg truncate">
                    {lang.name}
                  </h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(lang.uuid)}
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primaryHex-100"
                    >
                      <Pencil className="h-4 w-4 text-primaryHex-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(lang.uuid)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="mt-2 px-3 py-1 text-sm font-medium"
                >
                  {isValidProficiencyLevel(lang.level)
                    ? getProficiencyLabel(lang.level)
                    : "Unknown"}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <button className="hidden" data-add-button onClick={handleAdd} />

      {isAddLanguageOpen && (
        <AddLanguageDialog
          open={isAddLanguageOpen}
          onOpenChange={setIsAddLanguageOpen}
        />
      )}

      {languageToEdit && (
        <EditLanguageDialog
          open={!!languageToEdit}
          onOpenChange={(open) => !open && setLanguageToEdit(null)}
          language={languageToEdit}
        />
      )}

      {languageToDelete && (
        <DeleteLanguageDialog
          open={!!languageToDelete}
          onOpenChange={(open) => !open && setLanguageToDelete(null)}
          language={languageToDelete}
        />
      )}
    </div>
  );
}
