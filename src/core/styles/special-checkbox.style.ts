import { cn } from "@/lib/utils";

export const specialCheckboxStyle = cn(
  "h-4 w-4 rounded-full border-2",
  "bg-gradient-to-br from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900",
  "hover:from-gray-50 hover:to-gray-100 dark:hover:from-zinc-700 dark:hover:to-zinc-800",
  "shadow-sm hover:shadow",
  "data-[state=checked]:shadow-inner",
  "transition-all duration-200",
  "focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-opacity-50",
  "[&>span]:flex [&>span]:items-center [&>span]:justify-center",
  "[&>span]:h-full [&>span]:w-full",
  "[&>span>svg]:h-3 [&>span>svg]:w-3",
  "[&>span>svg]:stroke-[3]"
);
