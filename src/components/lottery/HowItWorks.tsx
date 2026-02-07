'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Ticket, Timer, Gift } from 'lucide-react';

export const HowItWorks = () => {
  const t = useTranslations('Lottery');

  return (
    <div className="custom-width mx-auto -mt-10 px-4 relative z-20">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-lg">
          <CardContent className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-4 text-blue-600">
              <Ticket className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-bold">{t('step1Title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('step1Desc')}
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-purple-100 p-4 text-purple-600">
              <Timer className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-bold">{t('step2Title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('step2Desc')}
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
          <CardContent className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600">
              <Gift className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-bold">{t('step3Title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('step3Desc')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
