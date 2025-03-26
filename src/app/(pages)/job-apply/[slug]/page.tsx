import { JobApplyContainer } from "@/features/job-apply/components/JobApplyContainer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LoaderOne from "@/components/ui/loader-one";

interface JobApplyPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function JobApplyPage({ params }: JobApplyPageProps) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="container py-8 max-w-7xl">
          <div className="mb-8">
            <Skeleton className="h-12 w-96 mx-auto mb-2" />
            <Skeleton className="h-6 w-[500px] mx-auto" />
          </div>

          {/* Step indicator skeleton */}
          <div className="flex justify-between items-center max-w-2xl mx-auto mb-8">
            <LoaderOne />
          </div>
        </div>
      }
    >
      <JobApplyContainer slug={slug} />
    </Suspense>
  );
}
