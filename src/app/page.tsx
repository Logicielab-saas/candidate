import { cn } from "@/lib/utils";
import { HomeHeader } from "@/features/Home/components/HomeHeader";
import { JobsList } from "@/features/Home/components/JobsList";
import { JobDetails } from "@/features/Home/components/JobDetails";

export default function Home() {
  return (
    <div className={cn("bg-background", "min-h-screen", "antialiased")}>
      <div className={cn("mx-auto max-w-7xl", "px-4 sm:px-6 lg:px-8 pt-10")}>
        {/* Header Section */}
        <HomeHeader />

        {/* Split View Layout */}
        <div className={cn("grid grid-cols-1 lg:grid-cols-2", "gap-8 pt-10")}>
          {/* Jobs List Section */}
          <div className="lg:border-r lg:pr-8">
            <JobsList />
          </div>

          {/* Job Details Section - Will be implemented later */}
          <div className="hidden lg:block">
            <JobDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
