import { fetchAllCategories } from "@/services/category";
import CreateAdForm from "@/components/ads/create/CreateAdForm";
import PageLayout from "@/tools/PageLayout";

export const metadata = {
  title: "Post an Ad | Recycle Mart",
  description: "Sell your used items easily on Recycle Mart, the best marketplace in Bangladesh.",
};

export default async function AdCreatePage() {
  const categoryRes = await fetchAllCategories();
  const categories = categoryRes.success ? categoryRes.data : [];

  return (
    <PageLayout paddingSize="small" className="screen-height">
      <div className="mb-2 text-center pt-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Post an Ad
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Turn your unwanted items into extra cash today.
        </p>
      </div>

      <CreateAdForm categories={categories} />
    </PageLayout>
  );
}
