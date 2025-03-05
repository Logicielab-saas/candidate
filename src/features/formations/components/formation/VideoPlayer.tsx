/**
 * VideoPlayer - Video playback component using react-player
 *
 * Handles video playback with enhanced controls and features
 *
 * Props:
 * - videoUrl: string - The URL of the video to play
 * - description: string - The description of the video
 * - startAt?: number - Optional start time in seconds
 */

"use client";

import { useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import {
  Loader2,
  MoreVertical,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ChevronLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  useVideoPlayer,
  QUALITY_OPTIONS,
  SPEED_OPTIONS,
  formatTime,
} from "@/features/formations/hooks/use-video-player";
import { useVideoControls } from "@/features/formations/hooks/use-video-controls";
import { useFullscreen } from "@/features/formations/hooks/use-fullscreen";

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
  startAt?: number;
}

export function VideoPlayer({ videoUrl, startAt = 0 }: VideoPlayerProps) {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);

  const {
    playerRef,
    quality,
    setQuality,
    playbackSpeed,
    isPlaying,
    volume,
    isMuted,
    progress,
    duration,
    played,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    seeking,
    setSeeking,
    getVideoUrlWithQuality,
    handlePlayPause,
    handleVolumeChange,
    handleToggleMute,
    handleSeekChange,
    handleProgress,
    handlePlaybackRateChange,
    setDuration,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIsPlaying,
  } = useVideoPlayer(videoUrl);

  const {
    isControlsVisible,
    settingsMenu,
    setSettingsMenu,
    isSettingsOpen,
    setIsSettingsOpen,
    handleMouseMove,
    handleMouseLeave,
    handleSettingsClick,
  } = useVideoControls();

  const { isFullscreen, handleFullscreen } = useFullscreen(playerContainerRef);

  return (
    <div className="space-y-4">
      <div
        ref={playerContainerRef}
        className="group/player relative aspect-video w-full overflow-hidden rounded-xl bg-black"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
                forceVideo: true,
              },
            }}
            pip={false}
            stopOnUnmount
            progressInterval={1000}
            onReady={() => {
              if (
                startAt > 0 &&
                playerRef.current &&
                !hasInitializedRef.current
              ) {
                playerRef.current.seekTo(startAt, "seconds");
                hasInitializedRef.current = true;
              }
            }}
          />
        </Suspense>

        {/* Center play/pause button */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className={cn(
              "z-50 flex h-20 w-20 items-center justify-center rounded-full bg-black/60 text-white transition-all duration-300 hover:scale-110",
              isPlaying ? "opacity-0" : "opacity-100",
              isPlaying && isControlsVisible && "group-hover/player:opacity-100"
            )}
            onClick={() => handlePlayPause()}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="h-10 w-10" />
            ) : (
              <Play className="h-10 w-10 pl-1" />
            )}
          </button>
        </div>

        {/* Background overlay - only for visual effect, not clickable */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-300",
            isPlaying ? "opacity-0" : "opacity-100 bg-black/40"
          )}
        />

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
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
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
            <DropdownMenu
              open={isSettingsOpen}
              onOpenChange={setIsSettingsOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={handleSettingsClick}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-56 bg-black/90 text-white backdrop-blur-sm"
              >
                {settingsMenu === "main" && (
                  <>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Playback Settings
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      className="flex items-center justify-between hover:bg-white/10"
                      onSelect={(e) => {
                        e.preventDefault();
                        setSettingsMenu("speed");
                      }}
                    >
                      <span>Playback Speed</span>
                      <span className="text-xs text-muted-foreground">
                        {playbackSpeed === 1 ? "Normal" : `${playbackSpeed}x`}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center justify-between hover:bg-white/10"
                      onSelect={(e) => {
                        e.preventDefault();
                        setSettingsMenu("quality");
                      }}
                    >
                      <span>Quality</span>
                      <span className="text-xs text-muted-foreground">
                        {
                          QUALITY_OPTIONS.find((opt) => opt.value === quality)
                            ?.label
                        }
                      </span>
                    </DropdownMenuItem>
                  </>
                )}

                {settingsMenu === "quality" && (
                  <>
                    <DropdownMenuItem
                      className="flex items-center gap-2 hover:bg-white/10"
                      onSelect={(e) => {
                        e.preventDefault();
                        setSettingsMenu("main");
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Quality</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    {QUALITY_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        className={cn(
                          "flex items-center justify-between hover:bg-white/10",
                          quality === option.value &&
                            "bg-primary/20 text-primary"
                        )}
                        onSelect={(e) => {
                          e.preventDefault();
                          setQuality(option.value);
                          setSettingsMenu("main");
                        }}
                      >
                        {option.label}
                        {quality === option.value && (
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}

                {settingsMenu === "speed" && (
                  <>
                    <DropdownMenuItem
                      className="flex items-center gap-2 hover:bg-white/10"
                      onSelect={(e) => {
                        e.preventDefault();
                        setSettingsMenu("main");
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Playback Speed</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    {SPEED_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        className={cn(
                          "flex items-center justify-between hover:bg-white/10",
                          playbackSpeed === option.value &&
                            "bg-primary/20 text-primary"
                        )}
                        onSelect={(e) => {
                          e.preventDefault();
                          handlePlaybackRateChange(option.value);
                          setSettingsMenu("main");
                        }}
                      >
                        {option.label}
                        {playbackSpeed === option.value && (
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Fullscreen button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={handleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
