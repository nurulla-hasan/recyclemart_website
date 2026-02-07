"use client";

import { ShoppingBag } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex screen-height w-full flex-col items-center justify-center space-y-10 py-20 px-4">
      {/* Premium Detail Loader */}
      <div className="relative flex h-40 w-40 items-center justify-center">
        {/* Triple Expanding Rings */}
        <div className="absolute inset-0 animate-[ping_2s_linear_infinite] rounded-full bg-primary/20"></div>
        <div className="absolute inset-4 animate-[ping_3s_linear_infinite] rounded-full bg-primary/10"></div>
        
        {/* Moving Gradient Sphere Background */}
        <div className="absolute h-28 w-28 animate-[spin_4s_linear_infinite] rounded-full bg-linear-to-tr from-primary/30 via-transparent to-primary/30 blur-2xl"></div>

        {/* Central Card-like Icon Holder */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-4xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl transition-transform hover:scale-110">
          <ShoppingBag className="h-10 w-10 text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
          
          {/* Scanning Line Effect */}
          <div className="absolute inset-x-0 top-0 h-1/2 w-full animate-[scan_2s_ease-in-out_infinite] border-b-2 border-primary/50 bg-linear-to-b from-primary/10 to-transparent opacity-50"></div>
        </div>

        {/* Orbiting Particle */}
        <div className="absolute inset-0 animate-[spin_2.5s_linear_infinite]">
          <div className="absolute -top-1 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-secondary shadow-lg"></div>
        </div>
      </div>

      {/* Narrative Loading Text */}
      <div className="text-center space-y-4 max-w-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Recycle Mart</span>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Fetching Ad Details</h3>
          <p className="text-muted-foreground text-sm font-medium animate-pulse">
            Gathering images, specifications, and seller information just for you...
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 70%; opacity: 0.8; }
        }
      `}</style>

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>
    </div>
  );
}
