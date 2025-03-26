/**
 * Skeleton - UI component for loading state placeholders
 *
 * Used as a loading placeholder that resembles the shape and size of content
 * while data is being fetched. The component uses a subtle animation to indicate
 * that content is loading.
 */

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * CSS classes to apply to the skeleton
   */
  className?: string;
}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      role="status"
      aria-busy="true"
      aria-live="polite"
      {...props}
    />
  );
}

export { Skeleton };
