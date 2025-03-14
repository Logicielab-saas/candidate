import { cn } from "@/lib/utils";

export const defaultStyle = cn(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
);

export const linkLikeButtonStyle = cn(
  defaultStyle,
  "text-sm text-white bg-primary hover:bg-primary/90 items-center justify-center flex gap-2 px-4 py-2 rounded-md"
);

export const GhostLinkStyle = cn(
  defaultStyle,
  "hover:bg-accent hover:text-accent-foreground p-2"
);

export const OutlineLinkStyle = cn(
  defaultStyle,
  "border border-input bg-background hover:bg-accent hover:text-accent-foreground p-2"
);

export const LinkStyle = cn(defaultStyle, "underline-offset-4 hover:underline");
