import { spanBadgeStyle } from "@/core/styles/span-badge.style";

interface ProfileAboutInfoProps {
  bio: string | null;
  skills: string[] | null;
}

export function ProfileAboutInfo({ bio, skills }: ProfileAboutInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Bio</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {bio ||
            "No about information provided yet. Click edit to add your description."}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium">Skills</h3>
        {skills && skills.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className={spanBadgeStyle}>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            No skills added yet. Click edit to add your skills.
          </p>
        )}
      </div>
    </div>
  );
}
