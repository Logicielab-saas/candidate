"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InterviewDetails } from "./InterviewDetails";
import SelectAvailabilityDate from "./SelectAvailabilityDate";

export function InterviewProgram() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);

  // Candidate information (you can replace these with actual data)
  const candidateName = "Meryem AZELHAK";
  const candidateEmail = "meryem.azelhak@gmail.com";
  const candidatePhone = "+212 625 106251";

  useEffect(() => {
    const date = new Date(2025, 1, selectedDay);
    setSelectedDate(format(date, "EEEE, d MMMM yyyy"));
  }, [selectedDay]);

  const handleContinue = () => {
    setIsDetailsVisible(true);
  };

  const handleModify = () => {
    setIsDetailsVisible(false);
  };

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
        />
      ) : (
        <>
          {/* Job details */}
          <div className="p-4 shadow rounded-lg mb-4 text-center">
            <h1 className="text-2xl font-bold">
              Stage PFE - Social Media Manager
            </h1>
            <p className="text-lg text-gray-600">Logical Lab</p>
          </div>
          <Separator />
          {/* Program interview */}
          <h2 className="text-xl font-semibold mb-2">
            Programmez votre entretien
          </h2>
          <p className="text-md text-gray-500 mb-4">
            Cette entretien se déroulera en personne.
          </p>
          <Separator />
          {/* Select date and hour */}
          <SelectAvailabilityDate
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
          />
          <Separator />
          {/* Interview details */}
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
          {/* Unavailability section */}
          <div className="p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2">Indisponible ?</h4>
            <Button variant="outline" className="w-full">
              Refuser l&apos;entretien
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
