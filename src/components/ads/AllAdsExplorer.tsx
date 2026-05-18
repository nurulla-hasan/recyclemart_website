'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListTree, Grid3X3, List, Search, SlidersHorizontal, Globe } from 'lucide-react';
import { AdListCard } from '@/components/ads/AdListCard';
import { AdGridCard } from '@/components/ads/AdGridCard';
import Filters from '@/components/ads/filters';
import { LocationSelector } from '@/components/ads/LocationSelector';
import { Category } from '@/types/category.type';
import { Ad, AdMeta } from '@/types/ad.type';
import { useSmartFilter } from '@/hooks/useSmartFilter';
import CustomPagination from '@/tools/CustomPagination';
import NoAdsComponent from './NoAdsComponent';
import { useTranslations } from 'next-intl';

type Props = {
  listings: Ad[];
  categories: Category[];
  meta?: AdMeta;
  favoriteIds?: string[];
};

export default function AllAdsExplorer({
  listings,
  categories,
  meta,
  favoriteIds = [],
}: Props) {
  const t = useTranslations('Ads');
  const { getFilter, updateFilter } = useSmartFilter();
  const currentView = getFilter('view') || 'list';

  return (
    <section>
      <Tabs 
        value={currentView} 
        onValueChange={(val) => updateFilter('view', val)} 
        className="w-full space-y-4"
      >
        {/* Header Section */}
        <div className="space-y-1.5 pb-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t('title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('showingAds', { count: listings.length })}
          </p>
        </div>

        {/* Action Controls Bar (Card Style) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-lg bg-card p-4 border border-border/40 shadow-xs">
          {/* Left Group: Location Selector & Mobile Filter Sheet */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="flex-1 md:w-64 md:flex-initial">
              <LocationSelector className="w-full h-10 shadow-none border-border/60" />
            </div>
            <div className="lg:hidden">
              <Filters showAsSheet={true} categories={categories} />
            </div>
          </div>

          {/* Center Group: Search Input */}
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('searchPlaceholder')}
              defaultValue={getFilter('searchTerm')}
              onChange={(e) => updateFilter('searchTerm', e.target.value, 500)}
              className="h-10 pl-9 pr-4 rounded-md bg-background border-border/60 w-full shadow-none text-sm"
            />
          </div>

          {/* Right Group: View Toggle */}
          <div className="flex items-center justify-end">
            <TabsList className="grid grid-cols-2 w-full md:w-40 h-10 p-1 rounded-lg bg-muted">
              <TabsTrigger value="list" className="rounded-md text-xs sm:text-sm">
                <List className="h-4 w-4 mr-1.5" />
                {t('listView')}
              </TabsTrigger>
              <TabsTrigger value="grid" className="rounded-md text-xs sm:text-sm">
                <Grid3X3 className="h-4 w-4 mr-1.5" />
                {t('gridView')}
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
          {/* Sidebar Filters (Desktop Only) */}
          <div className="hidden lg:block sticky top-32">
            <div className="flex items-center gap-2 mb-4 px-1">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <h2 className="font-bold text-lg text-foreground">{t('filters')}</h2>
            </div>
            <Filters categories={categories} />
          </div>

          {/* Ads Listings */}
          <div className="min-h-[500px]">
            <TabsContent value="list" className="mt-0 space-y-4">
              {listings.length === 0 ? (
                <NoAdsComponent />
              ) : (
                <>
                  <div className="flex flex-col gap-4">
                    {listings.map(listing => (
                      <AdListCard 
                        key={listing.id} 
                        ad={listing} 
                        isFavoriteInitial={favoriteIds.includes(listing._id || listing.id)}
                      />
                    ))}
                  </div>

                  {meta && meta.totalPage > 1 && (
                    <div className="mt-8 flex justify-center pt-4">
                      <CustomPagination
                        currentPage={meta.page}
                        totalPages={meta.totalPage}
                      />
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="grid" className="mt-0 space-y-4">
              {listings.length === 0 ? (
                <NoAdsComponent />
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {listings.map(listing => (
                      <AdGridCard 
                        key={listing.id} 
                        ad={listing} 
                        isFavoriteInitial={favoriteIds.includes(listing._id || listing.id)}
                      />
                    ))}
                  </div>

                  {meta && meta.totalPage > 1 && (
                    <div className="mt-8 flex justify-center pt-4">
                      <CustomPagination
                        currentPage={meta.page}
                        totalPages={meta.totalPage}
                      />
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Trust Badges */}
      <section className="grid gap-8 rounded-xl border border-border/30 bg-background/50 p-6 md:p-10 text-sm text-muted-foreground md:grid-cols-3 mt-12">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Globe className="h-6 w-6" />
          </div>
          <h2 className="text-base font-bold text-foreground">{t('whySellTitle')}</h2>
          <p>{t('whySellDesc')}</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ListTree className="h-6 w-6" />
          </div>
          <h2 className="text-base font-bold text-foreground">{t('secureTransTitle')}</h2>
          <p>{t('secureTransDesc')}</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Search className="h-6 w-6" />
          </div>
          <h2 className="text-base font-bold text-foreground">{t('needHelpTitle')}</h2>
          <p>
            {t.rich('needHelpDesc', {
              phone: (chunks) => <span className="text-primary font-bold">{chunks}</span>,
              phoneNumber: '01302-000000'
            })}
          </p>
        </div>
      </section>
    </section>
  );
}