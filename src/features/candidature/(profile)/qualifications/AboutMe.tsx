import { SectionHeader } from "./SectionHeader";
import { UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileResume } from "./hooks/use-profile-resume";
import { AboutMeSkeleton } from "./skeletons/AboutMeSkeleton";

export function AboutMe() {
  const { data: resume, isLoading, error } = useProfileResume();

  if (error) {
    return (
      <div className="border p-4 rounded-lg shadow-sm">
        <p className="text-red-500">
          Failed to load profile data. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <AboutMeSkeleton />;
  }

  const fullName =
    resume?.first_name && resume?.last_name
      ? `${resume.first_name} ${resume.last_name}`
      : "No name provided";

  return (
    <div className="border p-4 rounded-lg shadow-sm space-y-6">
      <SectionHeader
        title="About Me"
        icon={<UserCircle className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onEdit={() => {}}
      />
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Avatar className="h-24 w-24 mr-4">
            <AvatarImage
              src={resume?.image || "https://placehold.co/150"}
              alt={fullName}
            />
            <AvatarFallback>
              {resume?.first_name?.[0]}
              {resume?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="font-bold">{fullName}</p>
            <p className="text-gray-600">
              {resume?.email || "No email provided"}
            </p>
            <p className="text-gray-600">
              {resume?.phone || "No phone provided"}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="p-2">
          <p>{resume?.resume?.description || "No description provided"}</p>
        </div>
      </div>
    </div>
  );
}
