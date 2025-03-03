import { spanBadgeStyle } from "@/core/styles/span-badge.style";

export function ProfileAboutInfo() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">About</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          I am a software developer with a passion for building beautiful and
          functional web applications.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium">Skills</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"].map(
            (skill) => (
              <span key={skill} className={spanBadgeStyle}>
                {skill}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
