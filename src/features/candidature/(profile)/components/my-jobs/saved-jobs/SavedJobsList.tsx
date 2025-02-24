"use client";

import { SavedJobItem } from "./SavedJobItem";

// This would typically come from your API/state management
const mockSavedJobs = [
  {
    id: "1",
    title: "développement web",
    company: "TECHWEB",
    location: "Tanger",
    savedDate: "aujourd'hui",
  },
  {
    id: "2",
    title: "Développeur Frontend React",
    company: "Digital Agency",
    location: "Casablanca",
    savedDate: "hier",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "Tech Solutions",
    location: "Rabat",
    savedDate: "20 Feb 2024",
  },
];

export function SavedJobsList() {
  const handleApply = (jobId: string) => {
    console.log("Applying to job:", jobId);
    // Implement apply logic
  };

  const handleRemove = (jobId: string) => {
    console.log("Removing job:", jobId);
    // Implement remove logic
  };

  return (
    <div className="divide-y divide-border">
      {mockSavedJobs.map((job) => (
        <SavedJobItem
          key={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          savedDate={job.savedDate}
          onApply={() => handleApply(job.id)}
          onRemove={() => handleRemove(job.id)}
        />
      ))}
    </div>
  );
}
