"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InterviewDetails } from "./InterviewDetails";
import SelectAvailabilityDate from "./SelectAvailabilityDate";
import FixedInterviewDetails from "./FixedInterviewDetails";
import type { Interview } from "@/core/interfaces/";
import Link from "next/link";
import { JobHeader } from "../jobHeader";
import { InterviewTypeDetails } from "@/components/shared/InterviewTypeDetails";
import { useToast } from "@/hooks/use-toast";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/core/utils/date";

interface InterviewProgramProps {
  job: Interview | undefined;
}

// Candidate information (you can replace these with actual data)
const candidateName = "Malak BENALI";
const candidateEmail = "malak.benali@gmail.com";
const candidatePhone = "+212 625 125 125";

export function InterviewProgram({ job }: InterviewProgramProps) {
  const t = useTranslations("myInterviewActionPage");
  const tCommon = useTranslations("common");

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const { toast } = useToast();
  const locale = useLocale();

  console.log(job?.fixedInterviewDate);
  useEffect(() => {
    if (job?.fixedInterviewDate && job?.fixedInterviewHour) {
      setSelectedHour(job.fixedInterviewHour);
      setSelectedDate(formatDate(job.fixedInterviewDate, "PPP", locale));
    } else if (selectedDay) {
      // Get the current month's first day
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();

      // Calculate the date based on the selected day
      const date = new Date(currentYear, currentMonth, selectedDay);
      setSelectedDate(formatDate(date, "PPP", locale));
    }
  }, [job, selectedDay, locale]);

  const handleContinue = () => {
    if (selectedHour) {
      setIsDetailsVisible(true);
    } else {
      toast({
        variant: "destructive",
        title: tCommon("actions.error"),
        description: tCommon("validation.selectTimeFirst"),
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
            {tCommon("programInterview")}
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
                  {tCommon("interviewDetails")}
                </h3>
                <div className="flex items-center mb-2">
                  <CalendarIcon className="h-5 w-5 text-primaryHex-500 mr-2" />
                  <p className="text-md text-gray-700 dark:text-gray-300">
                    {tCommon("dateLabel")}:{" "}
                    <span className="font-bold">{selectedDate}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-primaryHex-500 mr-2" />
                  <p className="text-md text-gray-700 dark:text-gray-300">
                    {tCommon("hour")}:{" "}
                    <span className="font-bold">{selectedHour}</span>
                  </p>
                </div>
                <Button className="mt-4 w-full" onClick={handleContinue}>
                  {tCommon("actions.continue")}
                </Button>
              </div>
              <Separator />
            </>
          )}
          {/* Unavailability section */}
          <div className="p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2">
              {t("unavailable.title")}
            </h4>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/interviews/refuser/${job?.jobKey}`}>
                {t("unavailable.action")}
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
