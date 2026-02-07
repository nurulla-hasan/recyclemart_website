"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ErrorToast, SuccessToast, WarningToast } from "@/lib/utils";
import { addFavorite, removeFavorite } from "@/services/favorite";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

interface AdActionsProps {
  adId: string;
  title: string;
  initialIsFavorite?: boolean;
}

export default function AdActions({ adId, title, initialIsFavorite = false }: AdActionsProps) {
  const { user } = useUser();
  const t = useTranslations("AdDetails");
  const tAds = useTranslations("Ads");
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const handleFavorite = async () => {
    if (!user) {
      WarningToast(tAds("favLogin"));
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const apiCall = isFavorite ? removeFavorite : addFavorite;
      const res = await apiCall(adId);

      if (res.success) {
        setIsFavorite(!isFavorite);
        SuccessToast(isFavorite ? tAds("favRemove") : tAds("favAdd"));
      } else {
        ErrorToast(res.message);
      }
    } catch {
      ErrorToast(tAds("somethingWrong"));
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    // Check if Web Share API is available
    if (navigator?.share) {
      try {
        await navigator.share({
          title: "Recycle Mart",
          text: t("shareText", { title }),
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed, fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        SuccessToast(t("linkCopied"));
      }
    } else {
      // Fallback to clipboard if Web Share API not available
      await navigator.clipboard.writeText(window.location.href);
      SuccessToast(t("linkCopied"));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-9 w-9 rounded-full transition-colors",
          isFavorite ? "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100" : "text-muted-foreground hover:text-primary"
        )}
        onClick={handleFavorite}
        disabled={loading}
      >
        <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary"
        onClick={handleShare}
      >
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
