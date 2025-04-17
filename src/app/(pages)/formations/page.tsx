import { FormationsContainer } from "@/features/formations/components/FormationsContainer";
import { Suspense } from "react";
import LoaderOne from "@/components/ui/loader-one";

export default function FormationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <LoaderOne />
        </div>
      }
    >
      <FormationsContainer />
    </Suspense>
  );
}
