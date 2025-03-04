/**
 * Video Controls Hook - Manages video player UI controls visibility and settings menu
 *
 * Handles the visibility of video controls and settings menu, including:
 * - Auto-hiding controls after inactivity
 * - Settings menu state management
 * - Mouse interaction handlers
 *
 * @returns {Object} Video controls state and handlers
 * - isControlsVisible: Whether controls are currently visible
 * - settingsMenu: Current settings menu state ("main" | "quality" | "speed")
 * - setSettingsMenu: Function to update settings menu state
 * - isSettingsOpen: Whether settings menu is open
 * - setIsSettingsOpen: Function to update settings menu open state
 * - handleMouseMove: Handler for mouse movement to show controls
 * - handleMouseLeave: Handler for mouse leave to hide controls
 * - handleSettingsClick: Handler for settings button click
 */

import { useState, useRef, useEffect } from "react";

export type SettingsMenuState = "main" | "quality" | "speed";

export function useVideoControls() {
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [settingsMenu, setSettingsMenu] = useState<SettingsMenuState>("main");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Show controls and reset auto-hide timer on mouse movement
   */
  const handleMouseMove = () => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 2000);
  };

  /**
   * Hide controls and clear timer on mouse leave
   */
  const handleMouseLeave = () => {
    setIsControlsVisible(false);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  /**
   * Handle settings button click
   * Prevents event propagation and toggles settings menu
   * @param e - Mouse event
   */
  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSettingsOpen) {
      setSettingsMenu("main");
    }
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return {
    isControlsVisible,
    settingsMenu,
    setSettingsMenu,
    isSettingsOpen,
    setIsSettingsOpen,
    handleMouseMove,
    handleMouseLeave,
    handleSettingsClick,
  };
}
