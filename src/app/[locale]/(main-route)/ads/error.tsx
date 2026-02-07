"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <div className="flex screen-height w-full flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
        <AlertCircle className="h-10 w-10 text-red-600" />
      </div>
      
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Oops! Something went wrong
      </h1>
      
      <p className="mb-8 max-w-[500px] text-muted-foreground">
        We encountered an error while trying to load the ads. This might be a temporary issue with our servers or your connection.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={() => reset()}
          className="flex items-center gap-2 rounded-full px-8"
        >
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
        
        <Link href="/">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full px-8"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Button>
        </Link>
      </div>

      <div className="mt-12 text-xs text-muted-foreground">
        Error ID: <span className="font-mono">{error.digest || "N/A"}</span>
      </div>
    </div>
  );
}
