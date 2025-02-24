"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { type Language } from "@/core/types/language";
import { mockQualifications } from "@/core/mockData/qualifications";
import { AddLanguageDialog } from "./dialogs/add/AddLanguageDialog";
import { DeleteLanguageDialog } from "./dialogs/delete/DeleteLanguageDialog";
import { EditLanguageDialog } from "./dialogs/edit/EditLanguageDialog";

export function LanguagesList() {
  const [languages, setLanguages] = useState<Language[]>(
    mockQualifications.languages
  );
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const [languageToEdit, setLanguageToEdit] = useState<Language | null>(null);
  const [languageToDelete, setLanguageToDelete] = useState<Language | null>(
    null
  );

  const handleAdd = () => {
    setIsAddLanguageOpen(true);
  };

  const handleEdit = (language: Language) => {
    setLanguageToEdit(language);
  };

  const handleDelete = (language: Language) => {
    setLanguageToDelete(language);
  };

  const handleConfirmDelete = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
    setLanguageToDelete(null);
  };

  const handleSubmit = (values: Omit<Language, "id">) => {
    const newLanguage: Language = {
      ...values,
      id: crypto.randomUUID(),
    };
    setLanguages([newLanguage, ...languages]);
  };

  const handleEditSubmit = (id: string, values: Omit<Language, "id">) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id
          ? {
              ...values,
              id,
            }
          : lang
      )
    );
  };

  if (!languages?.length) {
    return (
      <>
        <div className="text-center text-muted-foreground py-8">
          Aucune langue ajoutée
        </div>
        <button className="hidden" data-add-button onClick={handleAdd} />
      </>
    );
  }

  return (
    <>
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border rounded-lg p-2">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="group flex items-center justify-between hover:bg-accent/50 transition-colors rounded-lg px-3 py-2"
          >
            <div className="min-w-0 flex-1">
              <span className="font-medium truncate block">{lang.name}</span>
              {lang.certification && (
                <span className="text-xs text-muted-foreground truncate block">
                  {lang.certification}
                </span>
              )}
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(lang)}
                className="h-7 w-7"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(lang)}
                className="h-7 w-7 text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button className="hidden" data-add-button onClick={handleAdd} />

      <AddLanguageDialog
        open={isAddLanguageOpen}
        onOpenChange={setIsAddLanguageOpen}
        onSubmit={handleSubmit}
      />

      {languageToEdit && (
        <EditLanguageDialog
          open={!!languageToEdit}
          onOpenChange={(open) => !open && setLanguageToEdit(null)}
          onSubmit={handleEditSubmit}
          language={languageToEdit}
        />
      )}

      {languageToDelete && (
        <DeleteLanguageDialog
          open={!!languageToDelete}
          onOpenChange={(open) => !open && setLanguageToDelete(null)}
          onConfirm={handleConfirmDelete}
          language={languageToDelete}
        />
      )}
    </>
  );
}
