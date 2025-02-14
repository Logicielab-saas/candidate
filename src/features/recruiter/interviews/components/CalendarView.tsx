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
  exceptions?: Array<{
    date: Date;
    isAvailable: boolean;
    startTime?: string;
    endTime?: string;
  }>;
}

export function CalendarView({
  className,
  availabilities,
  exceptions = [],
}: CalendarViewProps) {
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
    // First check if this day has an exception
    const exception = exceptions?.find(
      (e) =>
        e.date.getDate() === day.getDate() &&
        e.date.getMonth() === day.getMonth() &&
        e.date.getFullYear() === day.getFullYear()
    );

    const getHalfHourClasses = (
      startTime: string,
      endTime: string,
      hour: number
    ) => {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);
      const startDecimal = startHour + startMinute / 60;
      const endDecimal = endHour + endMinute / 60;
      const currentHourDecimal = hour;

      // Only process if we're within the time range
      if (
        currentHourDecimal >= Math.floor(startDecimal) &&
        currentHourDecimal < Math.ceil(endDecimal)
      ) {
        const classes = ["relative"];

        // Add top border for the first block
        if (currentHourDecimal === Math.floor(startDecimal)) {
          if (startMinute === 30) {
            classes.push(
              "[&>div]:content-[''] [&>div]:absolute [&>div]:left-0 [&>div]:right-0 [&>div]:h-0.5 [&>div]:top-[50%] [&>div]:bg-primaryHex-500/50"
            );
          } else {
            classes.push("border-t border-t-primaryHex-500/50");
          }
        }

        // Add bottom border for the last block
        if (Math.ceil(endDecimal) - 1 === currentHourDecimal) {
          if (endMinute === 30) {
            // For half-hour endings, add a gradient border at the bottom
            classes.push(
              "[&>div]:content-[''] [&>div]:absolute [&>div]:left-0 [&>div]:right-0 [&>div]:h-0.5 [&>div]:top-[50%] [&>div]:bg-primaryHex-500/50",
              "overflow-visible"
            );
          } else {
            // For full-hour endings, add a normal bottom border
            classes.push("border-b border-b-primaryHex-500/50");
          }
        }

        // Handle start block (either full or half)
        if (currentHourDecimal === Math.floor(startDecimal)) {
          if (startMinute === 30) {
            // Half block starting at :30
            return [
              ...classes,
              "bg-gradient-to-b from-transparent from-55% to-primaryHex-50/50 to-50% dark:to-primaryHex-900/10",
              "before:content-[''] before:absolute before:w-0.5 before:left-0 before:top-[50%] before:h-[50%] before:bg-primaryHex-500/50",
              "after:content-[''] after:absolute after:w-0.5 after:right-0 after:top-[50%] after:h-[50%] after:bg-primaryHex-500/50",
            ].join(" ");
          }
        }

        // Handle end block
        if (currentHourDecimal === Math.floor(endDecimal)) {
          if (endMinute === 30) {
            // Half block ending at :30
            return [
              ...classes,
              "bg-gradient-to-b from-primaryHex-50/50 from-55% to-transparent to-50% dark:from-primaryHex-900/10",
              "before:content-[''] before:absolute before:w-0.5 before:left-0 before:top-0 before:h-[50%] before:bg-primaryHex-500/50",
              "after:content-[''] after:absolute after:w-0.5 after:right-0 after:top-0 after:h-[50%] after:bg-primaryHex-500/50",
            ].join(" ");
          }
        }

        // Full blocks (only for hours completely within the range)
        if (
          (currentHourDecimal > Math.floor(startDecimal) ||
            (currentHourDecimal === Math.floor(startDecimal) &&
              startMinute === 0)) &&
          currentHourDecimal < Math.floor(endDecimal)
        ) {
          return [
            ...classes,
            "bg-primaryHex-50/50 dark:bg-primaryHex-900/10",
            "border-l-2 border-l-primaryHex-500/50",
            "border-r-2 border-r-primaryHex-500/50",
          ].join(" ");
        }
      }

      return "";
    };

    if (exception) {
      if (!exception.isAvailable) return "bg-zinc-100 dark:bg-zinc-800/50";

      if (exception.startTime && exception.endTime) {
        return getHalfHourClasses(exception.startTime, exception.endTime, hour);
      }
      return "";
    }

    // If no exception, fall back to regular weekly availability
    let dayOfWeek = getDay(day);
    if (dayOfWeek === 0) dayOfWeek = 7;
    const dayAvailability = availabilities[dayOfWeek];

    if (!dayAvailability?.isAvailable) return "";

    return getHalfHourClasses(
      dayAvailability.startTime,
      dayAvailability.endTime,
      hour
    );
  };

  const getCurrentTimePosition = () => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour < 8 || currentHour >= 20) return undefined;

    return `${(currentHour - 8 + currentMinute / 60) * 48}px`;
  };

  return (
    <Card className={cn("flex flex-col", className)}>
      <style jsx>{`
        .bottom-border-half::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          top: 50%;
          background: rgb(var(--primary) / 0.5);
        }
      `}</style>
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
                {HOURS.map((hour) => {
                  const availabilityStyle = getAvailabilityStyle(day, hour);
                  // Check if this hour has a half-hour ending slot
                  const hasHalfHourEnd = availabilityStyle?.includes(
                    "from-primaryHex-50/50 from-55%"
                  );

                  return (
                    <div
                      key={hour}
                      className={cn(
                        "group relative h-12 transition-colors",
                        (!availabilityStyle || hasHalfHourEnd) && "border-b", // Keep border for non-available slots and half-hour endings
                        availabilityStyle
                      )}
                    >
                      <div />
                    </div>
                  );
                })}
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
