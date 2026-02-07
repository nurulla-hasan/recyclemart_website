/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, Crown, Zap, Ticket, Eye, Calendar, ShieldCheck, Clock, Coins } from "lucide-react";
import { format } from "date-fns";

import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchAllPlans, fetchMyInvoices, fetchMySubscription } from "@/services/profile";
import { UpgradeButton } from "@/components/subscription/UpgradeButton";

import { getTranslations } from "next-intl/server";

const getPlanConfig = (name: string, t: any) => {
  switch (name.toLowerCase()) {
    case 'free':
      return { 
        icon: <Ticket className="h-6 w-6 text-slate-500" />, 
        color: "slate", 
        description: t("plans.free")
      };
    case 'basic':
      return { 
        icon: <Zap className="h-6 w-6 text-blue-500" />, 
        color: "blue", 
        description: t("plans.basic"),
      };
    case 'premium':
      return { 
        icon: <Crown className="h-6 w-6 text-amber-500" />, 
        color: "amber", 
        description: t("plans.premium"),
        popular: true 
      };
    default:
      return { 
        icon: <Zap className="h-6 w-6 text-primary" />, 
        color: "primary", 
        description: t("plans.standard") 
      };
  }
};

export default async function SubscriptionPage() {
  const t = await getTranslations("Profile.subscription");
  const [plansRes, mySubRes, invoicesRes] = await Promise.all([
    fetchAllPlans(),
    fetchMySubscription(),
    fetchMyInvoices(),
  ]);

  const plans = plansRes?.success ? plansRes.data || [] : [];
  const currentSub = mySubRes?.success ? mySubRes.data : null;
  const invoices = invoicesRes?.success ? invoicesRes.data || [] : [];

  return (
    <div className="space-y-8">
      <ProfilePageHeader
        title={t("title")}
        description={t("description")}
        actions={
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full shadow-sm hover:bg-primary/5 hover:text-primary transition-all gap-2">
                  <Eye className="h-4 w-4" />
                  {t("viewMySub")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md border-none shadow-2xl overflow-hidden p-0">
                <div className="bg-primary/5 p-6 border-b border-primary/10">
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                        <Crown className="h-5 w-5" />
                      </div>
                      <DialogTitle className="text-xl">{t("activeSubTitle")}</DialogTitle>
                    </div>
                    <DialogDescription className="text-muted-foreground/90">
                      {t("activeSubDesc")}
                    </DialogDescription>
                  </DialogHeader>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Plan Info */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t("currentPlan")}</p>
                      <h4 className="text-2xl font-bold text-primary">{currentSub?.plan?.name || t("freePlan")}</h4>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-3 py-1">
                      {currentSub?.status || t("active")}
                    </Badge>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 p-3 rounded-xl bg-muted/20 border border-border/30">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">{t("startedOn")}</span>
                      </div>
                      <p className="text-sm font-bold">
                        {currentSub?.createdAt ? format(new Date(currentSub.createdAt), "dd MMM, yyyy") : "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1 p-3 rounded-xl bg-muted/20 border border-border/30">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">{t("renewalDate")}</span>
                      </div>
                      <p className="text-sm font-bold">
                        {currentSub?.renewsAt ? format(new Date(currentSub.renewsAt), "dd MMM, yyyy") : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Credits & Status */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <Coins className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{t("availableCredits")}</p>
                        <p className="text-sm font-bold">{currentSub?.credits || 0} {t("credits")}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{t("autoRenew")}</p>
                      <p className="text-xs font-bold text-primary">{currentSub?.autoRenew ? t("enabled") : t("disabled")}</p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="text-sm font-bold">{t("planBenefits")}</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5 pl-1">
                      {currentSub?.plan?.features?.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="pt-4 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground italic">
                    <p>{t("status")}: {currentSub?.status || t("active")}</p>
                    <p className="font-bold text-primary not-italic">{t("price")}: ৳{currentSub?.plan?.price || 0}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
        }
      />

      {/* Plans Section */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan: any) => {
          const config = getPlanConfig(plan.name, t);
          // Default to Free plan if no subscription found
          const isCurrent = currentSub 
            ? currentSub.plan?._id === plan._id 
            : plan.name.toLowerCase() === 'free';

          return (
            <Card 
              key={plan._id} 
              className={`relative flex flex-col border-border/60 bg-card/95 shadow-md transition-all hover:shadow-lg ${config.popular ? 'border-primary ring-1 ring-primary/20' : ''}`}
            >
              {config.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  {t("mostPopular")}
                </div>
              )}
              
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className={`rounded-xl bg-primary/10 p-2.5`}>
                    {config.icon}
                  </div>
                  {isCurrent && (
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {currentSub ? t("activePlan") : t("autoActivated")}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="min-h-10 leading-relaxed">
                  {config.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">৳{plan.price}</span>
                  <span className="text-sm text-muted-foreground font-medium">/{plan.durationUnit?.toLowerCase() || 'month'}</span>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">{t("includedFeatures")}</p>
                  <ul className="space-y-2.5">
                    {plan.features?.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-snug">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                {!(plan.name.toLowerCase() === 'free' && currentSub && !isCurrent) && (
                  <UpgradeButton 
                    planId={plan._id} 
                    planName={plan.name} 
                    isCurrent={isCurrent} 
                  />
                )}
              </CardFooter>
            </Card>
          );
        })}
      </section>

      {/* Billing History Section */}
      <Card className="border-border/60 bg-card/95 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">{t("invoiceHistory")}</CardTitle>
          <CardDescription>{t("invoiceDesc")}</CardDescription>
        </CardHeader>
        <CardContent className="overflow-hidden border border-border/40 p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-45">{t("table.invoice")}</TableHead>
                <TableHead>{t("table.date")}</TableHead>
                <TableHead>{t("table.plan")}</TableHead>
                <TableHead>{t("table.amount")}</TableHead>
                <TableHead className="text-right">{t("table.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((bill: any) => (
                  <TableRow key={bill._id} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-foreground whitespace-nowrap">{bill.invoiceNo || bill._id.substring(0, 10)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {bill.date ? format(new Date(bill.date), "dd MMM yyyy") : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">{bill.planName || "Subscription"}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">৳{bill.amount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Badge variant="outline" className={`border-emerald-400/50 bg-emerald-500/5 text-emerald-600 dark:text-emerald-300 capitalize`}>
                          {bill.status}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    {t("noInvoices")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
