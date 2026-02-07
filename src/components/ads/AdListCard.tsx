"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Ad } from '@/types/ad.type';
import { cn, timeAgo } from '@/lib/utils';
import { useState } from 'react';
import { addFavorite, removeFavorite } from '@/services/favorite';
import { SuccessToast, ErrorToast, WarningToast } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { useTranslations } from 'next-intl';

interface AdListCardProps {
  ad: Ad;
  isFavoriteInitial?: boolean;
}

export const AdListCard = ({ ad, isFavoriteInitial = false }: AdListCardProps) => { 
  const t = useTranslations('Ads');
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const [loading, setLoading] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent Link navigation
    
    if (!user) {
      WarningToast(t('favLogin'));
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const apiCall = isFavorite ? removeFavorite : addFavorite;
      const res = await apiCall(ad._id || ad.id);
      
      if (res.success) {
        setIsFavorite(!isFavorite);
        SuccessToast(isFavorite ? t('favRemove') : t('favAdd'));
      } else {
        ErrorToast(res.message);
      }
    } catch {
      ErrorToast(t('somethingWrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/ads/${ad.id}`} className="flex h-full">
        <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-l-2xl">
          <Image
            src={ad.coverImage || "/placeholder-image.png"}
            alt={ad.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="128px"
          />
          <div className="absolute left-2 top-2 flex gap-1">
            {ad.isFeatured ? (
              <Badge className="rounded-full bg-amber-500 text-white text-xs px-2 py-0.5 border-none">
                {t('featured')}
              </Badge>
            ) : null}
            {ad.isUrgent ? (
              <Badge className="rounded-full bg-red-500 text-white text-xs px-2 py-0.5 border-none">
                {t('urgent')}
              </Badge>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-base font-semibold text-foreground">
              {ad.title}
            </h3>
            <p className="text-lg font-bold text-primary">
              ৳ {ad.price.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
              {ad.location}
            </p>
            <p className="text-muted-foreground/80">
              {t('postedAt', { time: timeAgo(ad.postedAt) })}
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled={loading}
          className={cn(
            "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-background/80 shadow-sm transition z-10",
            isFavorite ? "text-red-500 border-red-200 bg-red-50" : "text-muted-foreground hover:text-primary"
          )}
          onClick={handleFavorite}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </button>
      </Link>
    </article>
  );
};
