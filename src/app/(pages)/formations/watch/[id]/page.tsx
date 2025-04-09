/**
 * FormationDetailsPage - Course details page
 *
 * Displays detailed information about a specific course
 */

import { redirect } from "next/navigation";
import { CourseHeader } from "@/features/formations/components/formation/CourseHeader";
import { FormationDetailsContainer } from "@/features/formations/components/formation/FormationDetailsContainer";
import { Metadata } from "next";
import { mockCoursesDetails } from "@/core/mockData/courses";
import { mockReviews } from "@/core/mockData/reviews";

interface FormationDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: FormationDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = mockCoursesDetails.find((c) => c.id === id);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course.title,
    description: course.description.split("\n")[0], // First line of description
  };
}

export default async function FormationDetailsPage({
  params,
}: FormationDetailsPageProps) {
  const { id } = await params;
  const course = mockCoursesDetails.find((c) => c.id === id);
  if (!course) redirect("/notFound");
  const reviews = mockReviews[course.id] || [];
  const startingEpId = course.startingEpId || course.playlist?.[0]?.id;
  return (
    <>
      <CourseHeader
        title={course.title}
        review={course.review}
        viewersNum={course.viewersNum}
        progress={course.progress}
        description={course.description}
        courseId={course.id}
      />
      <FormationDetailsContainer
        course={course}
        reviews={reviews}
        startingEpId={startingEpId || ""}
      />
    </>
  );
}
