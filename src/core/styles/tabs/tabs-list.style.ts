import { cn } from "@/lib/utils";

export const tabsListStyles = {
  base: cn("flex h-12 w-fit items-center gap-8", "bg-transparent p-0"),
  wrapper: cn("w-full", "border-secondaryHex-200 dark:border-secondaryHex-800"),
  home: cn(
    "w-full border-secondaryHex-200 dark:border-secondaryHex-800",
    "bg-transparent p-0"
  ),
};
