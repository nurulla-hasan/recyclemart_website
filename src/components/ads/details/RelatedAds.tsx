"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { AdDetail } from "@/types/ad.type";
import { timeAgo } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type RelatedAdsProps = {
  ads: AdDetail[];
  category: string;
};

export default function RelatedAds({ ads }: RelatedAdsProps) {
  const t = useTranslations("AdDetails");

  if (!ads || ads.length === 0) return null;

  return (
    <section className="mt-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">{t("relatedAds")}</h2>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
        </div>

        <CarouselContent className="-ml-4">
          {ads.slice(0, 10).map((ad) => (
            <CarouselItem key={ad._id} className="pl-4 md:basis-1/3 lg:basis-1/5">
              <div className="overflow-hidden hover:shadow-lg transition-shadow rounded-xl border border-border/40 bg-card h-full">
                <Link href={`/ads/${ad._id}`}>
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={ad.images[0]}
                      alt={ad.title}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 90vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {ad.isFeatured && (
                      <span className="absolute top-2 left-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                        {t("featured")}
                      </span>
                    )}
                    {ad.isUrgent && (
                      <span className="absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {t("urgent")}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                        {ad.title}
                      </h3>
                      <p className="text-lg font-bold text-primary">
                        ৳ {ad.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{ad.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{timeAgo(ad.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Mobile controls */}
        <div className="flex sm:hidden justify-center gap-4 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
}
