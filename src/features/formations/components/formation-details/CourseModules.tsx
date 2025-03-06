/**
 * CourseModules - Course modules accordion component
 *
 * Displays course modules in an expandable accordion format
 * showing module titles, descriptions, and total duration
 *
 * Props:
 * - modules: CourseModule[] - Array of course modules to display
 */

"use client";

import type { CourseModule } from "@/core/interfaces/course-module.interface";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CourseModulesProps {
  modules: CourseModule[];
}

export function CourseModules({ modules }: CourseModulesProps) {
  // Function to format duration from minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <ScrollArea className="w-full rounded-md border">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Course Modules</h2>
        <Accordion type="single" collapsible className="w-full">
          {modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-1 items-center justify-between pr-4">
                  <div className="space-y-1 text-left">
                    <p className="text-sm font-medium text-muted-foreground">
                      Module {index + 1}
                    </p>
                    <h3 className="font-medium">{module.title}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDuration(module.duration)}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 px-4 pt-2">
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                  <div className="space-y-2">
                    {module.videos.map((video, videoIndex) => (
                      <div
                        key={video.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">
                            Lesson {videoIndex + 1}
                          </p>
                          <h4 className="text-sm font-medium">{video.title}</h4>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {video.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
}
