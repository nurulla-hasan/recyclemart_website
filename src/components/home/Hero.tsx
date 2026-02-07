"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
// import { ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const heroSlides = [
  {
    id: 1,
    href: "/ads/featured",
    imageSrc: "/images/hero1.png",
  },
  {
    id: 2,
    href: "/ads/electronics",
    imageSrc: "/images/hero2.png",
  },
  {
    id: 3,
    href: "/ads/property",
    imageSrc: "/images/hero3.png",
  },
  {
    id: 4,
    href: "/ads/electronics",
    imageSrc: "/images/hero4.png",
  },
  {
    id: 5,
    href: "/ads/property",
    imageSrc: "/images/hero5.png",
  },
] as const;

const Hero = () => {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);
  const autoplayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay = React.useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = React.useCallback(() => {
    stopAutoplay();
    if (!carouselApi) return;
    autoplayRef.current = setInterval(() => {
      if (!carouselApi) return;
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 5000);
  }, [carouselApi, stopAutoplay]);

  React.useEffect(() => {
    if (!carouselApi) return;
    startAutoplay();
    return () => stopAutoplay();
  }, [carouselApi, startAutoplay, stopAutoplay]);

  return (
    <section className="relative pt-4 lg:pt-8">
      <div className="custom-width mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 h-auto lg:h-112.5">
          {/* Main Carousel - Left side (3 columns on desktop) */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-3xl group shadow-xl">
            <Carousel
              className="w-full h-full"
              setApi={setCarouselApi}
              onMouseEnter={stopAutoplay}
              onFocusCapture={stopAutoplay}
              onMouseLeave={startAutoplay}
              onBlurCapture={startAutoplay}
            >
              <CarouselContent className="ml-0">
                {heroSlides.map((slide) => (
                  <CarouselItem key={slide.id} className="pl-0 h-full relative">
                    <Link href={slide.href} className="block h-75 lg:h-112.5 w-full relative">
                      <Image
                        src={slide.imageSrc}
                        alt={`Hero slide ${slide.id}`}
                        fill
                        className="object-cover transition-transform duration-700"
                        priority={slide.id === 1}
                        unoptimized
                      />
                      {/* Overlay for better text visibility if added later */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Side Ads - Right side (1 column on desktop) */}
          <div className="flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-6 h-auto lg:h-full">
            {/* Top Ad */}
            <Link 
              href="/ads/featured" 
              className="relative h-40 md:h-52 lg:flex-1 overflow-hidden rounded-3xl bg-primary/10 group shadow-md transition-shadow"
            >
              <Image
                src="/images/hero4.png"
                alt="Featured Ad"
                fill
                className="object-cover transition-transform duration-500"
                unoptimized
              />
            </Link>

            {/* Bottom Ad */}
            <Link 
              href="/ads/property" 
              className="relative h-40 md:h-52 lg:flex-1 overflow-hidden rounded-3xl bg-primary/10 group shadow-md transition-shadow"
            >
              <Image
                src="/images/hero5.png"
                alt="Property Ad"
                fill
                className="object-cover transition-transform duration-500"
                unoptimized
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;