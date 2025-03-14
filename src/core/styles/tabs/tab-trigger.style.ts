import { cn } from "@/lib/utils";

export const tabTriggerStyles = {
  base: cn(
    "relative h-full rounded-md border-b-2 border-transparent",
    "px-4 py-2 font-medium",
    "text-secondaryHex-600 dark:text-secondaryHex-400",
    "outline-none ring-offset-background transition-all duration-200",
    "bg-background/50 hover:bg-accent/50",
    "hover:text-primaryHex-600 dark:hover:text-primaryHex-400",
    "data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500",
    "data-[state=active]:bg-accent/40 data-[state=active]:shadow-sm",
    "dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400",
    "dark:data-[state=active]:bg-accent/20"
  ),
  home: cn(
    "relative h-full rounded-md border-b-4 border-transparent",
    "px-4 py-2 font-medium",
    "text-secondaryHex-700 dark:text-secondaryHex-400",
    "outline-none ring-offset-background transition-all duration-200",
    "bg-background/50 hover:bg-accent/50",
    "hover:text-primaryHex-600 dark:hover:text-primaryHex-400",
    "data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-600",
    "data-[state=active]:bg-accent/40 data-[state=active]:shadow-sm",
    "dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400",
    "dark:data-[state=active]:bg-accent/20"
  ),
};
