"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InterviewDetails } from "./InterviewDetails";
import SelectAvailabilityDate from "./SelectAvailabilityDate";
import FixedInterviewDetails from "./FixedInterviewDetails";
import type { Interview } from "@/core/interfaces/";
import Link from "next/link";
import { JobHeader } from "../jobHeader";
import { InterviewTypeDetails } from "@/components/shared/InterviewTypeDetails";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface InterviewProgramProps {
  job: Interview | undefined;
}

export function InterviewProgram({ job }: InterviewProgramProps) {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const { toast } = useToast();

  // Candidate information (you can replace these with actual data)
  const candidateName = "Malak BENALI";
  const candidateEmail = "malak.benali@gmail.com";
  const candidatePhone = "+212 625 125 125";

  console.log(job?.fixedInterviewDate);
  useEffect(() => {
    if (job?.fixedInterviewDate && job?.fixedInterviewHour) {
      setSelectedHour(job.fixedInterviewHour);
      setSelectedDate(
        format(new Date(job.fixedInterviewDate), "PPP", {
          locale: fr,
        })
      );
    } else if (selectedDay) {
      // Get the current month's first day
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();

      // Calculate the date based on the selected day
      const date = new Date(currentYear, currentMonth, selectedDay);
      setSelectedDate(format(date, "PPP", { locale: fr }));
    }
  }, [job, selectedDay]);

  const handleContinue = () => {
    if (selectedHour) {
      setIsDetailsVisible(true);
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez sélectionner une heure avant de continuer.",
      });
    }
  };

  const handleModify = () => {
    setIsDetailsVisible(false);
  };

  let fixedHour = false;
  // Determine the interview type and relevant details
  if (job?.fixedInterviewDate && job?.fixedInterviewHour) {
    fixedHour = true;
  }

  return (
    <div className="space-y-4">
      {isDetailsVisible ? (
        <InterviewDetails
          selectedDate={selectedDate}
          selectedHour={selectedHour}
          candidateName={candidateName}
          candidateEmail={candidateEmail}
          candidatePhone={candidatePhone}
          onModify={handleModify}
          jobTitle={job?.jobTitle}
          companyName={job?.company.name}
        />
      ) : (
        <>
          {/* Job details */}
          <JobHeader
            jobTitle={job?.jobTitle || ""}
            companyName={job?.company.name || ""}
          />
          <Separator />
          {/* Program interview */}
          <h2 className="text-xl font-semibold mb-2">
            Programmez votre entretien
          </h2>
          <InterviewTypeDetails interview={job} />
          <Separator />
          {/* Show fixed interview details if applicable */}
          {fixedHour && (
            <FixedInterviewDetails
              fixedDate={job?.fixedInterviewDate || null}
              fixedHour={job?.fixedInterviewHour || null}
              onContinue={handleContinue}
              jobKey={job?.jobKey}
            />
          )}
          {/* Select date and hour */}
          {!fixedHour && (
            <SelectAvailabilityDate
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              selectedHour={selectedHour}
              setSelectedHour={setSelectedHour}
            />
          )}
          <Separator />
          {/* Interview details */}
          {!fixedHour && (
            <>
              <div className="p-6 shadow-md rounded-lg border ">
                <h3 className="text-lg font-semibold mb-2">
                  Détails de l&apos;entretien
                </h3>
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
                <Button className="mt-4 w-full" onClick={handleContinue}>
                  Continue
                </Button>
              </div>
              <Separator />
            </>
          )}
          {/* Unavailability section */}
          <div className="p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2">Indisponible ?</h4>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/interviews/refuser/${job?.jobKey}`}>
                Refuser l&apos;entretien
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
