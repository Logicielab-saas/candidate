"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CompanyDetails } from "@/core/interfaces";
import { Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

interface CompanyDetailsHeaderProps {
  company: CompanyDetails;
}

export function CompanyDetailsHeader({ company }: CompanyDetailsHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed Company" : "Following Company",
      description: isFollowing
        ? `You are no longer following ${company.name}`
        : `You are now following ${company.name}`,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border bg-card text-card-foreground rounded-lg shadow-sm gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <Avatar className="w-16 h-16 shrink-0">
          <AvatarImage
            src={company.avatarUrl || "https://placehold.co/150"}
            alt={company.name}
          />
          <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold truncate">{company.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center shrink-0">
              <Star className="h-5 w-5 fill-primary text-primary mr-1" />
              <span>{company.rating || 0}</span>
            </div>
            <span className="shrink-0">•</span>
            <span className="shrink-0">{company.reviewsNum || 0} reviews</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 shrink-0">
        <Button
          variant={isFollowing ? "secondary" : "outline"}
          onClick={handleFollowClick}
          className={isFollowing ? "bg-primary/10 hover:bg-primary/20" : ""}
          size="sm"
        >
          {isFollowing ? "Following" : "Follow Company"}
        </Button>
        <Button
          size="sm"
          onClick={() => redirect(`/companies/${company.slug}/write-review`)}
        >
          Write a Review
        </Button>
      </div>
    </div>
  );
}
