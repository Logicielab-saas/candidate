export interface WeekDayItem {
  date: Date;
  label: string;
}

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * Creates an array of WeekDayItem objects representing a week (Monday to Sunday)
 * starting from the provided Monday.
 */
function createWeekDays(monday: Date): WeekDayItem[] {
  return Array.from({ length: 7 }, (_, offset) => {
    const weekDay = new Date(monday);
    weekDay.setDate(monday.getDate() + offset);
    return { date: weekDay, label: WEEKDAY_LABELS[offset] };
  });
}

/**
 * Returns an array of WeekDayItem objects representing this week's days (Monday to Sunday).
 */
export function getThisWeekDays(): WeekDayItem[] {
  const today = new Date();
  // Adjust for Monday as the first day: Sunday (0) becomes 6 so Monday is index 0.
  const dayIndex = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - dayIndex);
  return createWeekDays(monday);
}

/**
 * Returns an array of WeekDayItem objects representing next week's days (Monday to Sunday).
 */
export function getNextWeekDays(): WeekDayItem[] {
  const thisWeek = getThisWeekDays();
  const nextMonday = new Date(thisWeek[0].date);
  nextMonday.setHours(0, 0, 0, 0);
  nextMonday.setDate(nextMonday.getDate() + 7);
  return createWeekDays(nextMonday);
}
