"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { JobHeader } from "../jobHeader";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("myInterviewActionPage.details");
  const tCommon = useTranslations("common");
  const { toast } = useToast();
  const router = useRouter();

  const handleConfirm = () => {
    const data = {
      name: candidateName,
      email: candidateEmail,
      phone: candidatePhone,
      date: selectedDate,
      hour: selectedHour,
    };
    console.log("Submitted Data:", data);
    toast({
      variant: "success",
      title: t("toast.success.title"),
      description: t("toast.success.description"),
    });
    router.replace(`/profile/my-jobs?tab=interviews`);
  };

  console.log(selectedDate);

  return (
    <div className="space-y-4">
      <JobHeader jobTitle={jobTitle || ""} companyName={companyName || ""} />
      <Separator />
      <h2 className="text-xl font-semibold mb-2">{tCommon("personalInfo")}</h2>
      <div className="p-6 shadow-md rounded-lg border">
        <p className="text-md text-gray-700 dark:text-gray-300">
          {tCommon("fullName")}:{" "}
          <span className="font-bold">{candidateName}</span>
        </p>
        <p className="text-md text-gray-700 dark:text-gray-300">
          {tCommon("email")}:{" "}
          <span className="font-bold">{candidateEmail}</span>
        </p>
        <p className="text-md text-gray-700 dark:text-gray-300">
          {tCommon("phone")}:{" "}
          <span className="font-bold">{candidatePhone}</span>
        </p>
      </div>
      <Separator />
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-2">
          {tCommon("interviewDetails")}
        </h2>
      </div>
      <div className="p-6 shadow-md rounded-lg border">
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
            {tCommon("hour")}: <span className="font-bold">{selectedHour}</span>
          </p>
        </div>
      </div>
      <Button className="mt-4 w-full" onClick={handleConfirm}>
        {tCommon("actions.confirm")}
      </Button>
      <Button variant="outline" className="mt-4 w-full" onClick={onModify}>
        {tCommon("actions.edit")}
      </Button>
    </div>
  );
}
