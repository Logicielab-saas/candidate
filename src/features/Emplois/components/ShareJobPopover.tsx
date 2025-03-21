/**
 * ShareJobPopover - Modern sharing interface with social platforms
 *
 * Features:
 * - Animated popover interface with Framer Motion
 * - Share on various social platforms with hover effects
 * - Copy link with feedback
 * - Uses Web Share API when available
 * - Smooth animations and transitions
 * - Auto-closes after any action
 */

"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Twitter,
  Linkedin,
  Facebook,
  Link,
  Share2,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface ShareJobPopoverProps {
  jobTitle: string;
  companyName: string;
  jobLocation: string;
}

// Create motion components
const MotionButton = motion.create(Button);
const MotionSpan = motion.span;

const buttonVariants = {
  initial: { opacity: 0, y: -5 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export function ShareJobPopover({
  jobTitle,
  companyName,
  jobLocation,
}: ShareJobPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const pathname = usePathname();
  const shareUrl = process.env.NEXT_PUBLIC_APP_URL + pathname;

  // Generate platform-specific sharing text
  const getShareText = (platform?: "twitter" | "linkedin" | "facebook") => {
    const baseText = `${jobTitle} chez ${companyName} à ${jobLocation}`;

    switch (platform) {
      case "twitter":
        return `🚀 Nouvelle opportunité : ${baseText}\n\n`;
      case "linkedin":
        return `Je viens de découvrir cette offre d'emploi intéressante :\n\n📍 ${baseText}\n\n#Opportunité`;
      case "facebook":
        return `📢 Découvrez cette offre d'emploi :\n\n${baseText}`;
      default:
        return `Découvrez cette offre d'emploi : ${baseText}`;
    }
  };

  // Handle native sharing if available
  const handleNativeShare = async () => {
    if (!canUseShareApi) return;

    const shareText = getShareText();
    const fullText = `${shareText}\n\n${shareUrl}`;

    try {
      await navigator.share({
        title: `Offre d'emploi : ${jobTitle}`,
        text: fullText,
        url: shareUrl,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Handle social platform sharing
  const handleSocialShare = (platform: "twitter" | "linkedin" | "facebook") => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(getShareText(platform));
    let shareLink = "";

    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "linkedin":
        // LinkedIn's sharing URL structure
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`;
        break;
      case "facebook":
        // Facebook allows both URL and quote
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
    }

    window.open(shareLink, "_blank", "width=600,height=400");
    setIsOpen(false);
  };

  // Handle copy link with text
  const handleCopyLink = async () => {
    const textToCopy = `${getShareText()}\n\n${shareUrl}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Lien copié",
        description:
          "Le lien et la description de l'offre ont été copiés dans le presse-papier",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error copying link:", error);
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien",
        variant: "destructive",
      });
    }
  };

  // Handle WhatsApp share
  const handleWhatsAppShare = () => {
    const shareText = getShareText();
    const fullText = `${shareText}\n\n${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  // Check if Web Share API is available
  const canUseShareApi = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <MotionSpan
          className={cn(
            "h-9 w-9 flex items-center justify-center cursor-pointer",
            "text-current hover:text-current/80 hover:bg-accent rounded-full"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="h-6 w-6" />
        </MotionSpan>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-2" sideOffset={5}>
        <AnimatePresence>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Native Share Button - Only show if Web Share API is available */}
            {canUseShareApi && (
              <MotionButton
                variant="ghost"
                className="w-full justify-start"
                onClick={handleNativeShare}
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={0}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Partager
              </MotionButton>
            )}

            {/* WhatsApp Button */}
            <MotionButton
              variant="ghost"
              className={cn(
                "w-full justify-start",
                "hover:bg-[#25D366] hover:text-white transition-colors"
              )}
              onClick={handleWhatsAppShare}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={1}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </MotionButton>

            {/* Social Platform Buttons */}
            <MotionButton
              variant="ghost"
              className={cn(
                "w-full justify-start",
                "hover:bg-[#1DA1F2] hover:text-white transition-colors"
              )}
              onClick={() => handleSocialShare("twitter")}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={2}
            >
              <Twitter className="h-5 w-5 mr-2" />
              Twitter
            </MotionButton>

            <MotionButton
              variant="ghost"
              className={cn(
                "w-full justify-start",
                "hover:bg-[#0A66C2] hover:text-white transition-colors"
              )}
              onClick={() => handleSocialShare("linkedin")}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={3}
            >
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </MotionButton>

            <MotionButton
              variant="ghost"
              className={cn(
                "w-full justify-start",
                "hover:bg-[#1877F2] hover:text-white transition-colors"
              )}
              onClick={() => handleSocialShare("facebook")}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={4}
            >
              <Facebook className="h-5 w-5 mr-2" />
              Facebook
            </MotionButton>

            <motion.div
              className="my-2 border-t"
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              custom={5}
            />

            {/* Copy Link Button */}
            <MotionButton
              variant="ghost"
              className="w-full justify-start"
              onClick={handleCopyLink}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              custom={6}
            >
              <Link className="h-5 w-5 mr-2" />
              Copier le lien
            </MotionButton>
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}
