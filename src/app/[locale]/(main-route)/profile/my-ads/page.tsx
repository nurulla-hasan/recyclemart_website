import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";
import ListingCard from "@/components/ads/ListingCard";
import CustomPagination from "@/tools/CustomPagination";
import { fetchMyAds } from "@/services/ads";
import { PackageOpen } from "lucide-react";
import { timeAgo } from "@/lib/utils";

import { Ad } from "@/types/ad.type";

export default async function MyAdsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const response = await fetchMyAds({ page, limit });
  
  const ads = response?.success ? (response.data as Ad[]) || [] : [];
  const meta = response?.meta || { page, limit, total: 0, totalPage: 0 };

  return (
    <div className="space-y-6">
      <ProfilePageHeader
        title="Manage your ads"
        description="Track performance, renew listings, and promote your ads for maximum visibility."
      />

      <section>
        {ads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <PackageOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No ads posted yet</h3>
            <p className="text-muted-foreground mt-2 max-w-xs">
              When you post ads, they will appear here for you to manage and track performance.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {ads.map((ad: Ad) => (
                <ListingCard
                  key={ad._id}
                  id={ad._id || ""}
                  title={ad.title}
                  price={ad.price}
                  location={ad.location}
                  postedAt={timeAgo(ad.createdAt || "")}
                  imageUrl={ad.images?.[0] || ""}
                  isFeatured={ad.isFeatured}
                  isUrgent={ad.isUrgent}
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
