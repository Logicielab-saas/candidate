"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const daysOfWeek = [
  { name: "Lun.", number: 1 },
  { name: "Mar.", number: 2 },
  { name: "Mer.", number: 3 },
  { name: "Jeu.", number: 4 },
  { name: "Ven.", number: 5 },
];

const availableHours: { [key: number]: string[] } = {
  1: [
    "9:00 - 9:30",
    "9:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
  ],
  2: ["9:30 - 10:00", "10:30 - 11:00", "11:30 - 12:00"],
  3: [
    "9:00 - 9:30",
    "9:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
  ],
  4: ["9:30 - 10:00", "10:30 - 11:00", "11:30 - 12:00"],
  5: ["9:00 - 9:30", "10:00 - 10:30", "11:00 - 11:30"],
};

export function InterviewProgram() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDaySelection = (day: number) => {
    setSelectedDay(day);
    const date = new Date(2025, 1, day);
    setSelectedDate(format(date, "EEEE, d MMMM yyyy"));
  };

  return (
    <div className="space-y-4">
      {/* Job details */}
      <div className="p-4 shadow rounded-lg mb-4 text-center">
        <h1 className="text-2xl font-bold">Stage PFE - Social Media Manager</h1>
        <p className="text-lg text-gray-600">Logical Lab</p>
      </div>
      <Separator />
      {/* Program interview */}
      <h2 className="text-xl font-semibold mb-2">Programmez votre entretien</h2>
      <p className="text-md text-gray-500 mb-4">
        Cette entretien se déroulera en personne.
      </p>
      <Separator />
      {/* Select day */}
      <RadioGroup className="flex space-x-4">
        {daysOfWeek.map((day) => (
          <div className="relative" key={day.number}>
            <RadioGroupItem
              value={day.number.toString()}
              id={`day-${day.number}`}
              className="peer sr-only"
              onClick={() => handleDaySelection(day.number)}
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
                <span>{day.number} mars</span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      <Separator />
      {/* Select hour */}
      {selectedDay && (
        <>
          <h4 className="text-lg font-semibold mb-2">Sélectionner une heure</h4>
          <ScrollArea className="mt-4 max-h-80 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {availableHours[selectedDay].map((hour: string) => (
                <div
                  key={hour}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center  hover:shadow-lg transform duration-200 ease-in-out ${
                    selectedHour === hour
                      ? "bg-primaryHex-500 text-white shadow-lg"
                      : " text-primaryHex-600 hover:bg-primaryHex-100"
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
      <Separator />
      {/* Interview details */}
      {selectedDate && selectedHour && (
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
          <Button className="mt-4 w-full">Programmer</Button>
        </div>
      )}
      <Separator />
      {/* Unavailability section */}
      <div className="p-4 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold mb-2">Indisponible ?</h4>
        <Button className="w-full">Refuser l&apos;entretien</Button>
      </div>
    </div>
  );
}
