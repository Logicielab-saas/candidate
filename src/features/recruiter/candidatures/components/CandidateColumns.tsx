"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ActionCell } from "./ActionCell";

interface Candidate {
  nom: string;
  ville: string;
  profil: string;
  situation: string;
  datePostule: string;
  titreOffre: string;
  pertinence: string;
  telephone: string;
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
              className="h-auto p-0 text-base font-semibold text-primary hover:text-primary/90 justify-start text-secondaryHex-800 dark:text-secondaryHex-200"
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
    header: () => <div className="flex justify-center">Actions</div>,
    cell: ({ row }) => <ActionCell candidate={row.original} />,
  },
];
