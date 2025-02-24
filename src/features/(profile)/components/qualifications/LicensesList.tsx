"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { type License } from "@/core/types/license";
import { mockQualifications } from "@/core/mockData/qualifications";
import { AddLicenseDialog } from "./dialogs/add/AddLicenseDialog";
import { DeleteLicenseDialog } from "./dialogs/delete/DeleteLicenseDialog";
import { EditLicenseDialog } from "./dialogs/edit/EditLicenseDialog";

export function LicensesList() {
  const [licenses, setLicenses] = useState<License[]>(
    mockQualifications.licenses
  );
  const [isAddLicenseOpen, setIsAddLicenseOpen] = useState(false);
  const [licenseToEdit, setLicenseToEdit] = useState<License | null>(null);
  const [licenseToDelete, setLicenseToDelete] = useState<License | null>(null);

  const handleAdd = () => {
    setIsAddLicenseOpen(true);
  };

  const handleEdit = (license: License) => {
    setLicenseToEdit(license);
  };

  const handleDelete = (license: License) => {
    setLicenseToDelete(license);
  };

  const handleConfirmDelete = (id: string) => {
    setLicenses(licenses.filter((license) => license.id !== id));
    setLicenseToDelete(null);
  };

  const handleSubmit = (values: Omit<License, "id">) => {
    const newLicense: License = {
      ...values,
      id: crypto.randomUUID(),
    };
    setLicenses([newLicense, ...licenses]);
  };

  const handleEditSubmit = (id: string, values: Omit<License, "id">) => {
    setLicenses(
      licenses.map((license) =>
        license.id === id
          ? {
              ...values,
              id,
            }
          : license
      )
    );
  };

  if (!licenses?.length) {
    return (
      <>
        <div className="text-center text-muted-foreground py-8">
          Aucun permis ajouté
        </div>
        <button className="hidden" data-add-button onClick={handleAdd} />
      </>
    );
  }

  return (
    <>
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
                onClick={() => handleEdit(license)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(license)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button className="hidden" data-add-button onClick={handleAdd} />

      <AddLicenseDialog
        open={isAddLicenseOpen}
        onOpenChange={setIsAddLicenseOpen}
        onSubmit={handleSubmit}
      />

      {licenseToEdit && (
        <EditLicenseDialog
          open={!!licenseToEdit}
          onOpenChange={(open) => !open && setLicenseToEdit(null)}
          onSubmit={handleEditSubmit}
          license={licenseToEdit}
        />
      )}

      {licenseToDelete && (
        <DeleteLicenseDialog
          open={!!licenseToDelete}
          onOpenChange={(open) => !open && setLicenseToDelete(null)}
          onConfirm={handleConfirmDelete}
          license={licenseToDelete}
        />
      )}
    </>
  );
}
