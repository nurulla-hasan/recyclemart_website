import type { Metadata } from "next";
import CustomBreadcrumb from "@/tools/CustomBreadcrumb";
import AllAdsExplorer from "@/components/ads/AllAdsExplorer";
import PageLayout from "@/tools/PageLayout";
import { fetchAllAds } from "@/services/ads";
import { fetchAllCategories } from "@/services/category";
import { fetchMyFavorites } from "@/services/favorite";
import { Ad } from "@/types/ad.type";
import { PageProps } from "@/types/page.type";
import { DEFAULT_PAGINATION } from "@/constants";
import { FavoriteItem } from "@/types/favorite.type";

export const metadata: Metadata = {
  title: "All Ads | Recycle Mart",
  description:
    "Browse the latest listings across Bangladesh. Filter by category, price, location, and more to find the perfect deal on Recycle Mart.",
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "All Ads", isCurrent: true },
];

const AllAdsPage = async ({ searchParams }: PageProps) => {
  // throw new Error("Testing our cool error page!");
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const filter = await searchParams;

  // Parallel fetching
  const [categoriesRes, adsRes, favoritesRes] = await Promise.all([
    fetchAllCategories(),
    fetchAllAds({ ...filter, 'limit': String(DEFAULT_PAGINATION.limit) }),
    fetchMyFavorites(1, 100).catch(() => null), // Fetch a batch of favorites safely
  ]);

  const categories = categoriesRes?.success ? categoriesRes.data : [];
  const listings = (adsRes?.success ? adsRes.data : []) as Ad[];
  const meta = adsRes?.meta;
  
  // Extract favorite IDs
  const favoriteIds = favoritesRes?.success 
    ? (favoritesRes.data as FavoriteItem[]).map((fav) => fav.adId) 
    : [];

  return (
    <PageLayout paddingSize="small">
      <div className="custom-width mx-auto">
        <CustomBreadcrumb links={breadcrumbs} />
        <AllAdsExplorer
          listings={listings}
          categories={categories}
          meta={meta}
          favoriteIds={favoriteIds}
        />
      </div>
    </PageLayout>
  );
};

export default AllAdsPage;
