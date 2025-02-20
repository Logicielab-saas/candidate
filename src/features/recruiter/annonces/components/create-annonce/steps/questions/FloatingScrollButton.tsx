"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingScrollButton() {
  const [show, setShow] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [hasEnoughContent, setHasEnoughContent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Find the main scrollable element
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    const checkContentHeight = () => {
      // Check if content is taller than viewport + buffer (e.g., 300px)
      return mainElement.scrollHeight > mainElement.clientHeight + 300;
    };

    const handleScroll = () => {
      if (!mainElement) return;

      const isTop = mainElement.scrollTop < 100;
      const hasContent = checkContentHeight();

      setIsAtTop(isTop);
      setHasEnoughContent(hasContent);

      // Show button if:
      // 1. We're at the top AND there's enough content to scroll
      // 2. OR we've scrolled down enough to show the up button
      setShow((isTop && hasContent) || mainElement.scrollTop > 200);
    };

    // Initial check
    handleScroll();

    // Add scroll listener to the main element
    mainElement.addEventListener("scroll", handleScroll);

    // Also listen for content changes that might affect height
    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });
    resizeObserver.observe(mainElement);

    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const handleClick = () => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    if (isAtTop) {
      // Scroll to bottom if at top
      mainElement.scrollTo({
        top: mainElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // Scroll to top if not at top
      mainElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (!mounted) return null;

  const floatingElement = (
    <span
      onClick={handleClick}
      className={cn(
        "fixed bottom-24 right-6 z-50 cursor-pointer",
        "text-background transition-colors",
        "dark:bg-primaryHex-900/20 dark:text-primaryHex-400 bg-primaryHex-500",
        "rounded-full p-2 shadow-lg",
        "transition-all duration-300",
        show ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      )}
    >
      {isAtTop && hasEnoughContent ? (
        <ArrowDown className="w-8 h-8 cursor-pointer" />
      ) : (
        <ArrowUp className="w-8 h-8 cursor-pointer" />
      )}
    </span>
  );

  const portalContainer = document.getElementById("floating-elements");
  if (!portalContainer) return null;

  return createPortal(floatingElement, portalContainer);
}
