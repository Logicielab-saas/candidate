"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Eye, Globe, Sparkles, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

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
      <div className="flex items-center justify-center pr-2.5">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean | "indeterminate") => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center pr-2.5">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
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
          <Button
            variant="link"
            size="sm"
            className="text-secondaryHex-800 hover:text-secondaryHex-900 dark:text-secondaryHex-50 dark:hover:text-secondaryHex-40 w-fit text-sm font-medium text-left p-0"
            asChild
          >
            {/* TODO: get the id from the row */}
            <Link href={`/recruiter/annonces/details/1`}>
              {intitule}
            </Link>
          </Button>
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
  {
    id: "actions",
    header: () => <div className="w-0.5"></div>,
    cell: ({ row }) => {
      return (
        <div className="w-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-3 w-3 -pr-3">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-2.5 w-2.5 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]">
              <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                <Edit className="h-3.5 w-3.5" />
                <span>Modifier l'annonce</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                <Eye className="h-3.5 w-3.5" />
                <Link href={`/recruiter/annonces/details/1`}>Voir le détail de l'annonce</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                <Globe className="h-3.5 w-3.5" />
                <span>Afficher la page Emploi publique</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Sponsoriser l'annonce</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm text-red-600 dark:text-red-400 cursor-pointer">
                <Trash2 className="h-3.5 w-3.5" />
                <span>Supprimer l'annonce</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
