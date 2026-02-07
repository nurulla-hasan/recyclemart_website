'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const LotteryHero = () => {
  const t = useTranslations('Lottery');

  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground lg:py-24">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="custom-width relative mx-auto px-4 text-center">
        <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
          {t('heroBadge')}
        </Badge>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {t.rich('heroTitle', {
            lottery: t('heroLottery'),
            highlight: (chunks) => <span className="text-yellow-300">{chunks}</span>
          })}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl">
          {t('heroSubtitle')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-8"
          >
            {t('viewActiveDraws')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white hover:bg-white/10 rounded-full px-8"
          >
            {t('howItWorks')}
          </Button>
        </div>
      </div>
    </section>
  );
};
