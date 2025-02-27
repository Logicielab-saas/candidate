import { SectionHeader } from "./SectionHeader";
import { UserCircle } from "lucide-react";
import { mockQualifications } from "@/core/mockData/qualifications";

export function AboutMe() {
  const { aboutme } = mockQualifications;
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="About Me"
        icon={<UserCircle className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onEdit={() => {}}
      />
      <div className="p-2">
        <p>{aboutme}</p>
      </div>
    </div>
  );
}
