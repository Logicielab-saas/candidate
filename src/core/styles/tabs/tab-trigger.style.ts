import { cn } from "@/lib/utils"

export const tabTriggerStyles = {
  base: cn(
    "relative h-full rounded-none border-b-2 border-transparent",
    "px-4 font-medium",
    "text-secondaryHex-600 dark:text-secondaryHex-400",
    "outline-none ring-offset-background transition-colors",
    "hover:text-primaryHex-600 dark:hover:text-primaryHex-400",
    "data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500",
    "dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
  )
}