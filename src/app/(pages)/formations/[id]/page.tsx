/**
 * FormationDetailsPage - Course details page
 *
 * Displays detailed information about a specific course
 */

import { FormationDetailsContainer } from "@/features/formations/components/formation/FormationDetailsContainer";
import { Metadata } from "next";
import { mockCoursesDetails } from "@/core/mockData/courses";

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
  return <FormationDetailsContainer courseId={id} />;
}
