import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Ad } from "@/types/ad.type";
import { useTranslations } from "next-intl";

interface TopAdsProps {
  ads: Ad[];
}

export default function TopAds({ ads }: TopAdsProps) {
  const t = useTranslations("Home");

  return (
    <section className="py-10">
      <div className="custom-width mx-auto px-4">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">{t("topTitle")}</h2>
          <Link href="/ads" className="hover:underline">
            {t("seeAll")}
          </Link>
        </div>
        
        {(!ads || ads.length === 0) ? (
          <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-dashed">
            <p>{t("noTopAds")}</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {ads.map((ad) => (
              <Link
                key={ad._id || ad.id}
                href={`/ads/${ad._id || ad.id}`}
                className="group rounded-2xl border bg-card shadow-sm overflow-hidden"
              >
                <div className="aspect-6/5 relative">
                  <Image
                    src={ad.coverImage || "/placeholder.png"}
                    alt={ad.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="line-clamp-1 font-medium group-hover:text-primary transition-colors">
                    {ad.title}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">৳ {ad.price.toLocaleString()}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {ad.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
