import React from "react";
import type { ResumeCertifications } from "@/core/interfaces/";
import type { ResumeEducation } from "@/core/interfaces/resume-education.interface";
import type { ResumeExperience } from "@/core/interfaces/resume-experience.interface";
import CircleLineWrapper from "./CircleLineWrapper";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: fr });
  };

  const getDateRange = () => {
    let startDate = "";
    let endDate = "";
    let isCurrent = false;

    if ("date_start" in data && data.date_start) {
      startDate = formatDate(data.date_start);
      if ("current_time" in data && data.current_time) {
        isCurrent = data.current_time;
        endDate = data.date_end ? formatDate(data.date_end) : "";
      } else if ("is_current" in data && data.is_current) {
        isCurrent = data.is_current;
        endDate = data.date_end ? formatDate(data.date_end) : "";
      }
    } else if ("issueDate" in data && data.issueDate) {
      startDate = data.issueDate as string;
    }

    if ("date" in data && data.date)
      startDate = formatDate(data.date as string);
    if ("expiration_date" in data && data.expiration_date)
      endDate = formatDate(data.expiration_date as string);

    if (isCurrent) return `${startDate} - Present`;
    if (endDate) return `${startDate} - ${endDate}`;
    return startDate;
  };

  const getDescription = () => {
    if ("description" in data && data.description) return data.description;
    return "";
  };

  return (
    <CircleLineWrapper>
      <h4 className="text-base font-bold flex justify-between items-center">
        {getTitle()}
        <div className="flex">
          <Button
            variant="ghost"
            className="cursor-pointer text-primaryHex-600 hover:bg-primaryHex-100 hover:text-primaryHex-600"
            onClick={() => onEdit(data)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer text-red-600 hover:bg-red-100 hover:text-red-600"
            onClick={() => onDelete(data.uuid)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </h4>
      <p className="text-gray-600">{getSubtitle()}</p>
      <p className="text-gray-500">{getDateRange()}</p>
      <p className="mt-2">{getDescription()}</p>
    </CircleLineWrapper>
  );
}
