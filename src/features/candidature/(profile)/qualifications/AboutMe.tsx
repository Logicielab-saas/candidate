import { SectionHeader } from "./SectionHeader";
import { UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AboutMeProps {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  image: string | null;
  description: string | null;
}

export function AboutMe({
  firstName,
  lastName,
  email,
  phone,
  image,
  description,
}: AboutMeProps) {
  const fullName =
    firstName && lastName ? `${firstName} ${lastName}` : "No name provided";

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
              src={image || "https://placehold.co/150"}
              alt={fullName}
            />
            <AvatarFallback>
              {firstName?.[0]}
              {lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="font-bold">{fullName}</p>
            <p className="text-gray-600">{email || "No email provided"}</p>
            <p className="text-gray-600">{phone || "No phone provided"}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="p-2">
          <p>{description || "No description provided"}</p>
        </div>
      </div>
    </div>
  );
}
