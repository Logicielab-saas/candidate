import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit, FileText, MoreVertical } from "lucide-react";
import Link from "next/link";

export function ProfileContainer() {
  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-end">
        <Link href="/edit/profile">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div>
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold">
                Sarah Connor
              </h3>
              <p className="text-sm text-muted-foreground">sarah@example.com</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">About</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                I am a software developer with a passion for building beautiful
                and functional web applications.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Next.js",
                  "Tailwind CSS",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                <p>+1 234 567 890</p>
                <p>San Francisco, CA</p>
                <p>United States</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Social Links</h3>
              <div className="mt-2 space-y-2">
                <a
                  href="#"
                  className="block text-sm text-primary hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="block text-sm text-primary hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">CV</h3>
            <div className="space-y-3">
              {/* Postuly CV */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">IndeedCV</p>
                    <p className="text-xs text-muted-foreground">Non validé</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              {/* Personal Resume */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Resume_LASTNAME.pdf</p>
                    <p className="text-xs text-muted-foreground">
                      Ajouté le 19 Fev 2024
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
