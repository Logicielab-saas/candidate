import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Language {
  id: string;
  name: string;
  certification?: string;
}

interface LanguagesListProps {
  languages: Language[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function LanguagesList({
  languages,
  onEdit,
  onDelete,
}: LanguagesListProps) {
  if (!languages?.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucune langue ajoutée
      </div>
    );
  }

  return (
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
            <Button variant="ghost" size="icon" onClick={() => onEdit(lang.id)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(lang.id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
