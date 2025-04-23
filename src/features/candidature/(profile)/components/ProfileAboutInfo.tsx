import { spanBadgeStyle } from "@/core/styles/span-badge.style";
import { useTranslations } from "next-intl";

interface ProfileAboutInfoProps {
  bio: string | null;
  skills: string[] | null;
}

export function ProfileAboutInfo({ bio, skills }: ProfileAboutInfoProps) {
  const tCommon = useTranslations("common");

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{tCommon("labels.bio")}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {bio || tCommon("placeholders.noBioWithEdit")}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium">{tCommon("skills")}</h3>
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
            {tCommon("placeholders.noSkills")}
          </p>
        )}
      </div>
    </div>
  );
}
