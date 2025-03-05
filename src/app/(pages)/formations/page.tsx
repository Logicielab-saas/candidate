import { FormationsContainer } from "@/features/formations/components/FormationsContainer";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function FormationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <FormationsContainer />
    </Suspense>
  );
}
