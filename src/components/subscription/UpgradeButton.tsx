"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { changeSubscription } from "@/services/profile";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface UpgradeButtonProps {
  planId: string;
  planName: string;
  isCurrent: boolean;
}

export function UpgradeButton({ planId, planName, isCurrent }: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (isCurrent) return;
    
    setLoading(true);
    try {
      const res = await changeSubscription(planId);
      if (res.success && res.data?.gatewayUrl) {
        window.location.href = res.data.gatewayUrl;
      } else {
        toast.error(res.message || "Failed to initiate payment");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant={isCurrent ? "outline" : "default"} 
      className={`w-full rounded-full h-11 transition-all ${!isCurrent && 'shadow-sm shadow-primary/20'}`}
      disabled={isCurrent || loading}
      onClick={handleUpgrade}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : null}
      {isCurrent 
        ? "Current Plan" 
        : `Upgrade to ${planName}`
      }
    </Button>
  );
}
