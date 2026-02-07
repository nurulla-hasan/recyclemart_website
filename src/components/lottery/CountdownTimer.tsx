'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const t = useTranslations('Lottery');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-1.5 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="flex flex-col rounded bg-primary/10 px-1.5 py-1 min-w-9.5"
        >
          <span className="text-sm font-bold text-primary leading-tight">{value}</span>
          <span className="text-[8px] uppercase text-muted-foreground leading-none">
            {t(unit).charAt(0)}
          </span>
        </div>
      ))}
    </div>
  );
};
