import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Phone, MapPin, Calendar, Eye } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import CustomBreadcrumb from '@/tools/CustomBreadcrumb';
import PageLayout from '@/tools/PageLayout';
import SellerInfo from '@/components/ads/details/SellerInfo';
// import RelatedAds from "@/components/ads/details/RelatedAds";
import ImageGallery from '@/components/ads/details/ImageGallery';
import { Button } from '@/components/ui/button';
import { fetchAdById } from '@/services/ads';
import { timeAgo } from '@/lib/utils';
import AdActions from '@/components/ads/details/AdActions';
import { fetchMyFavorites } from '@/services/favorite';
import { FavoriteItem } from '@/types/favorite.type';
import { MessageSellerButton } from '@/components/ads/details/MessageSellerButton';
import RelatedAds from '@/components/ads/details/RelatedAds';

type Props = {
  params: Promise<{ id: string }>;
};

// Generate metadata for the ad details page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = await getTranslations('AdDetails');
  const res = await fetchAdById(id);

  if (!res.success || !res.data) {
    return {
      title: t('notFound'),
    };
  }

  const ad = res.data;

  return {
    title: `${ad.title} | Recycle Mart`,
    description: ad.description.slice(0, 160),
    keywords: [
      ad.categoryId?.name || 'Ads',
      ad.location,
      'Bangladesh',
      'buy',
      'sell',
    ],
    openGraph: {
      title: ad.title,
      description: ad.description.slice(0, 160),
      images: [ad.images[0]],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ad.title,
      description: ad.description.slice(0, 160),
      images: [ad.images[0]],
    },
  };
}

export default async function AdDetailsPage({ params }: Props) {
  const { id } = await params;
  const t = await getTranslations('AdDetails');
  const res = await fetchAdById(id);
  const favoritesRes = await fetchMyFavorites(1, 100).catch(() => null);

  if (!res.success || !res.data) {
    notFound();
  }
  const ad = res.data;

  const isFavorite = favoritesRes?.success
    ? (favoritesRes.data as FavoriteItem[]).some(fav => fav.adId === ad._id)
    : false;

  const breadcrumbs = [
    { name: t('home'), href: '/' },
    { name: t('ads'), href: '/ads' },
    {
      name: ad.categoryId?.name || t('category'),
      href: ad.categoryId ? `/ads?category=${ad.categoryId.slug}` : '/ads',
    },
    {
      name:
        ad.title?.length > 50
          ? ad.title.slice(0, 50) + '...'
          : ad.title || t('adDetails'),
      isCurrent: true,
    },
  ];

  return (
    <PageLayout paddingSize="small">
      <div className="custom-width mx-auto">
        <CustomBreadcrumb links={breadcrumbs} />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={ad.images} title={ad.title} />

            {/* Product Details (Description moved here for mobile) */}
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <div className="space-y-4">
                {/* Title and Badges */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-2xl font-bold text-foreground">
                      {ad.title}
                    </h1>
                    <div className="flex items-center gap-2">
                      <AdActions
                        adId={ad._id}
                        title={ad.title}
                        initialIsFavorite={isFavorite}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                      {ad.condition}
                    </span>
                    {ad.isFeatured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        {t('featured')}
                      </span>
                    )}
                    {ad.isUrgent && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        {t('urgent')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">
                      ৳ {ad.price.toLocaleString()}
                    </span>
                    {ad.negotiable && (
                      <span className="text-sm font-medium text-muted-foreground">
                        {t('negotiable')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Location and Date */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {ad.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {t('postedAt', { time: timeAgo(ad.createdAt) })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {t('views', { count: ad.views })}
                  </div>
                </div>

                <hr className="bg-border/30 h-px border-0" />

                {/* Description */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">{t('description')}</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                    {ad.description}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Contact Actions */}
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <div className="flex flex-col gap-2">
                <a href={`tel:${ad.contactPhone}`}>
                  <Button className="w-full h-11 font-semibold gap-2">
                    <Phone />
                    {t('call', { phone: ad.contactPhone })}
                  </Button>
                </a>
                <MessageSellerButton
                  adId={ad?._id ?? ''}
                  sellerId={ad?.user?._id ?? ''}
                  className="w-full h-11 gap-2"
                />
              </div>
            </div>

            {/* Seller Info */}
            <SellerInfo seller={ad.user} location={ad.location} />

            {/* Safety Tips */}
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <h3 className="font-semibold mb-3">{t('safetyTips')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t('safetyTip1')}</li>
                <li>• {t('safetyTip2')}</li>
                <li>• {t('safetyTip3')}</li>
                <li>• {t('safetyTip4')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Ads */}
        {ad.relatedAds && ad.relatedAds.length > 0 && (
          <div className="mt-8">
            <RelatedAds 
              ads={ad.relatedAds} 
              category={ad.categoryId?.name || t('category')} 
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
