"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CompanyDetails } from "@/core/interfaces";
import { Bell, BellOff, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { linkLikeButtonStyle } from "@/core/styles/links";
interface CompanyDetailsHeaderProps {
  company: CompanyDetails;
}

export function CompanyDetailsHeader({ company }: CompanyDetailsHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing
        ? "Notifications désactivées"
        : "Notifications activées",
      description: isFollowing
        ? `Vous ne recevrez plus de notifications pour ${company.name}`
        : `Vous recevrez des notifications pour les nouveaux postes et actualités de ${company.name}`,
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
            <span className="shrink-0">{company.reviewsNum || 0} avis</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 shrink-0">
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              <Button
                variant={isFollowing ? "secondary" : "outline"}
                onClick={handleFollowClick}
                className={
                  isFollowing ? "bg-primary/10 hover:bg-primary/20" : ""
                }
                size="sm"
              >
                <span className="flex items-center gap-2">
                  {isFollowing ? (
                    <>
                      <BellOff className="h-4 w-4" />
                      Ne plus suivre
                    </>
                  ) : (
                    <>
                      <Bell className="h-4 w-4" />
                      Suivre
                    </>
                  )}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] p-3">
              <p>
                {isFollowing
                  ? "Désactiver les notifications pour les nouveaux postes et actualités de cette entreprise"
                  : "Recevez des notifications par email pour les nouveaux postes, événements et actualités de cette entreprise"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Link
          href={`/companies/${company.slug}/write-review`}
          target="_blank"
          className={linkLikeButtonStyle}
        >
          Écrire un avis
        </Link>
      </div>
    </div>
  );
}
