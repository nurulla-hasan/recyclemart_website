'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { joinLottery } from '@/services/lottery';
import { ILottery } from '@/types';
import { toast } from 'sonner';
import { LotteryHero } from './LotteryHero';
import { HowItWorks } from './HowItWorks';
import { LotteryCard } from './LotteryCard';
import { LiveDraw } from './LiveDraw';

export default function LotteryClient({ initialLotteries }: { initialLotteries: ILottery[] }) {
  const t = useTranslations('Lottery');
  const [isJoining, setIsJoining] = useState<string | null>(null);

  const handleJoinLottery = async (lotteryId: string, quantity: number) => {
    try {
      setIsJoining(lotteryId);
      const res = await joinLottery(lotteryId, quantity);
      
      if (res?.success && res?.data?.gatewayUrl) {
        toast.success(t('redirecting'));
        window.location.href = res.data.gatewayUrl;
      } else {
        toast.error(res?.message || t('joinFailed'));
      }
    } catch  {
      toast.error(t('unexpectedError'));
    } finally {
      setIsJoining(null);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <LotteryHero />
      <HowItWorks />

      {/* Lotteries Section */}
      <section className="custom-width mx-auto mt-16 px-4">
        <Tabs defaultValue="ACTIVE" className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t('featuredLotteries')}
            </h2>
            <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:flex">
              <TabsTrigger value="ACTIVE">{t('activeDraws')}</TabsTrigger>
              <TabsTrigger value="COMPLETED">{t('pastWinners')}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="ACTIVE" className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {initialLotteries
                .filter((l: ILottery) => l.status === 'ACTIVE')
                .map((lottery: ILottery) => (
                  <LotteryCard
                    key={lottery._id}
                    lottery={lottery}
                    isJoining={isJoining === lottery._id}
                    onJoin={handleJoinLottery}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="COMPLETED">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {initialLotteries
                .filter((l: ILottery) => l.status === 'COMPLETED')
                .map((lottery: ILottery) => (
                  <LotteryCard
                    key={lottery._id}
                    lottery={lottery}
                    isJoining={false}
                    onJoin={async () => {}}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <LiveDraw />
    </div>
  );
}
