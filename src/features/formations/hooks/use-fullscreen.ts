/**
 * Fullscreen Hook - Manages video player fullscreen functionality
 *
 * Handles fullscreen state and interactions, including:
 * - Fullscreen toggle with F key
 * - Double-click to toggle fullscreen
 * - Proper fullscreen API handling
 * - Cleanup on unmount
 *
 * @param containerRef - Reference to the container element to make fullscreen
 *
 * @returns {Object} Fullscreen state and handlers
 * - isFullscreen: Whether the player is currently in fullscreen mode
 * - handleFullscreen: Function to toggle fullscreen state
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const { isFullscreen, handleFullscreen } = useFullscreen(containerRef);
 * ```
 */

import { useState, useEffect, RefObject } from "react";

export function useFullscreen(containerRef: RefObject<HTMLDivElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update fullscreen state when browser fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Handle keyboard shortcuts and double-click
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /**
     * Handle F key press for fullscreen toggle
     * @param e - Keyboard event
     */
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        (e.key === "f" || e.key === "F") &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        e.preventDefault();
        handleFullscreen();
      }
    };

    /**
     * Handle double-click for fullscreen toggle
     * @param e - Mouse event
     */
    const handleDoubleClick = (e: MouseEvent) => {
      e.preventDefault();
      handleFullscreen();
    };

    container.addEventListener("dblclick", handleDoubleClick);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      container.removeEventListener("dblclick", handleDoubleClick);
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

  /**
   * Toggle fullscreen state using the Fullscreen API
   * Handles both entering and exiting fullscreen mode
   */
  const handleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!isFullscreen) {
        await container.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  return {
    isFullscreen,
    handleFullscreen,
  };
}
