"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Annonce {
  intitule: string;
  city: string;
  candidatures: {
    tous: number;
    nouveaux: number;
  };
  statutDeSponsorisation: string;
  dateDePublication: string;
  statutDeLAnnonce: string;
}

export const getColumns = (): ColumnDef<Annonce>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean | "indeterminate") => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "intitule",
    header: "Intitulé du poste",
    accessorKey: "intitule",
    cell: ({ row }) => {
      const intitule = row.getValue("intitule") as string;
      const city = row.original.city;
      const date = row.original.dateDePublication;
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{intitule}</span>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>{city}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "candidatures",
    header: () => (
      <div className="text-center">Candidatures</div>
    ),
    accessorKey: "candidatures",
    cell: ({ row }) => {
      const candidatures = row.getValue("candidatures") as { tous: number; nouveaux: number };
      return (
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center py-3 border-r border-zinc-200 dark:border-zinc-700">
            <span>Tous ({candidatures.tous})</span>
          </div>
          <div className="flex items-center justify-center py-3">
            <span>Nvx ({candidatures.nouveaux})</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "statutDeSponsorisation",
    header: "Statut de sponsorisation",
    accessorKey: "statutDeSponsorisation",
  },
  {
    id: "dateDePublication",
    header: "Date de publication",
    accessorKey: "dateDePublication",
  },
  {
    id: "statutDeLAnnonce",
    header: "Statut de l'annonce",
    accessorKey: "statutDeLAnnonce",
    cell: ({ row }) => {
      const statut = row.getValue("statutDeLAnnonce") as string;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case 'ouverte':
            return 'text-green-600';
          case 'suspendue':
            return 'text-yellow-600';
          case 'fermée':
            return 'text-red-600';
          default:
            return '';
        }
      };
      return (
        <span className={getStatusColor(statut)}>
          {statut}
        </span>
      );
    },
  },
];
