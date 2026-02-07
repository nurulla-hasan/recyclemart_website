'use client';

import { Button } from '@/components/ui/button';
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
    <section className="py-4 md:py-8">
      <Tabs 
        value={currentView} 
        onValueChange={(val) => updateFilter('view', val)} 
        className="w-full"
      >
        {/* Heading Section */}
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {t('title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('showingAds', { count: listings.length })}
          </p>
        </div>

        {/* Controls Section (Search, Location, Filter, View) */}
        <div className="flex flex-col gap-4 mb-8">
          
          {/* Top Row: Search (Full width on mobile, flexible on desktop) */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            
            {/* Search Box */}
            <div className="relative flex-1 order-1 lg:order-2">
              <Input
                placeholder={t('searchPlaceholder')}
                defaultValue={getFilter('searchTerm')}
                onChange={(e) => updateFilter('searchTerm', e.target.value, 500)}
                className="h-12 md:h-10 rounded-full border-border/60 bg-background pl-5 pr-12 text-sm"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-10 w-10 md:h-8 md:w-8 rounded-full bg-primary text-primary-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Location & Filter Group for Mobile */}
            <div className="flex items-center gap-2 order-2 lg:order-1">
              <div className="flex-1 lg:w-62.5">
                <LocationSelector className="h-12 md:h-10 w-full" />
              </div>
              <div className="lg:hidden">
                 <Filters showAsSheet={true} categories={categories} />
              </div>
            </div>

            {/* View Toggle (Desktop will stay right, mobile will stack below) */}
            <div className="order-3">
              <TabsList className="grid w-full grid-cols-2 lg:w-50 rounded-full h-12 md:h-10">
                <TabsTrigger value="list" className="rounded-full">
                  <List className="h-4 w-4 mr-2" />
                  {t('listView')}
                </TabsTrigger>
                <TabsTrigger value="grid" className="rounded-full">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  {t('gridView')}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Filter (Desktop Only) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
               <div className="flex items-center gap-2 mb-4">
                 <SlidersHorizontal className="h-4 w-4 text-primary" />
                 <h2 className="font-bold text-lg">{t('filters')}</h2>
               </div>
               <Filters categories={categories} />
            </div>
          </div>

          {/* Ads Content Area */}
          <div className="min-h-125">
            <TabsContent value="list" className="mt-0 space-y-6">
              {listings.length === 0 ? (
                <NoAdsComponent />
              ) : (
                <>
                  <div className="grid gap-4 grid-cols-1">
                    {listings.map(listing => (
                      <AdListCard 
                        key={listing.id} 
                        ad={listing} 
                        isFavoriteInitial={favoriteIds.includes(listing._id || listing.id)}
                      />
                    ))}
                  </div>

                  {/* Pagination for List View */}
                  {meta && meta.totalPage > 1 && (
                    <div className="mt-8 flex justify-center">
                      <CustomPagination
                        currentPage={meta.page}
                        totalPages={meta.totalPage}
                      />
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            {/* Grid View */}
            <TabsContent value="grid" className="mt-0 space-y-6">
              {listings.length === 0 ? (
                <NoAdsComponent />
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {listings.map(listing => (
                      <AdGridCard 
                        key={listing.id} 
                        ad={listing} 
                        isFavoriteInitial={favoriteIds.includes(listing._id || listing.id)}
                      />
                    ))}
                  </div>

                  {/* Pagination for Grid View */}
                  {meta && meta.totalPage > 1 && (
                    <div className="mt-8 flex justify-center">
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
      <section className="grid gap-8 rounded-3xl border border-border/30 bg-background/50 p-6 md:p-10 text-sm text-muted-foreground md:grid-cols-3 mt-12">
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
