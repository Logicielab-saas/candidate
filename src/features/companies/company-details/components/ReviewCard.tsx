/**
 * ReviewCard - Individual review display component
 *
 * Displays a single review with rating, user info, and report functionality
 */

"use client";

import { CompanyReview } from "@/core/interfaces";
import { User } from "@/core/interfaces/user.interface";
import { Button } from "@/components/ui/button";
import { Star, Flag } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ReviewCardProps {
  review: CompanyReview;
  user: User;
}

export function ReviewCard({ review, user }: ReviewCardProps) {
  const { toast } = useToast();

  const handleReport = () => {
    toast({
      title: "Avis signalé",
      description:
        "Merci de nous avoir signalé cet avis. Nous allons l'examiner.",
    });
  };

  return (
    <div className="py-6 space-y-4">
      {/* Header: User info and rating */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{user.name}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              <span>{review.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(review.createdAt), "d MMMM yyyy", { locale: fr })}
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Flag className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Signaler cet avis</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir signaler cet avis ? Cette action ne
                peut pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleReport}>
                Signaler
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Review content */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">{review.summary}</h3>
        <p className="text-sm">{review.comment}</p>

        {/* Positive Points */}
        {review.positivePoints && review.positivePoints.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-green-600">
              Points positifs
            </h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {review.positivePoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Negative Points */}
        {review.negativePoints && review.negativePoints.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-red-600">
              Points à améliorer
            </h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {review.negativePoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
