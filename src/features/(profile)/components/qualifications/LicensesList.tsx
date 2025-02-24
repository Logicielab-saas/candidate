import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface License {
  id: string;
  name: string;
  number?: string;
  issueDate: string;
  expiryDate?: string;
  issuingAuthority: string;
}

interface LicensesListProps {
  licenses: License[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function LicensesList({
  licenses,
  onEdit,
  onDelete,
}: LicensesListProps) {
  if (!licenses?.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucun permis ajouté
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {licenses.map((license) => (
        <div
          key={license.id}
          className="flex items-start justify-between border rounded-lg p-4"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{license.name}</h3>
            </div>
            {license.number && (
              <p className="text-sm text-muted-foreground">
                N° {license.number}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              {license.issuingAuthority}
            </p>
            <p className="text-sm text-muted-foreground">
              Délivré le: {license.issueDate}
              {license.expiryDate && ` • Expire le: ${license.expiryDate}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(license.id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(license.id)}
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
