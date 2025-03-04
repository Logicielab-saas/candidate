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

import { useRef, Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Loader2,
  MoreVertical,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import type ReactPlayer from "react-player";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// Available quality options
const QUALITY_OPTIONS = [
  { label: "Auto", value: "auto" },
  { label: "1080p", value: "1080" },
  { label: "720p", value: "720" },
  { label: "480p", value: "480" },
  { label: "360p", value: "360" },
] as const;

// Available playback speed options
const SPEED_OPTIONS = [
  { label: "0.25x", value: 0.25 },
  { label: "0.5x", value: 0.5 },
  { label: "0.75x", value: 0.75 },
  { label: "Normal", value: 1 },
  { label: "1.25x", value: 1.25 },
  { label: "1.5x", value: 1.5 },
  { label: "1.75x", value: 1.75 },
  { label: "2x", value: 2 },
] as const;

type Quality = (typeof QUALITY_OPTIONS)[number]["value"];
type Speed = (typeof SPEED_OPTIONS)[number]["value"];

// Format time in seconds to MM:SS
function formatTime(seconds: number = 0) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

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
  const [quality, setQuality] = useState<Quality>("auto");
  const [playbackSpeed, setPlaybackSpeed] = useState<Speed>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement to show/hide controls
  useEffect(() => {
    const playerContainer = playerContainerRef.current;
    if (!playerContainer) return;

    const handleMouseMove = () => {
      setIsControlsVisible(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (!seeking) {
          setIsControlsVisible(false);
        }
      }, 2000);
    };

    const handleMouseLeave = () => {
      if (!seeking) {
        setIsControlsVisible(false);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      }
    };

    playerContainer.addEventListener("mousemove", handleMouseMove);
    playerContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      playerContainer.removeEventListener("mousemove", handleMouseMove);
      playerContainer.removeEventListener("mouseleave", handleMouseLeave);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [seeking]);

  // Function to get video URL with quality parameter
  const getVideoUrlWithQuality = (url: string, quality: Quality) => {
    if (quality === "auto") return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}quality=${quality}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 1 : 0);
  };

  const handleSeekChange = (value: number[]) => {
    setPlayed(value[0]);
    if (playerRef.current) {
      playerRef.current.seekTo(value[0], "fraction");
    }
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played);
      setProgress(state.playedSeconds);
    }
  };

  const handlePlaybackRateChange = (speed: Speed) => {
    setPlaybackSpeed(speed);
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();
      if (player) {
        player.playbackRate = speed;
      }
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={playerContainerRef}
        className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black"
      >
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          }
        >
          <ReactPlayerComponent
            ref={playerRef}
            url={getVideoUrlWithQuality(videoUrl, quality)}
            className="aspect-video"
            width="100%"
            height="100%"
            playing={isPlaying}
            volume={volume}
            muted={isMuted}
            playbackRate={playbackSpeed}
            onProgress={handleProgress}
            onDuration={setDuration}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  disablePictureInPicture: true,
                },
              },
            }}
            pip={false}
            stopOnUnmount
          />
        </Suspense>

        {/* Custom controls overlay */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/0 to-transparent p-4 transition-opacity duration-300",
            isControlsVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Progress bar */}
          <div className="mb-4">
            <Slider
              value={[played * 100]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={(value: number[]) =>
                handleSeekChange([value[0] / 100])
              }
              onValueCommit={() => setSeeking(false)}
              className="h-1"
            />
            <div className="mt-1 flex justify-between text-xs text-white">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls bar */}
          <div className="flex items-center gap-4">
            {/* Play/Pause button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>

            {/* Volume control */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                onClick={handleToggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Slider
                value={[volume * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value: number[]) =>
                  handleVolumeChange([value[0] / 100])
                }
                className="w-24"
              />
            </div>

            <div className="flex-1" />

            {/* Settings dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 bg-black/90 text-white backdrop-blur-sm"
              >
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  Playback Settings
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />

                {/* Quality submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center justify-between">
                    <span>Quality</span>
                    <span className="text-xs text-muted-foreground">
                      {
                        QUALITY_OPTIONS.find((opt) => opt.value === quality)
                          ?.label
                      }
                    </span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-black/90 text-white backdrop-blur-sm">
                    {QUALITY_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        className={cn(
                          "flex items-center justify-between",
                          quality === option.value &&
                            "bg-primary/20 text-primary"
                        )}
                        onClick={() => setQuality(option.value)}
                      >
                        {option.label}
                        {quality === option.value && (
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Speed submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center justify-between">
                    <span>Speed</span>
                    <span className="text-xs text-muted-foreground">
                      {playbackSpeed === 1 ? "Normal" : `${playbackSpeed}x`}
                    </span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-black/90 text-white backdrop-blur-sm">
                    {SPEED_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        className={cn(
                          "flex items-center justify-between",
                          playbackSpeed === option.value &&
                            "bg-primary/20 text-primary"
                        )}
                        onClick={() => handlePlaybackRateChange(option.value)}
                      >
                        {option.label}
                        {playbackSpeed === option.value && (
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}
