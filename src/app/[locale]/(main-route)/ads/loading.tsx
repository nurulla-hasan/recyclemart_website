"use client";
export default function Loading() {
  return (
    <div className="flex screen-height w-full flex-col items-center justify-center space-y-12 py-20">
      {/* Premium Glassmorphic Loader */}
      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Background Rotating Gradient Ring */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full bg-linear-to-tr from-primary/40 via-transparent to-primary/40 blur-xl"></div>
        
        {/* Main Glass Circle */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-2xl backdrop-blur-md">
          {/* Inner Pulsing Core */}
          <div className="h-10 w-10 animate-pulse rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.6)]"></div>
          
          {/* Orbiting Dots */}
          <div className="absolute inset-0 animate-[spin_2s_linear_infinite]">
            <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary"></div>
          </div>
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite_reverse]">
            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/60"></div>
          </div>
        </div>
      </div>

      {/* Elegant Loading Text */}
      <div className="text-center space-y-3">
        <h3 className="bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
          Recycle Mart
        </h3>
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-sm font-medium text-muted-foreground">Finding the best deals</span>
          <div className="flex gap-1">
            <span className="h-1 w-1 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></span>
            <span className="h-1 w-1 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></span>
            <span className="h-1 w-1 animate-bounce rounded-full bg-primary"></span>
          </div>
        </div>
      </div>

      {/* Floating Elements Background Effect */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-20">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/5 blur-3xl [animation-delay:1s]"></div>
      </div>
    </div>
  );
}
