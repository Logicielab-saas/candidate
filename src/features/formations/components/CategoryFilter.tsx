/**
 * CategoryFilter - Course category filtering component
 *
 * Displays an interactive list of course categories with counts
 * Uses a horizontal scrollable design for mobile and a grid for larger screens
 *
 * Props:
 * - selectedCategory: string | null - Currently selected category
 * - onCategoryChange: (category: string | null) => void - Category selection handler
 * - categoryCounts: Record<string, number> - Number of courses in each category
 */

"use client";

import { CourseCategory } from "@/core/types";
import { cn } from "@/lib/utils";
import {
  Blocks,
  Brain,
  Code2,
  Database,
  Cloud,
  Shield,
  Gamepad2,
  Boxes,
  Palette,
  BarChart,
  Briefcase,
  MoreHorizontal,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: CourseCategory | null) => void;
  categoryCounts: Record<string, number>;
}

// Category metadata with icons and labels
const CATEGORIES: {
  value: CourseCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
}[] = [
  {
    value: "web",
    label: "Web Dev",
    icon: Code2,
    className: "bg-blue-500/10 text-blue-500",
  },
  {
    value: "mobile",
    label: "Mobile",
    icon: Blocks,
    className: "bg-orange-500/10 text-orange-500",
  },
  {
    value: "data",
    label: "Data",
    icon: Database,
    className: "bg-yellow-500/10 text-yellow-500",
  },
  {
    value: "cloud",
    label: "Cloud",
    icon: Cloud,
    className: "bg-sky-500/10 text-sky-500",
  },
  {
    value: "ai",
    label: "AI & ML",
    icon: Brain,
    className: "bg-purple-500/10 text-purple-500",
  },
  {
    value: "security",
    label: "Security",
    icon: Shield,
    className: "bg-red-500/10 text-red-500",
  },
  {
    value: "game",
    label: "Gaming",
    icon: Gamepad2,
    className: "bg-green-500/10 text-green-500",
  },
  {
    value: "blockchain",
    label: "Blockchain",
    icon: Boxes,
    className: "bg-indigo-500/10 text-indigo-500",
  },
  {
    value: "design",
    label: "Design",
    icon: Palette,
    className: "bg-pink-500/10 text-pink-500",
  },
  {
    value: "marketing",
    label: "Marketing",
    icon: BarChart,
    className: "bg-teal-500/10 text-teal-500",
  },
  {
    value: "business",
    label: "Business",
    icon: Briefcase,
    className: "bg-gray-500/10 text-gray-500",
  },
  {
    value: "other",
    label: "Other",
    icon: MoreHorizontal,
    className: "bg-zinc-500/10 text-zinc-500",
  },
];

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  categoryCounts,
}: CategoryFilterProps) {
  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 p-2 pr-8">
          <button
            onClick={() => onCategoryChange(null)}
            className={cn(
              "inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              !selectedCategory
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-background"
            )}
          >
            All Courses
            <span className="ml-2 rounded-md bg-background/20 px-1.5 py-0.5 text-xs font-semibold">
              {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
            </span>
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                "hover:bg-accent hover:text-accent-foreground",
                selectedCategory === category.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background"
                //* !categoryCounts[category.value] && "opacity-50"
              )}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-xs font-semibold",
                  selectedCategory === category.value
                    ? "bg-background/20"
                    : category.className
                )}
              >
                {categoryCounts[category.value] || 0}
              </span>
            </button>
          ))}
        </div>
        <ScrollBar
          orientation="horizontal"
          className="flex h-2.5 touch-none select-none transition-colors ease-out hover:bg-accent"
        />
      </ScrollArea>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-background/0" />
    </div>
  );
}
