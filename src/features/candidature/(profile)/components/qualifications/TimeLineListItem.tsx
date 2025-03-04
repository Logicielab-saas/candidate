import React from "react";
import { Experience, Education, Certification } from "@/core/interfaces/";
import CircleLineWrapper from "./CircleLineWrapper";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash } from "lucide-react";
import { Project } from "@/core/types/project";

interface TimeLineListItemProps {
  data: Experience | Education | Certification | Project;
  onEdit: (data: Experience | Education | Certification | Project) => void;
  onDelete: (id: string) => void;
}

export default function TimeLineListItem({
  data,
  onEdit,
  onDelete,
}: TimeLineListItemProps) {
  return (
    <CircleLineWrapper>
      <h4 className="text-base font-bold flex justify-between items-center">
        {"title" in data
          ? (data as Experience).title
          : "degree" in data
          ? (data as Education).degree
          : "name" in data && data.name}
        <div className="flex ">
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
            onClick={() => onDelete(data.id)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </h4>
      <p className="text-gray-600">
        {"company" in data
          ? (data as Experience).company
          : "school" in data
          ? (data as Education).school
          : ""}
      </p>
      <p className="text-gray-500">
        {"startDate" in data
          ? (data as Experience).startDate
          : "issueDate" in data
          ? (data as Certification).issueDate
          : (data as Education).startDate}{" "}
        {"endDate" in data
          ? " - " + (data as Experience).endDate
          : "issueDate" in data
          ? ""
          : "current" in data && data.current
          ? " - Present"
          : ""}
      </p>
      <p className="mt-2">{data.description}</p>
    </CircleLineWrapper>
  );
}
