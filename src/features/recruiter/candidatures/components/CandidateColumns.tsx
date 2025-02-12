"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MessageCircle, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Candidate {
  nom: string;
  ville: string;
  profil: string;
  situation: string;
  datePostule: string;
  titreOffre: string;
  pertinence: string;
  activite: {
    status: string;
    message: string;
  };
}

export const getColumns = (): ColumnDef<Candidate>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center pr-2.5">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean | "indeterminate") =>
            table.toggleAllPageRowsSelected(!!value)
          }
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
    id: "candidat",
    header: "Candidat(e)",
    cell: ({ row }) => {
      const nom = row.original.nom;
      const ville = row.original.ville;
      const profil = row.original.profil;
      const situation = row.original.situation;
      const datePostule = row.original.datePostule;
      const titreOffre = row.original.titreOffre;

      return (
        <div className="flex flex-col gap-2 py-2">
          <div className="flex flex-col">
            <Button
              variant="link"
              className="h-auto p-0 text-base font-semibold text-primary hover:text-primary/90 justify-start text-secondaryHex-800"
            >
              {nom}
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{ville}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <span>{profil}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500">
                {situation}
              </span>
            </div>

            <div className="flex flex-col gap-0.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                <span>A postulé le {datePostule}</span>
              </div>
              <Link
                href={`/recruiter/annonces/details/1`}
                className="group flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600 group-hover:bg-primary/70" />
                <span>{titreOffre}</span>
              </Link>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "pertinence",
    header: "Pertinence du profil",
    accessorKey: "pertinence",
    cell: ({ row }) => {
      const pertinence = row.getValue("pertinence") as string;
      return (
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          {pertinence}
        </div>
      );
    },
  },
  {
    id: "activite",
    header: "Activité",
    accessorKey: "activite",
    cell: ({ row }) => {
      const activite = row.getValue("activite") as {
        status: string;
        message: string;
      };
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-zinc-900 dark:text-zinc-50">
            {activite.status}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {activite.message}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="w-0.5"></div>,
    cell: () => {
      return (
        <div className="w-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-3 w-3 -pr-3">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-2.5 w-2.5 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Contacter</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm text-red-600 dark:text-red-400 cursor-pointer">
                <X className="h-3.5 w-3.5" />
                <span>Supprimer</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
