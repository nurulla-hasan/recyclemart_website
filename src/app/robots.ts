import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/profile/', '/auth/', '/chat/', '/success/'],
    },
    sitemap: 'https://recyclemart.com.bd/sitemap.xml',
  };
}
