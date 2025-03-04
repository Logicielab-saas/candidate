/**
 * VideoPlayer - Video playback component
 *
 * Handles video playback with custom controls and auto-thumbnail generation
 *
 * Props:
 * - videoUrl: string - The URL of the video to play
 * - title: string - The title of the video
 */

"use client";

import { useRef, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  // Function to generate thumbnail from video
  const generateThumbnail = async (video: HTMLVideoElement) => {
    try {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the video frame to canvas
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob URL
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((blob) => resolve(blob as Blob), "image/jpeg", 0.95)
      );
      const url = URL.createObjectURL(blob);

      // Clean up the old thumbnail URL if it exists
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }

      setThumbnailUrl(url);
    } catch (error) {
      console.error("Error generating thumbnail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset video when URL changes
  useEffect(() => {
    if (videoRef.current) {
      setIsLoading(true);
      const video = videoRef.current;

      // Reset video and thumbnail
      video.load();
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
        setThumbnailUrl("");
      }

      const handleLoadedData = () => {
        // Set time to 1 second for thumbnail generation
        video.currentTime = 1;
      };

      const handleSeeked = () => {
        generateThumbnail(video);
        // Reset to start after generating thumbnail
        video.currentTime = 0;
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("seeked", handleSeeked);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("seeked", handleSeeked);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  // Cleanup thumbnail URL on component unmount
  useEffect(() => {
    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailUrl]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
        <video
          ref={videoRef}
          className="h-full w-full"
          controls
          controlsList="nodownload"
          poster={thumbnailUrl}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}
