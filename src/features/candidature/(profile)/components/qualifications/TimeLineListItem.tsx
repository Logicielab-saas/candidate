import React from "react";
import { Experience } from "@/core/types/experience";
import CircleLineWrapper from "./CircleLineWrapper";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash } from "lucide-react";

interface TimeLineListItemProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (id: string) => void;
}

const TimeLineListItem: React.FC<TimeLineListItemProps> = ({
  experience,
  onEdit,
  onDelete,
}) => {
  return (
    <CircleLineWrapper>
      <h4 className="text-base font-bold flex justify-between items-center">
        {experience.title}
        <div className="flex ">
          <Button
            variant="ghost"
            className="cursor-pointer text-primaryHex-600 hover:bg-primaryHex-100 hover:text-primaryHex-600"
            onClick={() => onEdit(experience)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer text-red-600 hover:bg-red-100 hover:text-red-600"
            onClick={() => onDelete(experience.id)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </h4>
      <p className="text-gray-600">{experience.company}</p>
      <p className="text-gray-500">
        {experience.startDate} -{" "}
        {experience.endDate ? experience.endDate : "Present"}
      </p>
      <p className="mt-2">{experience.description}</p>
    </CircleLineWrapper>
  );
};

export default TimeLineListItem;
