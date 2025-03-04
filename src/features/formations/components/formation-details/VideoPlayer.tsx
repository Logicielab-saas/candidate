/**
 * VideoPlayer - Video playback component using react-player
 *
 * Handles video playback with enhanced controls and features
 *
 * Props:
 * - videoUrl: string - The URL of the video to play
 * - title: string - The title of the video
 */

"use client";

import { useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type ReactPlayer from "react-player";

// Dynamically import ReactPlayer with no SSR to avoid hydration issues
const ReactPlayerComponent = dynamic(() => import("react-player/lazy"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  ),
});

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          }
        >
          <ReactPlayerComponent
            ref={playerRef}
            url={videoUrl}
            className="aspect-video"
            width="100%"
            height="100%"
            controls
            playsinline
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  disablePictureInPicture: true,
                },
              },
            }}
            // Performance optimizations
            pip={false}
            stopOnUnmount
            fallback={<div className="h-full w-full animate-pulse bg-muted" />}
          />
        </Suspense>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}
