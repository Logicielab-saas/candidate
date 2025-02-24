import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Education {
  id: string;
  degree: string;
  school: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

interface EducationListProps {
  education: Education[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function EducationList({
  education,
  onEdit,
  onDelete,
}: EducationListProps) {
  if (!education?.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucune formation ajoutée
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <div
          key={edu.id}
          className="flex items-start justify-between border rounded-lg p-4"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{edu.degree}</h3>
              {edu.current && <Badge variant="secondary">En cours</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">
              {edu.school} • {edu.location}
            </p>
            <p className="text-sm text-muted-foreground">{edu.field}</p>
            <p className="text-sm text-muted-foreground">
              {edu.startDate} - {edu.current ? "Présent" : edu.endDate}
            </p>
            {edu.description && (
              <p className="text-sm mt-2">{edu.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(edu.id)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(edu.id)}
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
