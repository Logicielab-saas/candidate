"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";
import Link from "next/link";

interface FixedInterviewDetailsProps {
  fixedDate: string | null;
  fixedHour: string | null;
  onContinue: () => void;
  jobKey: string | undefined;
}

const FixedInterviewDetails = ({
  fixedDate,
  fixedHour,
  onContinue,
  jobKey,
}: FixedInterviewDetailsProps) => {
  return (
    <div className="p-6 shadow-md rounded-lg border">
      <h3 className="text-lg font-semibold mb-2">
        Détails de l&apos;entretien fixe
      </h3>
      <div className="flex items-center mb-2">
        <CalendarIcon className="h-5 w-5 text-primaryHex-500 mr-2" />
        <p className="text-md text-gray-700 dark:text-gray-300">
          Date: <span className="font-bold">{fixedDate}</span>
        </p>
      </div>
      <div className="flex items-center">
        <ClockIcon className="h-5 w-5 text-primaryHex-500 mr-2" />
        <p className="text-md text-gray-700 dark:text-gray-300">
          Heure: <span className="font-bold">{fixedHour}</span>
        </p>
      </div>

      <Button className="w-full mt-4" onClick={onContinue}>
        Continue
      </Button>
      <Button variant="outline" className="w-full mt-2">
        <Link href={`/interviews/reporter/${jobKey}`}>
          Suggérer nouveaux créneaux
        </Link>
      </Button>
    </div>
  );
};

export default FixedInterviewDetails;
