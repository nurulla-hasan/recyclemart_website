/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays, Ticket, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";
import { fetchLotterySummary, fetchUpcomingLotteries, fetchMyLotteryTokens } from "@/services/lottery";
import { getTranslations } from "next-intl/server";

// Token Component to fetch individual lottery tokens
async function LotteryTokenList({ lotteryId, t }: { lotteryId: string, t: any }) {
  const tokenRes = await fetchMyLotteryTokens(lotteryId);
  const tokens = tokenRes?.success ? tokenRes.data?.tokenNumbers : [];

  if (!tokens || tokens.length === 0) return null;

  return (
    <div className="mt-1 space-y-1.5">
      <p className="text-[10px] text-muted-foreground font-medium">{t("tokens")}:</p>
      <div className="flex flex-wrap gap-1.5">
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
    </div>
  );
}

export default async function MyLotteryPage() {
  const t = await getTranslations("Profile.myLottery");
  const [summaryRes, upcomingRes] = await Promise.all([
    fetchLotterySummary(),
    fetchUpcomingLotteries(),
  ]);

  const summary = summaryRes?.success ? summaryRes.data : null;
  const upcomingDraws = upcomingRes?.success ? upcomingRes.data : [];

  const lotteryStats = [
    {
      label: t("stats.entries"),
      value: summary?.entriesThisMonth || "0",
      change: t("stats.activeEntries"),
      icon: Ticket,
    },
    {
      label: t("stats.wins"),
      value: summary?.winsCount || "0",
      change: t("stats.totalLuckyDraws"),
      icon: Trophy,
    },
  ];

  return (
    <div className="space-y-6">
      <ProfilePageHeader
        title={t("title")}
        description={t("description")}
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
              <CalendarDays className="h-4 w-4 text-primary" /> {t("upcomingDraws")}
            </CardTitle>
            <CardDescription>{t("upcomingDesc")}</CardDescription>
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
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {t("drawDate")}: {draw.drawDate}
                        </p>
                      </div>
                    </div>
                    
                    <LotteryTokenList lotteryId={draw.lotteryId} t={t} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border/60">
                <Ticket className="h-8 w-8 mb-2 opacity-20" />
                <p>{t("noDraws")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
