"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/core/utils/date";

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
  const t = useTranslations("myInterviewActionPage.fixed");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="p-6 shadow-md rounded-lg border">
      <h3 className="text-lg font-semibold mb-2">
        {tCommon("interviewDetails")}
      </h3>
      <div className="flex items-center mb-2">
        <CalendarIcon className="h-5 w-5 text-primaryHex-500 mr-2" />
        <p className="text-md text-gray-700 dark:text-gray-300">
          {tCommon("dateLabel")}:{" "}
          <span className="font-bold">
            {formatDate(fixedDate || "", "PPP", locale)}
          </span>
        </p>
      </div>
      <div className="flex items-center">
        <ClockIcon className="h-5 w-5 text-primaryHex-500 mr-2" />
        <p className="text-md text-gray-700 dark:text-gray-300">
          {tCommon("hour")}: <span className="font-bold">{fixedHour}</span>
        </p>
      </div>

      <Button className="w-full mt-4" onClick={onContinue}>
        {tCommon("actions.continue")}
      </Button>
      <Button variant="outline" className="w-full mt-2" asChild>
        <Link href={`/interviews/reporter/${jobKey}`}>
          {t("suggestNewSlots")}
        </Link>
      </Button>
    </div>
  );
};

export default FixedInterviewDetails;
