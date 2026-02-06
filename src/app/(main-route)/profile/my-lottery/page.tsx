/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays, Ticket, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";
import { fetchLotterySummary, fetchUpcomingLotteries, fetchMyLotteryTokens } from "@/services/lottery";

// Token Component to fetch individual lottery tokens
async function LotteryTokenList({ lotteryId }: { lotteryId: string }) {
  const tokenRes = await fetchMyLotteryTokens(lotteryId);
  const tokens = tokenRes?.success ? tokenRes.data?.tokenNumbers : [];

  if (!tokens || tokens.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tokens.map((token: string) => (
        <Badge 
          key={token} 
          variant="secondary" 
          className="bg-primary/5 text-primary border-primary/10 text-[10px] font-mono px-1.5 py-0"
        >
          {token}
        </Badge>
      ))}
    </div>
  );
}

export default async function MyLotteryPage() {
  const [summaryRes, upcomingRes] = await Promise.all([
    fetchLotterySummary(),
    fetchUpcomingLotteries(),
  ]);

  const summary = summaryRes?.success ? summaryRes.data : null;
  const upcomingDraws = upcomingRes?.success ? upcomingRes.data : [];

  const lotteryStats = [
    {
      label: "Entries this month",
      value: summary?.entriesThisMonth || "0",
      change: "Active entries",
      icon: Ticket,
    },
    {
      label: "Wins so far",
      value: summary?.winsCount || "0",
      change: "Total lucky draws",
      icon: Trophy,
    },
  ];

  return (
    <div className="space-y-6">
      <ProfilePageHeader
        title="My Lottery"
        description="Increase your chances to win exclusive prizes and ad boosts. Track entries, rewards, and draw schedules here."
      />

      <section className="grid gap-4 md:grid-cols-2">
        {lotteryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-border/60 bg-card/95 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6">
        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <CalendarDays className="h-4 w-4 text-primary" /> Upcoming draws
            </CardTitle>
            <CardDescription>View your active entries and upcoming draw dates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDraws.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingDraws.map((draw: any) => (
                  <div
                    key={draw.lotteryId}
                    className="flex flex-col gap-3 rounded-xl border border-border/40 bg-muted/30 p-4 text-sm dark:bg-muted/20"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground">{draw.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Draw on {new Date(draw.drawDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="border-primary/40 text-primary">
                        {draw.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Price: ৳{draw.ticketPrice}</p>
                    
                    {/* Integrated Token List */}
                    <LotteryTokenList lotteryId={draw.lotteryId} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Ticket className="h-12 w-12 text-muted-foreground/20" />
                <p className="mt-2 text-sm text-muted-foreground">No upcoming draws found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
