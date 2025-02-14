"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addDays,
  format,
  startOfWeek,
  addWeeks,
  subWeeks,
  getDay,
  isToday,
  isSameDay,
} from "date-fns";
import { fr } from "date-fns/locale";
import { WeekdayAvailability } from "@/core/mockData/dispo-data";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8:00 to 20:00

interface CalendarViewProps {
  className?: string;
  availabilities: Record<number, WeekdayAvailability>;
}

export function CalendarView({ className, availabilities }: CalendarViewProps) {
  const [currentWeek, setCurrentWeek] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  ); // Start week on Monday
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const handlePrevWeek = () => setCurrentWeek((prev) => subWeeks(prev, 1));
  const handleNextWeek = () => setCurrentWeek((prev) => addWeeks(prev, 1));

  const getAvailabilityStyle = (day: Date, hour: number) => {
    let dayOfWeek = getDay(day);
    // Convert Sunday from 0 to 7 to match our data structure
    if (dayOfWeek === 0) dayOfWeek = 7;
    const dayAvailability = availabilities[dayOfWeek];

    if (!dayAvailability?.isAvailable) return "";

    const startHour = parseInt(dayAvailability.startTime.split(":")[0]);
    const endHour = parseInt(dayAvailability.endTime.split(":")[0]);

    if (hour >= startHour && hour < endHour) {
      return "bg-primaryHex-100/50 dark:bg-primaryHex-900/20";
    }

    return "";
  };

  const getCurrentTimePosition = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour < 8 || currentHour >= 20) return undefined;

    return `${(currentHour - 8 + currentMinute / 60) * 48}px`;
  };

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-4">
          <CardTitle className="whitespace-nowrap">
            {format(weekDays[0], "MMMM yyyy", { locale: fr })}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handlePrevWeek}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleNextWeek}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentWeek(startOfWeek(new Date(), { weekStartsOn: 1 }))
          }
        >
          Aujourd&apos;hui
        </Button>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden flex-1">
        <div className="flex h-full">
          {/* Time column */}
          <div className="w-16 shrink-0 border-r bg-muted/5">
            <div className="h-12 border-b" /> {/* Header spacer */}
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="flex h-12 items-center justify-end border-b px-2 text-xs text-muted-foreground"
              >
                {hour}:00
              </div>
            ))}
          </div>

          {/* Days columns */}
          <div className="flex flex-1 overflow-x-auto relative">
            {weekDays.map((day) => (
              <div
                key={day.toString()}
                className={cn(
                  "flex-1 border-r last:border-r-0",
                  isToday(day) && "bg-muted/5"
                )}
              >
                {/* Day header */}
                <div
                  className={cn(
                    "flex h-12 flex-col items-center justify-center border-b",
                    isToday(day) && "bg-primaryHex-50 dark:bg-primaryHex-900/20"
                  )}
                >
                  <div className="text-sm font-medium">
                    {format(day, "EEE", { locale: fr })}
                  </div>
                  <div
                    className={cn(
                      "text-sm",
                      isToday(day)
                        ? "text-primaryHex-600 dark:text-primaryHex-400 font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </div>
                </div>
                {/* Hour cells */}
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className={cn(
                      "group relative h-12 border-b transition-colors hover:bg-accent/50",
                      getAvailabilityStyle(day, hour)
                    )}
                  />
                ))}
              </div>
            ))}

            {/* Current time indicator */}
            {isSameDay(currentTime, weekDays[getDay(currentTime)]) && (
              <div
                className="absolute left-0 right-0 flex items-center pointer-events-none"
                style={{ top: getCurrentTimePosition() || 0 }}
              >
                <div className="w-16 flex items-center justify-end pr-2">
                  <div className="w-2 h-2 rounded-full bg-primaryHex-500" />
                </div>
                <div className="flex-1 border-t border-primaryHex-500" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
