import { cn } from "@/lib/utils";
import { HomeHeader } from "@/features/Home/components/HomeHeader";

export default function Home() {
  return (
    <div className={cn("bg-background", "pt-4 md:pt-8", "antialiased")}>
      <div
        className={cn(
          "mx-auto max-w-7xl",
          "px-4 sm:px-6 lg:px-8",
          "pb-24 md:pb-8"
        )}
      >
        <div className={cn("flex flex-col md:flex-row", "gap-8")}>
          <main
            className={cn(
              "flex-1 min-w-0",
              "relative",
              "animate-in fade-in duration-500"
            )}
          >
            <HomeHeader />
          </main>
        </div>
      </div>
    </div>
  );
}
