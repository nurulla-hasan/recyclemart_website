'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export const LiveDraw = () => {
  const t = useTranslations('Lottery');

  return (
    <section className="custom-width mx-auto mt-20 px-4 text-center">
      <h2 className="text-2xl font-bold mb-8">{t('liveDrawTitle')}</h2>
      <div className="relative overflow-hidden rounded-3xl bg-black text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-4 py-1 text-sm font-medium text-white animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              {t('liveStreaming')}
            </div>
            <h3 className="text-3xl font-bold sm:text-4xl">
              {t('watchLiveTitle')}
            </h3>
            <p className="text-lg text-gray-300">
              {t('transparencyDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white gap-2">
                {t('watchFacebook')}
              </Button>
              <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white gap-2">
                {t('watchYouTube')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
