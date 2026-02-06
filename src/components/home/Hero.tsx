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
    <section className="relative">
      <div className="h-125 lg:h-[calc(100vh-131px)]">
        {/* Main Carousel */}
        <div className="relative overflow-hidden">
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
                <CarouselItem key={slide.id} className="pl-0 h-full relative group">
                  <Link href={slide.href} className="block h-125 lg:h-[calc(100vh-131px)] w-full relative">
                    <Image
                      src={slide.imageSrc}
                      alt={`Hero slide ${slide.id}`}
                      fill
                      className="object-cover"
                      priority={slide.id === 1}
                      unoptimized
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Side Banners */}
        {/* <div className="hidden lg:flex flex-col gap-6 h-full">
          <Link href="/ads?verified=true" className="relative flex-1 overflow-hidden bg-orange-50 group">
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div>
                <span className="inline-flex p-2 rounded-full bg-orange-100 text-orange-600 mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-gray-900">Verified Sellers</h3>
                <p className="text-sm text-gray-600 mt-1">Shop with confidence.</p>
              </div>
              <div className="flex items-center text-sm font-medium text-orange-600 group-hover:translate-x-1 transition-transform">
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-orange-200/50 rounded-full blur-3xl -mr-10 -mb-10" />
            <Image
              src="https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Safety"
              fill
              className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
            />
          </Link>

          <Link href="/ads?urgent=true" className="relative flex-1 overflow-hidden bg-purple-50 group">
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div>
                <span className="inline-flex p-2 rounded-full bg-purple-100 text-purple-600 mb-3">
                  <Zap className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-gray-900">Urgent Sales</h3>
                <p className="text-sm text-gray-600 mt-1">Grab deals before they're gone.</p>
              </div>
              <div className="flex items-center text-sm font-medium text-purple-600 group-hover:translate-x-1 transition-transform">
                View Deals <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-purple-200/50 rounded-full blur-3xl -mr-10 -mb-10" />
            <Image
              src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Urgent"
              fill
              className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
            />
          </Link>

          <Link href="/ads?premium=true" className="relative flex-1 overflow-hidden bg-emerald-50 group">
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
              <div>
                <span className="inline-flex p-2 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold text-gray-900">Premium Ads</h3>
                <p className="text-sm text-gray-600 mt-1">Boost your ad visibility.</p>
              </div>
              <div className="flex items-center text-sm font-medium text-emerald-600 group-hover:translate-x-1 transition-transform">
                Get Premium <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-3xl -mr-10 -mb-10" />
            <Image
              src="https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Premium"
              fill
              className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
            />
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;