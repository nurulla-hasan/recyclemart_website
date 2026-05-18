import { fetchAllCategories } from '@/services/category';
import { MetadataRoute } from 'next';
import { Category } from '@/types/category.type';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://recyclemart.com.bd';

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ads`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/safety`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    // Dynamic category routes
    const categoriesRes = await fetchAllCategories();
    if (categoriesRes?.success && categoriesRes.data) {
      categoriesRes.data.forEach((cat: Category) => {
        routes.push({
          url: `${baseUrl}/ads?category=${cat.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        });
      });
    }
  } catch {
  }

  return routes;
}
