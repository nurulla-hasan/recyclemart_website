import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import PageLayout from "@/tools/PageLayout";
import { fetchAllCategories } from "@/services/category";
import { getTranslations } from "next-intl/server";

const accentColors = [
  "from-primary/20 via-primary/10 to-transparent",
  "from-indigo-400/25 via-indigo-300/10 to-transparent",
  "from-emerald-400/25 via-emerald-300/10 to-transparent",
  "from-amber-400/25 via-amber-300/10 to-transparent",
  "from-rose-400/25 via-rose-300/10 to-transparent",
  "from-sky-400/25 via-sky-300/10 to-transparent",
  "from-purple-400/25 via-purple-300/10 to-transparent",
  "from-pink-400/25 via-pink-300/10 to-transparent",
];

const Category = async () => {
  const categoriesRes = await fetchAllCategories();
  const categories = categoriesRes.success ? categoriesRes.data : [];
  const t = await getTranslations("Home");

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-88 w-88 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
      <PageLayout>
        <div className="space-y-2 pb-10">
          <div className="mx-auto max-w-3xl space-y-2 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
              {t("browseMarketplace")}
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              {t("categoriesTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground">
              {t("categoriesSubtitle")}
            </p>
          </div>
        </div>

        <div className="relative space-y-10">
          <div className="mx-auto grid custom-width gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category._id}
                href={`/ads?category=${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/95 p-5 transition hover:-translate-y-1 hover:border-primary/40"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition group-hover:opacity-100",
                    accentColors[index % accentColors.length]
                  )}
                />
                <div className="relative z-10 flex items-start gap-4">
                  <span className="inline-flex size-16 items-center justify-center rounded-xl border border-border/40 bg-background/80 text-primary shadow-sm transition group-hover:border-primary/40 group-hover:scale-110">
                    {category.icon && (
                      <div className="relative w-10 h-10">
                        <Image 
                          src={category.icon} 
                          alt={category.name} 
                          fill 
                          sizes="40px"
                          className="object-contain dark:invert"
                        />
                      </div>
                    )}
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{category.name}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {t("exploreNow")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default Category;
