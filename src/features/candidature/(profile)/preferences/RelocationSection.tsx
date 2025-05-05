"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AddRelocationDialog } from "./dialogs/add/AddRelocationDialog";
import { EditRelocationDialog } from "./dialogs/edit/EditRelocationDialog";
import { DeleteRelocationDialog } from "./dialogs/delete/DeleteRelocationDialog";
import { useTranslations } from "next-intl";

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
  const tCommon = useTranslations("common");

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
    if (!relocation?.willRelocate) {
      return tCommon("preferences.sections.relocation.status.noRelocation");
    }
    if (relocation.locationType === "anywhere") {
      return tCommon(
        "preferences.sections.relocation.status.anywhereRelocation"
      );
    }

    const cities =
      relocation.location?.split(",").map((city) => city.trim()) || [];
    return (
      <div className="space-y-1">
        <p className="font-medium">
          {tCommon(
            "preferences.sections.relocation.status.specificLocation.title"
          )}
        </p>
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
          {tCommon("preferences.sections.relocation.empty")}
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
                aria-label={tCommon("actions.edit")}
              >
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleDelete}
                aria-label={tCommon("actions.delete")}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <button
        className="hidden"
        data-add-button
        onClick={handleAdd}
        aria-label={tCommon("actions.add")}
      />

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
