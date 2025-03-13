/**
 * CompanyCard - Individual company card component
 *
 * Displays company information including:
 * - Company avatar and name
 * - Rating and location
 * - Review count and total jobs
 * - Company description
 */

import { Company } from "@/core/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const {
    name,
    avatarUrl,
    rating,
    location,
    reviewsNum,
    jobsTotal,
    description,
  } = company;

  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const companySlug =
    name.toLowerCase().replace(/\s+/g, "-") + "-" + company.id;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border-primary hover:border-2">
      <CardContent className="p-6">
        <Link href={`/companies/${companySlug}`} className="block">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            {/* Company Info */}
            <div className="flex-1 space-y-1.5">
              <h3 className="font-semibold leading-none text-lg text-primaryHex-800">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({reviewsNum} avis)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        </Link>
      </CardContent>

      <CardFooter
        className={cn("flex items-center justify-between", "p-6 pt-0")}
      >
        <Link
          href={`/home?q=${company.name}`}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-secondaryHex-800 dark:text-secondaryHex-100 font-semibold">
            {jobsTotal}{" "}
          </span>
          <span className="text-primary">offres d&apos;emploi</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
