import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Annonce } from "@/core/mockData/annonces";
import { Avatar } from "@radix-ui/react-avatar";
import { Building2, MapPin, Share2, Users2 } from "lucide-react";

interface AnnonceHeaderProps {
  annonce: Annonce;
}

export function AnnonceHeader({ annonce }: AnnonceHeaderProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-6">
        {/* Company Logo */}
        <div className="relative h-16 w-16">
          <Avatar>
            <AvatarImage
              src="/placeholder.png"
              alt={annonce.baseInformation.jobTitle}
            />
            <AvatarFallback>
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">
                {annonce.baseInformation.jobTitle}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  {annonce.baseInformation.promotionLocation}
                </span>
                <span className="text-xs">•</span>
                <Users2 className="h-4 w-4" />
                <span className="text-sm">
                  {annonce.baseInformation.numberOfPeople} poste
                  {annonce.baseInformation.numberOfPeople !== "1" && "s"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {annonce.jobTypeInformation.contractTypes.map((type) => (
              <Badge key={type} variant="secondary">
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
