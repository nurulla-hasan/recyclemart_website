'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, Ticket, Gift, Timer, CheckCircle2, Loader2, Plus, Minus } from 'lucide-react';
import { fetchLotteries, joinLottery } from '@/services/lottery';
import { ILottery } from '@/types';
import { toast } from 'sonner';

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
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
            {unit.charAt(0)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function LotteryPage() {
  const [lotteries, setLotteries] = useState<ILottery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);

  const handleJoinLottery = async (lotteryId: string) => {
    try {
      setIsJoining(lotteryId);
      const res = await joinLottery(lotteryId, ticketQuantity);
      
      if (res?.success && res?.data?.gatewayUrl) {
        toast.success('Redirecting to payment gateway...');
        window.location.href = res.data.gatewayUrl;
      } else {
        toast.error(res?.message || 'Failed to join lottery. Please try again.');
      }
    } catch  {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsJoining(null);
    }
  };

  useEffect(() => {
    const getLotteries = async () => {
      setIsLoading(true);
      const res = await fetchLotteries();
      if (res?.success) {
        setLotteries(res.data);
      }
      setIsLoading(false);
    };
    getLotteries();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground lg:py-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container relative mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
            Win Big Today
          </Badge>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Recycle Mart <span className="text-yellow-300">Lottery</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl">
            Participate in our exciting lotteries with just a small entry fee.
            Win amazing prizes like iPhones, Motorbikes, and more!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-8"
            >
              View Active Draws
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white hover:bg-white/10 rounded-full px-8"
            >
              How it Works
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto -mt-10 px-4 relative z-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-lg">
            <CardContent className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-4 text-blue-600">
                <Ticket className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Buy a Ticket</h3>
              <p className="text-sm text-muted-foreground">
                Choose a lottery and purchase a ticket for as low as ৳10.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-purple-100 p-4 text-purple-600">
                <Timer className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Wait for Draw</h3>
              <p className="text-sm text-muted-foreground">
                Watch the live draw countdown. Winners are picked randomly.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600">
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Win Prizes</h3>
              <p className="text-sm text-muted-foreground">
                If your ticket number matches, you win the grand prize!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lotteries Section */}
      <section className="container mx-auto mt-16 px-4">
        <Tabs defaultValue="ACTIVE" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Lotteries
            </h2>
            <TabsList>
              <TabsTrigger value="ACTIVE">Active Draws</TabsTrigger>
              <TabsTrigger value="COMPLETED">Past Winners</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="ACTIVE" className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lotteries
                .filter((l: ILottery) => l.status === 'ACTIVE')
                .map((lottery: ILottery) => (
                  <Card
                    key={lottery._id}
                    className="pt-0 group overflow-hidden border-border/50 transition-all hover:shadow-lg hover:border-primary/50"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={lottery.image}
                        alt={lottery.prize}
                        fill
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
                            Win: {lottery.prize}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {lottery.participantsCount} Participants
                        </span>
                        <span className="flex items-center gap-1 font-medium text-primary/80">
                          <Ticket className="h-3 w-3" />{' '}
                          {lottery.totalTickets} Sold
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
                            <Ticket className="h-4 w-4" /> Buy Ticket
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-106.25">
                          <DialogHeader>
                            <DialogTitle>Join {lottery.title}</DialogTitle>
                            <DialogDescription>
                              Select how many tickets you want to purchase.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-3">
                              <Label htmlFor="quantity" className="text-center text-sm font-medium">Select Ticket Quantity</Label>
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
                                <span>Price per Ticket</span>
                                <span className="font-semibold">
                                  ৳{lottery.ticketPrice}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Quantity</span>
                                <span className="font-semibold">x {ticketQuantity}</span>
                              </div>
                              <div className="border-t my-2"></div>
                              <div className="flex justify-between font-bold">
                                <span>Total Amount</span>
                                <span className="text-primary">
                                  ৳{lottery.ticketPrice * ticketQuantity}
                                </span>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              onClick={() => handleJoinLottery(lottery._id)} 
                              className="w-full"
                              disabled={isJoining === lottery._id}
                            >
                              {isJoining === lottery._id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                'Pay & Join'
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="COMPLETED">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lotteries
                .filter((l: ILottery) => l.status === 'COMPLETED')
                .map((lottery: ILottery) => (
                  <Card key={lottery._id} className="pt-0 opacity-90 overflow-hidden border-border/50">
                    <div className="relative h-32 w-full overflow-hidden grayscale">
                      <Image
                        src={lottery.image}
                        alt={lottery.prize}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-0 h-5"
                        >
                          Ended
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base line-clamp-1">{lottery.title}</CardTitle>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        Prize: {lottery.prize}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg bg-yellow-500/5 border border-yellow-500/10 p-2.5 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                          <Trophy className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">
                            Winner Token
                          </p>
                          <p className="font-bold text-sm text-foreground truncate">
                            {lottery.winnerToken || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-green-600 font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>
                          {new Date(lottery.drawDate).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto mt-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">Live Draws & Transparency</h2>
        <div className="relative overflow-hidden rounded-3xl bg-black text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
          <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-600/90 px-4 py-1 text-sm font-medium text-white animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Live Streaming
              </div>
              <h3 className="text-3xl font-bold sm:text-4xl">
                Watch Draws Live on Facebook & YouTube
              </h3>
              <p className="text-lg text-gray-300">
                We ensure 100% transparency. Every draw is streamed live. You
                can verify the results instantly. Join our community to get
                notified.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white gap-2">
                  Watch on Facebook
                </Button>
                <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white gap-2">
                  Watch on YouTube
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
