/**
 * VideoPlaylist - Course video playlist component
 *
 * Displays a list of course videos with progress indicators and dynamically generated thumbnails
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
import { CheckCircle2, Loader2, Play, PlayCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface VideoPlaylistProps {
  videos: CourseVideo[];
  currentVideoId: string;
  onVideoSelect: (videoId: string) => void;
}

interface ThumbnailCache {
  [key: string]: string;
}

export function VideoPlaylist({
  videos,
  currentVideoId,
  onVideoSelect,
}: VideoPlaylistProps) {
  const [thumbnails, setThumbnails] = useState<ThumbnailCache>({});
  const [loadingThumbnails, setLoadingThumbnails] = useState<Set<string>>(
    new Set()
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to generate thumbnail from video
  const generateThumbnail = async (videoUrl: string, videoId: string) => {
    if (thumbnails[videoId] || loadingThumbnails.has(videoId)) return;

    setLoadingThumbnails((prev) => new Set([...prev, videoId]));

    try {
      const video = videoRef.current;
      if (!video) return;

      // Set video source and load it
      video.src = videoUrl;
      await video.load();

      // Wait for metadata to load
      await new Promise((resolve) => {
        video.addEventListener("loadeddata", resolve, { once: true });
      });

      // Seek to 1 second
      video.currentTime = 1;
      await new Promise((resolve) => {
        video.addEventListener("seeked", resolve, { once: true });
      });

      // Create canvas and draw video frame
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to blob URL
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((blob) => resolve(blob as Blob), "image/jpeg", 0.7)
      );
      const thumbnailUrl = URL.createObjectURL(blob);

      setThumbnails((prev) => ({
        ...prev,
        [videoId]: thumbnailUrl,
      }));
    } catch (error) {
      console.error("Error generating thumbnail:", error);
    } finally {
      setLoadingThumbnails((prev) => {
        const next = new Set(prev);
        next.delete(videoId);
        return next;
      });
    }
  };

  // Generate thumbnails for visible videos
  useEffect(() => {
    videos.forEach((video) => {
      generateThumbnail(video.videoUrl, video.id);
    });

    // Cleanup thumbnails on unmount
    return () => {
      Object.values(thumbnails).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos, generateThumbnail]);

  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Course Content</h2>
        <div className="space-y-1">
          {/* Hidden video element for thumbnail generation */}
          <video
            ref={videoRef}
            className="hidden"
            preload="metadata"
            muted
            playsInline
          />

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
                {loadingThumbnails.has(video.id) ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  thumbnails[video.id] && (
                    <Image
                      src={thumbnails[video.id]}
                      alt={video.title}
                      fill
                      className="h-full w-full object-cover"
                    />
                  )
                )}
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
                    {video.timing}
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
