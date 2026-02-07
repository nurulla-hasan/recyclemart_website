import Category from "@/components/home/Category";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TopAds from "@/components/home/TopAds";
import LatestAds from "@/components/home/LatestAds";
import { fetchFeaturedAds, fetchTopAds, fetchLatestAds } from "@/services/ads";

export default async function Home() {
  const [featured, top, latest] = await Promise.all([
    fetchFeaturedAds({ limit: 12 }),
    fetchTopAds({ limit: 12 }),
    fetchLatestAds({ limit: 12 }),
  ]);

  return (
    <div className="space-y-4">
      <Hero />
      <Category />
      <FeaturedProducts ads={featured.data || []} />
      <TopAds ads={top.data || []} />
      <LatestAds ads={latest.data || []} />
    </div>
  );
}
