export const statusStyles = {
  base: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full min-w-[140px] justify-center",
  applied: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  interviewed:
    "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  rejected: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  hired: "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  expired: "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400",
} as const;