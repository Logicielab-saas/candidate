"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AddRelocationDialog } from "./dialogs/add/AddRelocationDialog";
import { EditRelocationDialog } from "./dialogs/edit/EditRelocationDialog";
import { DeleteRelocationDialog } from "./dialogs/delete/DeleteRelocationDialog";

interface Relocation {
  id: string;
  willRelocate: boolean;
  locationType: "anywhere" | "specific";
  location?: string;
}

interface RelocationSectionProps {
  onDataChange: (hasData: boolean) => void;
}

export function RelocationSection({ onDataChange }: RelocationSectionProps) {
  const [relocation, setRelocation] = useState<Relocation | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    onDataChange(!!relocation);
  }, [relocation, onDataChange]);

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleSubmit = (values: Omit<Relocation, "id">) => {
    setRelocation({
      ...values,
      id: crypto.randomUUID(),
    });
  };

  const handleEditSubmit = (id: string, values: Omit<Relocation, "id">) => {
    setRelocation({
      ...values,
      id,
    });
    setIsEditOpen(false);
  };

  const handleConfirmDelete = () => {
    setRelocation(null);
    setIsDeleteOpen(false);
  };

  const getLocationText = () => {
    if (!relocation?.willRelocate) return "Pas de relocalisation";
    if (relocation.locationType === "anywhere")
      return "Déménagement possible n'importe où";

    const cities =
      relocation.location?.split(",").map((city) => city.trim()) || [];
    return (
      <div className="space-y-1">
        <p className="font-medium">À proximité de :</p>
        <div className="pl-4 space-y-0.5">
          {cities.map((city, index) => (
            <p key={index} className="font-semibold text-muted-foreground">
              {city}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {!relocation ? (
        <div className="text-center text-muted-foreground py-8">
          Aucune préférence de relocalisation ajoutée
        </div>
      ) : (
        <div className="rounded-lg border">
          <div className="flex items-center justify-between p-4">
            <div className="space-y-1">{getLocationText()}</div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleEdit}
              >
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <button className="hidden" data-add-button onClick={handleAdd} />

      <AddRelocationDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSubmit={handleSubmit}
      />

      {relocation && isEditOpen && (
        <EditRelocationDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSubmit={handleEditSubmit}
          relocation={relocation}
        />
      )}

      {relocation && isDeleteOpen && (
        <DeleteRelocationDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={handleConfirmDelete}
          relocation={relocation}
        />
      )}
    </>
  );
}
