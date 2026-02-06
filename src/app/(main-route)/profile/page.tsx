/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";
import { useUserRole } from "@/hooks/useUserRole";
import { 
  Megaphone, 
  Heart, 
  Ticket, 
  CreditCard, 
  PlusCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
  MessageSquare,
  User,
  Settings
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMyAds } from "@/services/ads";
import { fetchMyFavorites } from "@/services/favorite";
import { fetchLotterySummary } from "@/services/lottery";
import { fetchWalletBalance, fetchMySubscription } from "@/services/profile";

export default function ProfileDashboardPage() {
  const { isBuyer, isLoading: roleLoading } = useUserRole();
  const [stats, setStats] = useState({
    adsCount: 0,
    favoritesCount: 0,
    lotteryTokens: 0,
    walletBalance: 0,
    subscriptionPlan: "Free",
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [ads, favorites, lottery, wallet, subscription] = await Promise.all([
          fetchMyAds(),
          fetchMyFavorites(),
          fetchLotterySummary(),
          fetchWalletBalance(),
          fetchMySubscription()
        ]);

        setStats({
          adsCount: ads?.meta?.total || 0,
          favoritesCount: favorites?.meta?.total || favorites?.data?.length || 0,
          lotteryTokens: lottery?.data?.totalTokens || 0,
          walletBalance: wallet?.data?.balance || 0,
          subscriptionPlan: subscription?.data?.plan?.name || "Free",
          totalViews: ads?.data?.reduce((acc: number, ad: any) => acc + (ad.views || 0), 0) || 0,
        });
      } catch {
        // console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!roleLoading) {
      loadStats();
    }
  }, [roleLoading]);

  if (roleLoading || loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 w-full bg-muted rounded-xl" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted rounded-xl" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64 bg-muted rounded-xl" />
          <div className="h-64 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfilePageHeader
        title="Welcome back"
        description={
          isBuyer 
            ? "Manage your favourites, lottery entries and account settings." 
            : "Track your ads, performance, and manage your vendor account."
        }
        actions={
          !isBuyer && (
            <Button asChild className="rounded-full shadow-lg shadow-primary/20">
              <Link href="/ads/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post New Ad
              </Link>
            </Button>
          )
        }
      />

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isBuyer ? (
          <>
            <StatsCard 
              title="Favourites" 
              value={stats.favoritesCount.toString()} 
              icon={Heart} 
              href="/profile/favourites"
            />
            <StatsCard 
              title="My Chats" 
              value="Messages" 
              icon={MessageSquare} 
              href="/chat"
            />
            <StatsCard 
              title="Account Status" 
              value="Active" 
              icon={User} 
              href="/profile/settings"
            />
            <StatsCard 
              title="Settings" 
              value="Manage" 
              icon={Settings} 
              href="/profile/settings"
            />
          </>
        ) : (
          <>
            <StatsCard 
              title="Active Ads" 
              value={stats.adsCount.toString()} 
              icon={Megaphone} 
              href="/profile/my-ads"
            />
            <StatsCard 
              title="My Chats" 
              value="Messages" 
              icon={MessageSquare} 
              href="/chat"
            />
            <StatsCard 
              title="Settings" 
              value="Manage" 
              icon={Settings} 
              href="/profile/settings"
            />
            <StatsCard 
              title="Subscription" 
              value={stats.subscriptionPlan} 
              icon={CreditCard} 
              href="/profile/subscription"
            />
          </>
        )}
      </div>

      {/* Buyer Specific Information Sections (No API Needed) */}
      <div className="grid gap-6 md:grid-cols-2">
        {isBuyer ? (
          <>
            {/* Help & Support Center */}
            <Card className="border-none shadow-sm bg-muted/30 border border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Help & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <SupportItem 
                    title="How to buy safely?" 
                    description="Read our guide on secure transactions."
                  />
                  <SupportItem 
                    title="Refund Policy" 
                    description="Understand how our protection works."
                  />
                  <SupportItem 
                    title="Contact Support" 
                    description="Get help from our 24/7 team."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Platform Trust & Safety */}
            <Card className="border-none shadow-sm bg-muted/30 border border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Trust & Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary rounded-full p-1">
                      <ShieldCheck className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Verified Sellers</p>
                      <p className="text-xs text-muted-foreground">We verify all top vendors for your safety.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary rounded-full p-1">
                      <ShieldCheck className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Secure Payments</p>
                      <p className="text-xs text-muted-foreground">Your financial data is always encrypted.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Vendor Specific Sections - Keep existing or modify as needed */}
            <Card className="border-none shadow-sm bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-primary">
                  <Zap className="h-5 w-5" />
                  Vendor Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Use high-quality photos for 3x more views.",
                    "Detailed descriptions reduce inquiry time.",
                    "Boost your ads for faster sales."
                  ].map((tip, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50">
                      <p className="text-sm font-medium text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-primary/5 border border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Account Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-50 flex items-center justify-center border-2 border-dashed border-primary/20 rounded-xl">
                  <p className="text-sm text-muted-foreground italic">
                    Your ad performance analytics will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Buyer Benefits / Tips (API independent) */}
      {isBuyer && (
        <div className="grid gap-4 md:grid-cols-3">
          <TipCard 
            title="Safe Buying"
            description="Always meet in public places and inspect the item before paying."
            icon={ShieldCheck}
          />
          <TipCard 
            title="Price Alerts"
            description="Add items to favorites to get notified when prices drop."
            icon={Megaphone}
          />
          <TipCard 
            title="Win Big"
            description="Participate in weekly lotteries to win premium recycling tools."
            icon={Ticket}
          />
        </div>
      )}
    </div>
  );
}

function SupportItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-3 rounded-lg bg-background/50 border border-border/50 transition-all hover:shadow-sm">
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function TipCard({ title, description, icon: Icon }: { title: string; description: string; icon: any }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border/50 shadow-sm transition-all hover:border-primary/30">
      <Icon className="h-6 w-6 text-primary mb-3" />
      <h4 className="text-sm font-bold mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  href, 
}: { 
  title: string; 
  value: string; 
  icon: any; 
  href: string;
}) {
  return (
    <Link href={href}>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h3 className="font-bold mt-1">{value}</h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}