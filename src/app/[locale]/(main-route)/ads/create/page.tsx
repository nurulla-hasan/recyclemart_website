import { fetchAllCategories } from "@/services/category";
import CreateAdForm from "@/components/ads/create/CreateAdForm";
import PageLayout from "@/tools/PageLayout";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "AdsCreate" });
  return {
    title: `${t("heroTitle")} | Recycle Mart`,
    description: t("heroSubtitle"),
  };
}

export default async function AdCreatePage() {
  const t = await getTranslations("AdsCreate");
  const categoryRes = await fetchAllCategories();
  const categories = categoryRes.success ? categoryRes.data : [];

  return (
    <PageLayout paddingSize="small" className="screen-height">
      <div className="mb-2 text-center pt-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {t("heroSubtitle")}
        </p>
      </div>

      <CreateAdForm categories={categories} />
    </PageLayout>
  );
}
