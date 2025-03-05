/**
 * FormationDetailsContainer - Main container for course details
 *
 * Manages the course details page layout and state
 *
 * Props:
 * - course: CourseDetails - The course details to display
 * - reviews: CourseReview[] - The reviews for the course
 */

"use client";

import { useState } from "react";
import { VideoPlaylist } from "./VideoPlaylist";
import { VideoPlayer } from "./VideoPlayer";
import { ReviewsSection } from "../reviews/ReviewsSection";
import type { CourseDetails } from "@/core/interfaces/course-details.interface";
import type { CourseReview } from "@/core/interfaces/course-review.interface";

interface FormationDetailsContainerProps {
  course: CourseDetails;
  reviews: CourseReview[];
}

export function FormationDetailsContainer({
  course,
  reviews,
}: FormationDetailsContainerProps) {
  const [currentVideoId, setCurrentVideoId] = useState(
    course.startingEpId || course.playlist[0].id
  );
  const currentVideo = course.playlist.find(
    (video) => video.id === currentVideoId
  );

  const handleVideoSelect = (videoId: string) => {
    setCurrentVideoId(videoId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
          <ReviewsSection courseId={course.id} initialReviews={reviews} />
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
