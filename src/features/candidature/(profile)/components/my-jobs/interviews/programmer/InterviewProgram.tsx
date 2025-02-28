"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InterviewDetails } from "./InterviewDetails";
import SelectAvailabilityDate from "./SelectAvailabilityDate";
import FixedInterviewDetails from "./FixedInterviewDetails";
import { Interview } from "@/core/types/interview";
import Link from "next/link";
import { JobHeader } from "../jobHeader";

interface InterviewProgramProps {
  job: Interview | undefined;
}

export function InterviewProgram({ job }: InterviewProgramProps) {
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

  useEffect(() => {
    if (job?.fixedInterviewDate && job?.fixedInterviewHour) {
      setSelectedHour(job.fixedInterviewHour);
      setSelectedDate(
        format(new Date(job.fixedInterviewDate), "EEEE, d MMMM yyyy")
      );
    }
  }, [job]);

  const handleContinue = () => {
    if (selectedHour) {
      setIsDetailsVisible(true);
    } else {
      alert("Please select an hour before continuing.");
    }
  };

  const handleModify = () => {
    setIsDetailsVisible(false);
  };

  let fixedHour = false;
  // Determine the interview type and relevant details
  const interviewType = job?.interviewType; // e.g., "In-person", "Video Call", "Phone Call"
  if (job?.fixedInterviewDate && job?.fixedInterviewHour) {
    fixedHour = true;
  }
  const interviewDetails = {
    address: job?.interviewAddress,
    link: job?.interviewLink,
    phone: job?.interviewPhone,
    map: job?.interviewAddressMap,
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
          <div className="shadow-md p-4 rounded-lg bg-accent/20 border border-primaryHex-500">
            <p className="text-md text-gray-700 mb-4 font-semibold">
              {interviewType === "In-person" &&
                "Cette entretien se déroulera en personne."}
              {interviewType === "Video Call" &&
                "Cette entretien se déroulera par appel vidéo."}
              {interviewType === "Phone Call" &&
                "Cette entretien se déroulera par téléphone."}
            </p>
            {interviewType === "In-person" &&
              interviewDetails.address &&
              interviewDetails.map && (
                <>
                  <p className="text-md text-gray-700 mb-2">
                    Adresse:{" "}
                    <span className="font-bold">
                      {interviewDetails.address}
                    </span>
                  </p>
                  <p className="text-md text-gray-700 mb-2">
                    Map:{" "}
                    <span className="font-bold">{interviewDetails.map}</span>
                  </p>
                </>
              )}
            {interviewType === "Video Call" && interviewDetails.link && (
              <p className="text-md text-gray-700 mb-4">
                Lien de l&apos;appel:{" "}
                <span className="font-bold">{interviewDetails.link}</span>
              </p>
            )}
            {interviewType === "Phone Call" && interviewDetails.phone && (
              <p className="text-md text-gray-700 mb-4">
                Numéro de téléphone:{" "}
                <span className="font-bold">{interviewDetails.phone}</span>
              </p>
            )}
          </div>
          <Separator />
          {/* Show fixed interview details if applicable */}
          {fixedHour && (
            <FixedInterviewDetails
              fixedDate={job?.fixedInterviewDate || null}
              fixedHour={job?.fixedInterviewHour || null}
              onContinue={handleContinue}
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
            <Button variant="outline" className="w-full">
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
