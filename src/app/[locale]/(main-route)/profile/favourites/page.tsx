import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";
import ListingCard from "@/components/ads/ListingCard";
import CustomPagination from "@/tools/CustomPagination";
import { fetchMyFavorites } from "@/services/favorite";
import { Heart } from "lucide-react";

import { FavoriteItem } from "@/types/favorite.type";

import { PageProps } from "@/types/page.type";

export default async function FavouriteAdsPage({ searchParams }: PageProps) {
  const filter = await searchParams;
  const page = Math.max(1, parseInt(filter.page as string) || 1);
  const limit = Math.max(1, parseInt(filter.limit as string) || 10);

  const response = await fetchMyFavorites(page, limit);

  const favorites = (response?.success ? response.data : []) as FavoriteItem[];
  const meta = response?.meta ?? { page, limit };

  return (
    <div className="space-y-6">
      <ProfilePageHeader
        title="Favourite ads"
        description="Everything you love in one place. Track price drops, contact sellers quickly, and share your shortlist."
      />

      <section>
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No favourites yet</h3>
            <p className="text-muted-foreground mt-2 max-w-xs">
              Ads you mark as favourite will appear here. Start exploring and save what you love!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {favorites.map((ad: FavoriteItem) => (
                <ListingCard
                  key={ad._id}
                  id={ad.adId}
                  title={ad.title}
                  price={ad.price}
                  location={ad.location}
                  postedAt={ad.postedAt}
                  imageUrl={ad.imageUrl}
                  isFeatured={ad.isFeatured}
                  isUrgent={ad.isUrgent}
                  showRemove={true}
                />
              ))}
            </div>

            {meta.totalPage > 1 && (
              <div className="mt-8 flex justify-center">
                <CustomPagination
                  currentPage={meta.page}
                  totalPages={meta.totalPage}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
