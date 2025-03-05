/**
 * FormationDetailsContainer - Main container for course details
 *
 * Manages the course details page layout and state
 *
 * Props:
 * - courseId: string - The ID of the course to display
 */

"use client";

import { useState } from "react";
import { CourseHeader } from "./CourseHeader";
import { VideoPlaylist } from "./VideoPlaylist";
import { VideoPlayer } from "./VideoPlayer";
import { ReviewsSection } from "../reviews/ReviewsSection";
import { mockCoursesDetails } from "@/core/mockData/courses";
import { mockReviews } from "@/core/mockData/reviews";
import { redirect } from "next/navigation";

interface FormationDetailsContainerProps {
  courseId: string;
}

export function FormationDetailsContainer({
  courseId,
}: FormationDetailsContainerProps) {
  const course = mockCoursesDetails.find((c) => c.id === courseId);
  const courseReviews = mockReviews[courseId] || [];

  // Redirect to 404 if course not found
  if (!course) {
    redirect("/notFound");
  }

  const [currentVideoId, setCurrentVideoId] = useState(
    course.startingEpId || course.playlist[0].id
  );
  const currentVideo = course.playlist.find(
    (video) => video.id === currentVideoId
  );

  // Update video selection
  const handleVideoSelect = (videoId: string) => {
    setCurrentVideoId(videoId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CourseHeader
        title={course.title}
        review={course.review}
        viewersNum={course.viewersNum}
        progress={course.progress}
        description={course.description}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Main content column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Video player */}
          {currentVideo && (
            <VideoPlayer
              videoUrl={currentVideo.videoUrl}
              startAt={currentVideo.startAt}
            />
          )}

          {/* Playlist - Shown below video on mobile */}
          <div className="lg:hidden">
            <VideoPlaylist
              videos={course.playlist}
              currentVideoId={currentVideoId}
              onVideoSelect={handleVideoSelect}
            />
          </div>

          {/* Reviews section */}
          <ReviewsSection courseId={courseId} initialReviews={courseReviews} />
        </div>

        {/* Right column: Video playlist - Only visible on desktop */}
        <div className="relative hidden lg:block lg:col-span-1">
          <div className="sticky top-4">
            <VideoPlaylist
              videos={course.playlist}
              currentVideoId={currentVideoId}
              onVideoSelect={handleVideoSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
