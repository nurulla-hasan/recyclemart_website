'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { AdSummary as Ad } from './types';

type Props = {
  ad?: Ad | null;
};

export default function AdSummary({ ad }: Props) {
  if (!ad) {
    return (
      <aside className="hidden h-fit rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground lg:block">
        No ad selected.
      </aside>
    );
  }

  const { image, title, price, location, posted, link } = ad;

  return (
    <aside className="hidden lg:block rounded-xl border bg-card overflow-hidden">
      <div className="relative h-48 w-full">
        {image ? (
          <Image
            src={image}
            alt={title ?? 'Ad image'}
            fill
            sizes="320px"
            className="object-cover"
            loading="eager"
            priority
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            No image
          </div>
        )}
        {price ? (
          <span className="absolute left-3 top-3 rounded-md bg-background/80 px-2.5 py-1 text-sm font-semibold shadow">
            {price}
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-4">
        <div className="space-y-1">
          {link ? (
            <Link
              href={link}
              className="line-clamp-2 font-medium hover:text-primary"
            >
              {title ?? 'Ad details'}
            </Link>
          ) : (
            <p className="line-clamp-2 font-medium">{title ?? 'Ad details'}</p>
          )}
          <div className="text-xs text-muted-foreground">
            {[location, posted].filter(Boolean).join(' • ') || '—'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {link ? (
            <Link href={link}>
              <Button className="inline-flex w-fit border text-sm hover:bg-accent">
                View ad
              </Button>
            </Link>
          ) : null}
          <Button
            className="inline-flex w-fit bg-emerald-600 text-white hover:opacity-90"
            disabled
          >
            <Phone /> Call seller
          </Button>
        </div>
      </div>
    </aside>
  );
}
