"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit } from "lucide-react";


export const getColumns = () => [
  {
    id: "intitulé du poste",
    header: "Intitulé",
    accessorKey: "intitule",
  },
  {
    id: "candidatures",
    header: "Candidatures",
    accessorKey: "candidatures",
  },
  {
    id: "statut de sponsorisation",
    header: "Statut de sponsorisation",
    accessorKey: "statutDeSponsorisation",
  },
  {
    id: "date de publication",
    header: "Date de publication",
    accessorKey: "dateDePublication",
  },
  {
    id: "statut de l'annonce",
    header: "Statut de l'annonce",
    accessorKey: "statutDeLAnnonce",
  },
];
