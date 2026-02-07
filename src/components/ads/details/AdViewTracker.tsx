"use client";

import { useEffect } from "react";
import { trackAdView } from "@/services/ads";

interface AdViewTrackerProps {
  adId: string;
}

export default function AdViewTracker({ adId }: AdViewTrackerProps) {
  useEffect(() => {
    if (adId) {
      trackAdView(adId);
    }
  }, [adId]);

  return null;
}
