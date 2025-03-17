import { SectionHeader } from "./SectionHeader";
import { UserCircle } from "lucide-react";
import { mockQualifications } from "@/core/mockData/qualifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AboutMe() {
  const { aboutme } = mockQualifications;
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
            <AvatarImage src="https://placehold.co/150" alt="@USER" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="font-bold">John Doe</p>
            <p className="text-gray-600">john.doe@example.com</p>
            <p className="text-gray-600">(123) 456-7890</p>
          </div>
        </div>
      </div>

      <div>
        <div className="p-2">
          <p>{aboutme}</p>
        </div>
      </div>
    </div>
  );
}
