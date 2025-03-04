/**
 * Video Player Hook - Manages video playback state and controls
 *
 * Provides core video functionality including:
 * - Playback controls (play/pause, volume, quality, speed)
 * - Progress tracking and seeking
 * - Quality and speed settings
 * - Volume controls
 * - Keyboard shortcuts (space for play/pause)
 *
 * @param videoUrl - The URL of the video to play
 *
 * @returns {Object} Video player state and handlers
 * - playerRef: Reference to the ReactPlayer instance
 * - quality: Current video quality setting
 * - setQuality: Function to update video quality
 * - playbackSpeed: Current playback speed
 * - isPlaying: Whether video is currently playing
 * - setIsPlaying: Function to update video play state
 * - volume: Current volume level (0-1)
 * - isMuted: Whether audio is muted
 * - progress: Current playback progress in seconds
 * - duration: Total video duration in seconds
 * - played: Playback progress as fraction (0-1)
 * - seeking: Whether user is currently seeking
 * - setSeeking: Function to update seeking state
 * - getVideoUrlWithQuality: Function to get URL with quality parameter
 * - handlePlayPause: Toggle play/pause
 * - handleVolumeChange: Update volume level
 * - handleToggleMute: Toggle mute state
 * - handleSeekChange: Update playback position
 * - handleProgress: Update progress state
 * - handlePlaybackRateChange: Update playback speed
 * - setDuration: Update video duration
 */

import { useState, useRef, useEffect } from "react";
import type ReactPlayer from "react-player";

// Available quality options
export const QUALITY_OPTIONS = [
  { label: "Auto", value: "auto" },
  { label: "1080p", value: "1080" },
  { label: "720p", value: "720" },
  { label: "480p", value: "480" },
  { label: "360p", value: "360" },
] as const;

// Available playback speed options
export const SPEED_OPTIONS = [
  { label: "0.25x", value: 0.25 },
  { label: "0.5x", value: 0.5 },
  { label: "0.75x", value: 0.75 },
  { label: "Normal", value: 1 },
  { label: "1.25x", value: 1.25 },
  { label: "1.5x", value: 1.5 },
  { label: "1.75x", value: 1.75 },
  { label: "2x", value: 2 },
] as const;

export type Quality = (typeof QUALITY_OPTIONS)[number]["value"];
export type Speed = (typeof SPEED_OPTIONS)[number]["value"];

/**
 * Format time in seconds to MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted time string (MM:SS)
 */
export function formatTime(seconds: number = 0) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function useVideoPlayer(_videoUrl: string) {
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

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle space if not typing in an input/textarea
      if (
        e.code === "Space" &&
        e.target instanceof Element &&
        !["INPUT", "TEXTAREA"].includes(e.target.tagName)
      ) {
        e.preventDefault(); // Prevent page scroll
        handlePlayPause();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  /**
   * Get video URL with quality parameter
   * @param url - Base video URL
   * @param quality - Desired quality setting
   * @returns URL with quality parameter
   */
  const getVideoUrlWithQuality = (url: string, quality: Quality) => {
    if (quality === "auto") return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}quality=${quality}`;
  };

  /**
   * Toggle video play/pause state
   */
  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  /**
   * Update volume level and mute state
   * @param value - New volume level (0-1)
   */
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  /**
   * Toggle mute state and restore previous volume
   */
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 1 : 0);
  };

  /**
   * Update video playback position
   * @param value - New position as fraction (0-1)
   */
  const handleSeekChange = (value: number[]) => {
    setPlayed(value[0]);
    if (playerRef.current) {
      playerRef.current.seekTo(value[0], "fraction");
    }
  };

  /**
   * Update progress state during playback
   * @param state - Current playback state
   */
  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played);
      setProgress(state.playedSeconds);
    }
  };

  /**
   * Update video playback speed
   * @param speed - New playback speed
   */
  const handlePlaybackRateChange = (speed: Speed) => {
    setPlaybackSpeed(speed);
    if (playerRef.current) {
      const player = playerRef.current.getInternalPlayer();
      if (player) {
        player.playbackRate = speed;
      }
    }
  };

  return {
    playerRef,
    quality,
    setQuality,
    playbackSpeed,
    isPlaying,
    setIsPlaying,
    volume,
    isMuted,
    progress,
    duration,
    played,
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
  };
}
