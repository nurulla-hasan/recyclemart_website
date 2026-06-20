"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { X, SlidersHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/types/category.type";
import { CategorySkeleton } from "./CategorySkeleton";
import { useSmartFilter } from "@/hooks/useSmartFilter";
import { useTranslations } from "next-intl";

export const sortOptions = [
  { value: "newest", label: "Date: Newest first" },
  { value: "oldest", label: "Date: Oldest first" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export const locationOptions = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chattogram", label: "Chattogram" },
  { value: "sylhet", label: "Sylhet" },
  { value: "rajshahi", label: "Rajshahi" },
];

export type FiltersProps = {
  categories: Category[];
  showAsSheet?: boolean;
};

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const FiltersContent = ({ categories }: { categories: Category[] }) => {
  const t = useTranslations("Ads");
  const { updateFilter, updateBatch, clearAll, getFilter } = useSmartFilter();

  const selectedCategory = getFilter("category");
  const selectedCondition = getFilter("condition");
  
  const minPrice = getFilter("minPrice") ? Number(getFilter("minPrice")) : 0;
  const maxPrice = getFilter("maxPrice") ? Number(getFilter("maxPrice")) : 100000;
  
  // Local state for smooth slider interaction
  const [localPrice, setLocalPrice] = useState<[number, number]>([minPrice, maxPrice]);

  const hasPriceFilter = getFilter("minPrice") || getFilter("maxPrice");
  const appliedCount = (selectedCategory ? 1 : 0) + (selectedCondition ? 1 : 0) + (hasPriceFilter ? 1 : 0);

  return (
    <>
      <header className="flex items-center justify-between space-y-6">
        <div>
          <p className="text-sm font-semibold text-foreground">{t("refineResults")}</p>
          <p className="text-xs text-muted-foreground">
            {appliedCount === 1 ? t("appliedFilters", { count: appliedCount }) : t("appliedFiltersPlural", { count: appliedCount })}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-primary"
          onClick={() => clearAll(["page", "limit", "sort", "location", "searchTerm"])}
        >
          {t("reset")}
        </Button>
      </header>

      <Accordion type="multiple" defaultValue={["category", "condition", "price"]} className="space-y-4">
        {/* Category Filter */}
        <AccordionItem value="category" className="rounded-2xl border border-border/40 bg-background">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground">
            {t("category")}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {categories.length > 0 ? (
              <RadioGroup 
                value={selectedCategory} 
                onValueChange={(val) => updateFilter("category", val)}
              >
                {categories.map((cat) => (
                  <div key={cat._id} className="flex items-center gap-3">
                    <RadioGroupItem value={cat.slug} id={`cat-${cat.slug}`} />
                    <Label htmlFor={`cat-${cat.slug}`} className="text-sm text-muted-foreground font-normal cursor-pointer flex-1">
                      {cat.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <CategorySkeleton />
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Condition Filter */}
        <AccordionItem value="condition" className="rounded-2xl border border-border/40 bg-background">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground">
            {t("condition")}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <RadioGroup 
              value={selectedCondition} 
              onValueChange={(val) => updateFilter("condition", val)}
            >
              {["new", "used"].map((cond) => (
                <div key={cond} className="flex items-center gap-3">
                  <RadioGroupItem value={cond} id={`cond-${cond}`} />
                  <Label htmlFor={`cond-${cond}`} className="text-sm text-muted-foreground font-normal capitalize cursor-pointer flex-1">
                    {t(cond)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price" className="rounded-2xl border border-border/40 bg-background">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground">
            {t("priceRange")}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{t("selectRange")}</span>
                  <span className="text-xs text-muted-foreground">
                    ৳ {localPrice[0].toLocaleString()} - ৳ {localPrice[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={100000}
                  step={100}
                  value={localPrice}
                  onValueChange={(val) => setLocalPrice(val as [number, number])}
                  onValueCommit={(val) => updateBatch({ 
                    minPrice: val[0] === 0 ? null : val[0], 
                    maxPrice: val[1] === 100000 ? null : val[1] 
                  })}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t("minPrice")}</span>
                <span>{t("maxPrice")}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Applied Chips */}
      {(selectedCategory || selectedCondition) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedCategory && (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              onClick={() => updateFilter("category", null)}
            >
              {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
              <X className="h-3 w-3" />
            </button>
          )}
          {selectedCondition && (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              onClick={() => updateFilter("condition", null)}
            >
              {selectedCondition}
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
    </>
  );
};

const Filters = ({ categories = [], showAsSheet = false }: FiltersProps) => {
  if (showAsSheet) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="lg" className="lg:hidden h-10">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85%] sm:max-w-[85%]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Refine your search results.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-120px)] px-2 mt-4">
            <FiltersContent categories={categories} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="rounded-3xl border border-border/40 bg-background/80 p-6 shadow-sm sticky top-24">
      <FiltersContent categories={categories} />
    </aside>
  );
};

export default Filters;
