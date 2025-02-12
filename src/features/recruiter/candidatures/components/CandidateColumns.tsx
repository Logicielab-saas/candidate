"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  X,
  Check,
  HelpCircle,
  Ban,
  MoreVertical,
  Phone,
  Calendar,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    header: () => <div className="flex justify-center">Actions</div>,
    cell: () => {
      return (
        <div className="flex items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 w-10 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-0 rounded-l-sm rounded-r-none"
                >
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Préselectionées</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Préselectionées</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 w-10 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-none"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">À décider</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>À décider</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 w-10 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-r-sm rounded-l-none"
                >
                  <Ban className="h-4 w-4" />
                  <span className="sr-only">Ecarter</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ecarter</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Contacter</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                      <Phone className="h-3.5 w-3.5" />
                      <span>Appeler</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm cursor-pointer">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Planifier un Entretien</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 py-2 text-sm text-red-600 dark:text-red-400 cursor-pointer">
                      <X className="h-3.5 w-3.5" />
                      <span>Supprimer</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Plus d&apos;actions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
