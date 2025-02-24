import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
}

interface SkillsListProps {
  skills: Skill[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SkillsList({ skills, onEdit, onDelete }: SkillsListProps) {
  if (!skills?.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucune compétence ajoutée
      </div>
    );
  }

  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="group flex items-center justify-between bg-card hover:bg-accent/50 transition-colors rounded-lg px-3 py-2"
        >
          <span className="font-medium truncate">{skill.name}</span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(skill.id)}
              className="h-7 w-7"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(skill.id)}
              className="h-7 w-7 text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
