import { cn } from "@/lib/utils";
import { HomeHeader } from "@/features/Home/components/HomeHeader";
import { JobsContainer } from "@/features/Home/components/JobsContainer";

export default function Home() {
  return (
    <div className={cn("bg-background", "min-h-screen", "antialiased")}>
      <div className={cn("mx-auto max-w-7xl", "px-4 sm:px-6 lg:px-8 pt-10")}>
        {/* Header Section */}
        <HomeHeader />

        <JobsContainer />
      </div>
    </div>
  );
}
