/**
 * VideoPlaylist - Course video playlist component
 *
 * Displays a list of course videos with progress indicators
 *
 * Props:
 * - videos: CourseVideo[] - The list of videos to display
 * - currentVideoId: string - The ID of the currently playing video
 * - onVideoSelect: (videoId: string) => void - Callback when a video is selected
 */

"use client";

import { CourseVideo } from "@/core/interfaces/course-video.interface";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Play, PlayCircle } from "lucide-react";
import Image from "next/image";

interface VideoPlaylistProps {
  videos: CourseVideo[];
  currentVideoId: string;
  onVideoSelect: (videoId: string) => void;
}

export function VideoPlaylist({
  videos,
  currentVideoId,
  onVideoSelect,
}: VideoPlaylistProps) {
  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Course Content</h2>
        <div className="space-y-1">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => onVideoSelect(video.id)}
              className={cn(
                "group flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent",
                currentVideoId === video.id && "bg-accent"
              )}
            >
              <div className="relative h-20 w-32 flex-none overflow-hidden rounded-md bg-muted">
                <Image
                  src={video.imageUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100",
                    currentVideoId === video.id && "opacity-100"
                  )}
                >
                  {currentVideoId === video.id ? (
                    <Play className="h-8 w-8 fill-white text-white" />
                  ) : (
                    <PlayCircle className="h-8 w-8 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Lesson {index + 1}
                      </span>
                      {video.progress === 100 && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <h3 className="font-medium leading-tight">{video.title}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground shrink-0">
                    {video.duration}
                  </span>
                </div>
                {video.progress !== undefined && video.progress > 0 && (
                  <div className="space-y-1">
                    <Progress value={video.progress} className="h-1" />
                    <p className="text-xs text-muted-foreground">
                      {video.progress}% complete
                    </p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
