/**
 * PersonalInfoSection - Review step personal information section
 *
 * Displays personal information and allows editing through a dialog
 */

"use client";

import { User, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { EditPersonalInfoDialog } from "./EditPersonalInfoDialog";
import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";

export function PersonalInfoSection() {
  const { personalInfo } = useJobApplyStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Informations personnelles</h3>
        </div>

        <span
          className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 hover:text-primaryHex-600 cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <Pencil className="w-5 h-5 " />
        </span>
      </div>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Nom complet</p>
          <p className="font-medium">
            {personalInfo.firstName} {personalInfo.lastName}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{personalInfo.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Téléphone</p>
          <p className="font-medium">{personalInfo.phone}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Adresse</p>
          <p className="font-medium">{personalInfo.address}</p>
        </div>
      </div>

      <EditPersonalInfoDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
