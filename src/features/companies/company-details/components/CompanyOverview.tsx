"use client";

import { useState } from "react";
import { CompanyDetails } from "@/core/interfaces";
import {
  Building2,
  Globe,
  MapPin,
  Users2,
  Briefcase,
  Calendar,
} from "lucide-react";

interface CompanyOverviewProps {
  company: CompanyDetails;
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = () => {
    if (!company.description) return "No description available.";
    if (company.description.length <= maxLength) return company.description;

    return isExpanded
      ? company.description
      : `${company.description.slice(0, maxLength)}...`;
  };

  return (
    <div className="space-y-6">
      {/* Company Key Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border rounded-lg p-6">
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Size:</span>
          <span>{company.emloyers || "Not specified"} employees</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Location:</span>
          <span>{company.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Website:</span>
          {company.siteUrl ? (
            <a
              href={company.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Visit website
            </a>
          ) : (
            <span>Not available</span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Users2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Total Jobs:</span>
          <span>{company.jobsTotal || 0} open positions</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Industry:</span>
          <span>{company.industry}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Founded:</span>
          <span>
            {new Date(company.dateFounded).toLocaleDateString("en-US", {
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Company Description with Read More */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold">About {company.name}</h3>
        <p className="text-sm text-muted-foreground">{renderDescription()}</p>
      </div>
    </div>
  );
}
