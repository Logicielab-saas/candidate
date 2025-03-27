/**
 * NotAuthorizedPage - Displays when users attempt to access restricted content
 *
 * A professional error page that informs users they don't have permission
 * and provides options to either go back or login
 */

import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotAuthorizedPage() {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6 text-center">
        <div className="rounded-full bg-red-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Access Denied
        </h1>

        <p className="text-gray-600 mb-6">
          Sorry, you don&apos;t have permission to access this page. Please log
          in with appropriate credentials or contact support if you think this
          is a mistake.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>

          <Button variant="default" className="flex items-center gap-2" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
