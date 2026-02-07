"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface HeroCarouselProps {
  carouselImages: { id: number; imageSrc: string }[];
  sideAds: { top: string; bottom: string };
}

const HeroCarousel = ({ carouselImages, sideAds }: HeroCarouselProps) => {
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 h-auto lg:h-130">
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
            {carouselImages.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0 h-full relative">
                <div className="block h-80 lg:h-130 w-full relative">
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Side Ads - Right side (1 column on desktop) */}
      <div className="flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-6 h-auto lg:h-full">
        {/* Top Ad */}
        <div className="relative h-40 md:h-52 lg:flex-1 overflow-hidden rounded-3xl bg-primary/10 group shadow-md transition-shadow">
          <Image
            src={sideAds.top}
            alt="Featured Ad"
            fill
            className="object-cover transition-transform duration-500"
            unoptimized
          />
        </div>

        {/* Bottom Ad */}
        <div className="relative h-40 md:h-52 lg:flex-1 overflow-hidden rounded-3xl bg-primary/10 group shadow-md transition-shadow">
          <Image
            src={sideAds.bottom}
            alt="Property Ad"
            fill
            className="object-cover transition-transform duration-500"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
