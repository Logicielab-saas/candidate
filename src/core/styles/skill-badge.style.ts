import { cn } from "@/lib/utils";

export function getSkillBadgeStyle(_level?: number) {
  return cn(
    "group flex items-start justify-between hover:bg-accent/50 transition-colors px-3 py-2 bg-card text-card-foreground hover:border-primary/50 border  rounded-lg"
  );
}

export function getSkillLevelBadgeStyle(level: number) {
  return cn(
    "w-fit text-xs",
    level === 5 && "bg-primary/20 text-primary hover:bg-primary/30",
    level === 4 && "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30",
    level === 3 && "bg-green-500/20 text-green-600 hover:bg-green-500/30",
    level === 2 && "bg-orange-500/20 text-orange-600 hover:bg-orange-500/30",
    level === 1 && "bg-red-500/20 text-red-600 hover:bg-red-500/30"
  );
}
