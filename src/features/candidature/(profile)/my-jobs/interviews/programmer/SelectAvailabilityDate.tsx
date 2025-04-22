"use client";

import { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { daysOfWeek, availableHours } from "@/core/mockData/AvailableDates";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useTranslations } from "next-intl";

interface SelectAvailabilityDateProps {
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  selectedHour: string | null;
  setSelectedHour: (hour: string) => void;
}

const SelectAvailabilityDate = ({
  selectedDay,
  setSelectedDay,
  selectedHour,
  setSelectedHour,
}: SelectAvailabilityDateProps) => {
  const tCommon = useTranslations("common");
  useEffect(() => {
    if (selectedDay) {
      setSelectedHour(""); // Reset selected hour when day changes
    }
  }, [selectedDay, setSelectedHour]);

  const formatDayDate = (dayNumber: number) => {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), dayNumber);
    return format(date, "d MMMM", { locale: fr });
  };

  return (
    <>
      <h4 className="text-lg font-semibold mb-2">{tCommon("selectDay")}</h4>
      <RadioGroup className="flex space-x-4">
        {daysOfWeek.map((day) => (
          <div className="relative" key={day.number}>
            <RadioGroupItem
              value={day.number.toString()}
              id={`day-${day.number}`}
              className="peer sr-only"
              onClick={() => setSelectedDay(day.number)}
            />
            <Label
              htmlFor={`day-${day.number}`}
              className={`flex flex-col h-full cursor-pointer rounded-lg border-2 transition-all hover:border-primaryHex-500 hover:shadow-md ${
                selectedDay === day.number
                  ? "border-primaryHex-500 shadow-md"
                  : "border-transparent"
              }`}
            >
              <div className="p-4 flex flex-col text-center border rounded-lg text-primaryHex-600">
                <span className="text-sm">{day.name}</span>
                <span>{formatDayDate(day.number)}</span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedDay && (
        <>
          <h4 className="text-lg font-semibold mb-2">
            {tCommon("selectHour")}
          </h4>
          <ScrollArea className="mt-4 max-h-80 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {availableHours[selectedDay].map((hour: string) => (
                <div
                  key={hour}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center hover:shadow-lg transform duration-200 ease-in-out ${
                    selectedHour === hour
                      ? "bg-primaryHex-500 text-white shadow-lg"
                      : "text-primaryHex-600 hover:bg-primaryHex-100"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select hour ${hour}`}
                  onClick={() => setSelectedHour(hour)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedHour(hour)}
                >
                  <span className="text-lg font-semibold">{hour}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </>
  );
};

export default SelectAvailabilityDate;
