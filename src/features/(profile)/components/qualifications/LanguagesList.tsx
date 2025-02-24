"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { type Language } from "@/core/types/language";
import { mockQualifications } from "@/core/mockData/qualifications";

export function LanguagesList() {
  const [languages, setLanguages] = useState<Language[]>(
    mockQualifications.languages
  );
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);

  const handleAdd = () => {
    setIsAddLanguageOpen(true);
  };

  const handleEdit = (id: string) => {
    console.log("Edit language", id);
  };

  const handleDelete = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const handleSubmit = (values: Omit<Language, "id">) => {
    const newLanguage: Language = {
      ...values,
      id: crypto.randomUUID(),
    };
    setLanguages([newLanguage, ...languages]);
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
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="flex items-start justify-between border rounded-lg p-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{lang.name}</h3>
              </div>
              {lang.certification && (
                <p className="text-sm text-muted-foreground">
                  Certification: {lang.certification}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(lang.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(lang.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button className="hidden" data-add-button onClick={handleAdd} />
    </>
  );
}
