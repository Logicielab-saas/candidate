"use client";

import { Languages } from "lucide-react";
import { useState } from "react";
import { type Language } from "@/core/types/language";
import { mockQualifications } from "@/core/mockData/qualifications";
import { AddLanguageDialog } from "./dialogs/add/AddLanguageDialog";
import { DeleteLanguageDialog } from "./dialogs/delete/DeleteLanguageDialog";
import { EditLanguageDialog } from "./dialogs/edit/EditLanguageDialog";
import { TagListItem } from "./TagListItem";
import { SectionHeader } from "./SectionHeader";

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

  const handleEdit = (id: string) => {
    setLanguageToEdit(languages.find((lang) => lang.id === id) || null);
  };

  const handleDelete = (id: string) => {
    setLanguageToDelete(languages.find((lang) => lang.id === id) || null);
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
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Languages"
        icon={<Languages className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setIsAddLanguageOpen(true)}
      />
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-2">
        {languages.map((lang) => (
          <TagListItem
            key={lang.id}
            skill={lang}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
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
    </div>
  );
}
