'use client';

import Image from 'next/image';
import { useTranslations, useFormatter } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trophy, Users, Ticket, CheckCircle2, Loader2, Plus, Minus } from 'lucide-react';
import { ILottery } from '@/types';
import { CountdownTimer } from './CountdownTimer';
import { useState } from 'react';

interface LotteryCardProps {
  lottery: ILottery;
  isJoining: boolean;
  onJoin: (lotteryId: string, quantity: number) => Promise<void>;
}

export const LotteryCard = ({ lottery, isJoining, onJoin }: LotteryCardProps) => {
  const t = useTranslations('Lottery');
  const format = useFormatter();
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);

  if (lottery.status === 'COMPLETED') {
    return (
      <Card key={lottery._id} className="pt-0 opacity-90 overflow-hidden border-border/50">
        <div className="relative h-32 w-full overflow-hidden grayscale">
          <Image
            src={lottery.image}
            alt={lottery.prize}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge
              variant="secondary"
              className="text-xs px-2 py-0 h-5"
            >
              {t('ended')}
            </Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-base line-clamp-1">{lottery.title}</CardTitle>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {t('win', { prize: lottery.prize })}
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-yellow-500/5 border border-yellow-500/10 p-2.5 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
              <Trophy className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">
                {t('winnerToken')}
              </p>
              <p className="font-bold text-sm text-foreground truncate">
                {lottery.winnerToken || t('notAvailable')}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-green-600 font-medium">
            <CheckCircle2 className="h-3 w-3" />
            <span>
              {format.dateTime(new Date(lottery.drawDate), {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      key={lottery._id}
      className="pt-0 group overflow-hidden border-border/50 transition-all hover:shadow-lg hover:border-primary/50"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={lottery.image}
          alt={lottery.prize}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary/90 text-[10px] px-2 py-0 h-5 text-white shadow-lg backdrop-blur-sm">
            ৳{lottery.ticketPrice}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base line-clamp-1">
              {lottery.title}
            </CardTitle>
            <p className="text-xs font-semibold text-primary mt-0.5 line-clamp-1">
              {t('win', { prize: lottery.prize })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" /> {t('participants', { count: lottery.participantsCount })}
          </span>
          <span className="flex items-center gap-1 font-medium text-primary/80">
            <Ticket className="h-3 w-3" />{' '}
            {t('ticketsSold', { count: lottery.totalTickets })}
          </span>
        </div>

        <div className="rounded-lg bg-muted/40 p-2">
          <div className="flex justify-center scale-90 origin-center">
            <CountdownTimer targetDate={lottery.drawDate} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="w-full gap-2 text-sm font-bold py-5 rounded-lg shadow-md shadow-primary/10"
            >
              <Ticket className="h-4 w-4" /> {t('buyTickets')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>{t('joinTitle', { title: lottery.title })}</DialogTitle>
              <DialogDescription>
                {t('joinDesc')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="quantity" className="text-center text-sm font-medium">{t('selectQuantity')}</Label>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    disabled={ticketQuantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <div className="w-12 text-center">
                    <span className="text-2xl font-bold">{ticketQuantity}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
                    onClick={() => setTicketQuantity(ticketQuantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl border border-primary/10 p-4 bg-primary/5 space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('pricePerTicket')}</span>
                  <span className="font-semibold">
                    ৳{lottery.ticketPrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t('quantity')}</span>
                  <span className="font-semibold">x {ticketQuantity}</span>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold">
                  <span>{t('totalAmount')}</span>
                  <span className="text-primary">
                    ৳{lottery.ticketPrice * ticketQuantity}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={() => onJoin(lottery._id, ticketQuantity)} 
                className="w-full"
                disabled={isJoining}
              >
                {isJoining ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('processing')}
                  </>
                ) : (
                  t('payAndJoin')
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
