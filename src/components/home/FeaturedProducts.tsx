import Link from 'next/link';
import ListingCard from '@/components/ads/ListingCard';
import { Ad } from '@/types/ad.type';
import { timeAgo } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface FeaturedProductsProps {
  ads: Ad[];
}

export default function FeaturedProducts({ ads }: FeaturedProductsProps) {
  const t = useTranslations('Home');

  return (
    <section className="py-10 bg-muted/30">
      <div className="custom-width mx-auto px-4">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">{t('featuredTitle')}</h2>
          <Link href="/ads" className="text-primary hover:underline">
            {t('seeAll')}
          </Link>
        </div>
        
        {(!ads || ads.length === 0) ? (
          <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-dashed">
            <p>{t('noFeaturedAds')}</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {ads.map(ad => (
              <ListingCard 
                key={ad._id || ad.id} 
                id={ad._id || ad.id}
                title={ad.title}
                price={`৳ ${ad.price.toLocaleString()}`}
                location={ad.location}
                postedAt={ad.postedAt ? timeAgo(ad.postedAt) : ""}
                imageUrl={ad.coverImage || "/placeholder.png"}
                isFeatured={ad.isFeatured}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
