import { Suspense } from "react";
import { MyJobsContainer } from "@/features/candidature/(profile)/my-jobs/MyJobsContainer";
import LoaderOne from "@/components/ui/loader-one";

export default function MyJobsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <LoaderOne />
        </div>
      }
    >
      <MyJobsContainer />
    </Suspense>
  );
}
