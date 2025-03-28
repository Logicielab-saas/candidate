"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AddMinSalaryDialog } from "./dialogs/add/AddMinSalaryDialog";
import { EditMinSalaryDialog } from "./dialogs/edit/EditMinSalaryDialog";
import { DeleteMinSalaryDialog } from "./dialogs/delete/DeleteMinSalaryDialog";

export interface MinSalary {
  id: string;
  amount: string;
  period: "par mois" | "par an";
}

export function MinSalarySection() {
  const [minSalary, setMinSalary] = useState<MinSalary | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleSubmit = (values: Omit<MinSalary, "id">) => {
    setMinSalary({
      ...values,
      id: crypto.randomUUID(),
    });
  };

  const handleEditSubmit = (id: string, values: Omit<MinSalary, "id">) => {
    setMinSalary({
      ...values,
      id,
    });
    setIsEditOpen(false);
  };

  const handleConfirmDelete = () => {
    setMinSalary(null);
    setIsDeleteOpen(false);
  };

  return (
    <>
      {!minSalary ? (
        <div className="text-center text-muted-foreground py-8">
          Aucun salaire minimum ajouté
        </div>
      ) : (
        <div className="rounded-lg border">
          <div className="flex items-center justify-between p-4">
            <div className="space-y-1">
              <p className="font-medium">
                {minSalary.amount} MAD {minSalary.period}
              </p>
              <p className="text-sm text-muted-foreground">
                Cette information ne sera pas communiquée aux employeurs.
              </p>
            </div>
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

      <AddMinSalaryDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSubmit={handleSubmit}
      />

      {minSalary && isEditOpen && (
        <EditMinSalaryDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSubmit={handleEditSubmit}
          minSalary={minSalary}
        />
      )}

      {minSalary && isDeleteOpen && (
        <DeleteMinSalaryDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={handleConfirmDelete}
          minSalary={minSalary}
        />
      )}
    </>
  );
}
