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
              <span
                key={skill}
                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
