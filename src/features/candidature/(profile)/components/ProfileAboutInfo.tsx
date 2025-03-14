// import { spanBadgeStyle } from "@/core/styles/span-badge.style";

export function ProfileAboutInfo() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">About</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          No about information provided yet. Click edit to add your description.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium">Skills</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          No skills added yet. Click edit to add your skills.
        </p>
      </div>
    </div>
  );
}
