import React from "react";
import type { ResumeCertifications } from "@/core/interfaces/";
import type { ResumeEducation } from "@/core/interfaces/resume-education.interface";
import type { ResumeExperience } from "@/core/interfaces/resume-experience.interface";
import CircleLineWrapper from "./CircleLineWrapper";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash } from "lucide-react";
import { formatDate } from "@/core/utils/date";
import { useLocale, useTranslations } from "next-intl";

interface TimeLineListItemProps {
  data: ResumeEducation | ResumeExperience | ResumeCertifications;
  onEdit: (
    data: ResumeEducation | ResumeExperience | ResumeCertifications
  ) => void;
  onDelete: (id: string) => void;
}

export default function TimeLineListItem({
  data,
  onEdit,
  onDelete,
}: TimeLineListItemProps) {
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const getTitle = () => {
    if ("job_title" in data) return data.job_title;
    if ("degree" in data) return data.degree;
    if ("name" in data) return data.name;
    return "";
  };

  const getSubtitle = () => {
    if ("company_name" in data) return data.company_name;
    if ("title" in data) return data.title;
    return "";
  };

  const formatedDate = (dateString: string) => {
    return formatDate(dateString, "d MMMM yyyy", locale);
  };

  const getDateRange = () => {
    let startDate = "";
    let endDate = "";
    let isCurrent = false;

    // Handle work experience and education dates
    if ("date_start" in data && data.date_start) {
      startDate = formatedDate(data.date_start);

      // Check for work experience
      if ("current_time" in data) {
        isCurrent = data.current_time;
      }
      // Check for education
      else if ("is_current" in data) {
        isCurrent = data.is_current;
      }

      // Set end date if it exists and not current
      if (data.date_end && !isCurrent) {
        endDate = formatedDate(data.date_end);
      }
    }
    // Handle certifications
    else if ("date" in data && data.date) {
      startDate = formatedDate(data.date as string);
      if ("expiration_date" in data && data.expiration_date) {
        endDate = formatedDate(data.expiration_date as string);
      }
    }

    if (isCurrent) return `${startDate} - ${tCommon("current")}`;
    if (endDate) return `${startDate} - ${endDate}`;
    return startDate;
  };

  const getDescription = () => {
    if ("description" in data && data.description) return data.description;
    return "";
  };

  return (
    <CircleLineWrapper>
      <h4 className="text-base font-bold flex justify-between items-center dark:text-gray-100">
        {getTitle()}
        <div className="flex">
          <Button
            variant="ghost"
            className="cursor-pointer text-primaryHex-600 hover:bg-primaryHex-100 hover:text-primaryHex-600 dark:text-primaryHex-400 dark:hover:bg-primaryHex-900/50 dark:hover:text-primaryHex-300"
            onClick={() => onEdit(data)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer text-red-600 hover:bg-red-100 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/50 dark:hover:text-red-300"
            onClick={() => onDelete(data.uuid)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </h4>
      <p className="text-gray-600 dark:text-gray-300">{getSubtitle()}</p>
      <p className="text-gray-500 dark:text-gray-400">{getDateRange()}</p>
      <p className="mt-2 dark:text-gray-200">{getDescription()}</p>
    </CircleLineWrapper>
  );
}
