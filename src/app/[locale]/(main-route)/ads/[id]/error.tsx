"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/tools/PageLayout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // console.error(error);
  }, [error]);

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center screen-height text-center px-4 max-w-2xl mx-auto">
        <div className="mb-6 rounded-2xl bg-destructive/10 p-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Couldn't load ad details
        </h1>
        
        <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
          We encountered an issue while trying to fetch the information for this listing. It might have been removed, or there's a problem with the connection.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            onClick={() => reset()}
            className="rounded-full px-8 h-12 text-base font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
          
          <Link href="/ads">
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Ads
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="ghost"
              className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 w-full text-xs text-muted-foreground/60">
          <p>Troubleshooting ID: <span className="font-mono bg-muted px-2 py-0.5 rounded">{error.digest || "ERR_AD_FETCH_FAILED"}</span></p>
        </div>
      </div>
    </PageLayout>
  );
}
