/**
 * FormationDetailsPage - Course details page with modules
 *
 * Displays detailed information about a specific course including modules
 * and their videos in an accordion format
 */

import { redirect } from "next/navigation";
import { CourseHeader } from "@/features/formations/components/formation/CourseHeader";
import { mockCoursesDetails } from "@/core/mockData/courses";
import { CourseModules } from "@/features/formations/components/formation-details/CourseModules";

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
    <div className="container mx-auto px-4 py-8 space-y-8">
      <CourseHeader
        title={course.title}
        review={course.review}
        viewersNum={course.viewersNum}
        progress={course.progress}
        description={course.description}
      />
      <CourseModules modules={course.modules} />
    </div>
  );
}
