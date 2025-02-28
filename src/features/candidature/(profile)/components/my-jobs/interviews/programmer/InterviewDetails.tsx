"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { JobHeader } from "../jobHeader";

interface InterviewDetailsProps {
  selectedDate: string | null;
  selectedHour: string | null;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  onModify: () => void;
  jobTitle: string | undefined;
  companyName: string | undefined;
}

export function InterviewDetails({
  selectedDate,
  selectedHour,
  candidateName,
  candidateEmail,
  candidatePhone,
  onModify,
  jobTitle,
  companyName,
}: InterviewDetailsProps) {
  const handleConfirm = () => {
    const data = {
      name: candidateName,
      email: candidateEmail,
      phone: candidatePhone,
      date: selectedDate,
      hour: selectedHour,
    };
    console.log("Submitted Data:", data);
  };

  return (
    <div className="space-y-4">
      <JobHeader jobTitle={jobTitle || ""} companyName={companyName || ""} />
      <Separator />
      <h2 className="text-xl font-semibold mb-2">Informations</h2>
      <div className="p-6 shadow-md rounded-lg border">
        <p className="text-md text-gray-700">
          Prénom et nom: <span className="font-bold">{candidateName}</span>
        </p>
        <p className="text-md text-gray-700">
          Adresse email: <span className="font-bold">{candidateEmail}</span>
        </p>
        <p className="text-md text-gray-700">
          Numéro de téléphone:{" "}
          <span className="font-bold">{candidatePhone}</span>
        </p>
      </div>
      <Separator />
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-2">Entretien en personne</h2>
        <span
          onClick={onModify}
          className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 cursor-pointer"
        >
          <Pencil className="w-5 h-5" />
        </span>
      </div>
      <div className="p-6 shadow-md rounded-lg border">
        <div className="flex items-center mb-2">
          <CalendarIcon className="h-5 w-5 text-primaryHex-500 mr-2" />
          <p className="text-md text-gray-700 dark:text-gray-300">
            Date: <span className="font-bold">{selectedDate}</span>
          </p>
        </div>
        <div className="flex items-center">
          <ClockIcon className="h-5 w-5 text-primaryHex-500 mr-2" />
          <p className="text-md text-gray-700 dark:text-gray-300">
            Heure: <span className="font-bold">{selectedHour}</span>
          </p>
        </div>
      </div>
      <Button className="mt-4 w-full" onClick={handleConfirm}>
        Confirmer
      </Button>
      <Button variant="outline" className="mt-4 w-full" onClick={onModify}>
        Modifier
      </Button>
    </div>
  );
}
