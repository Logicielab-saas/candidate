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
import { mockCoursesDetails } from "@/core/mockData/courses";
import { notFound } from "next/navigation";

interface FormationDetailsContainerProps {
  courseId: string;
}

export function FormationDetailsContainer({
  courseId,
}: FormationDetailsContainerProps) {
  const course = mockCoursesDetails.find((c) => c.id === courseId);

  // Redirect to 404 if course not found
  if (!course) {
    notFound();
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
    <div className="container mx-auto space-y-8 px-4 py-8">
      <CourseHeader course={course} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {currentVideo && (
            <VideoPlayer
              videoUrl={currentVideo.videoUrl}
              title={currentVideo.title}
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <VideoPlaylist
            videos={course.playlist}
            currentVideoId={currentVideoId}
            onVideoSelect={handleVideoSelect}
          />
        </div>
      </div>
    </div>
  );
}
