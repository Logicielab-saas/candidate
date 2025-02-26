import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Skill } from "@/core/types/skill";
import { Language } from "@/core/types/language";

interface TagListItemProps {
  skill: Skill | Language;
  onDelete: (id: string) => void;
}

export const TagListItem: React.FC<TagListItemProps> = ({
  skill,
  onDelete,
}) => {
  return (
    <div className="group flex items-center justify-between hover:bg-accent/50 transition-colors px-3 py-2 bg-gray-100 text-gray-800 rounded-lg">
      <span className="font-medium truncate">{skill.name}</span>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(skill.id)}
          className="h-7 w-7 text-destructive"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
