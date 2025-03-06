/**
 * FormationDetailsPage - Course details page with modules
 *
 * Displays detailed information about a specific course including modules
 * and their videos in an accordion format with engaging animations
 */

import { redirect } from "next/navigation";
import { CourseDetailsHeader } from "@/features/formations/components/formation-details/CourseDetailsHeader";
import { CourseModules } from "@/features/formations/components/formation-details/CourseModules";
import { mockCoursesDetails } from "@/core/mockData/courses";
import { Card } from "@/components/ui/card";

interface FormationDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function FormationDetailsPage({
  params,
}: FormationDetailsPageProps) {
  const { id } = await params;
  const course = mockCoursesDetails.find((c) => c.id === id);

  if (!course) {
    redirect("/notFound");
  }

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <CourseDetailsHeader
        id={course.id}
        title={course.title}
        description={course.description}
        review={course.review}
        viewersNum={course.viewersNum}
        progress={course.progress}
        imageUrl={course.imageUrl}
        duration={course.duration}
      />

      <Card className="overflow-hidden border bg-card/50">
        <CourseModules modules={course.modules} />
      </Card>
    </div>
  );
}
