"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import {
  Heart,
  LayoutDashboard,
  Megaphone,
  Settings,
  Ticket,
  // Bell,
  UserCircle,
  CreditCard,
  Menu,
  ShieldCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useUserRole } from "@/hooks/useUserRole";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

import React from "react";

type UserProfile = {
  _id: string;
  name: string;
  phone: string;
  image?: string;
  email: string;
  isVerifiedByOTP: boolean;
  role: string;
};

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

type SidebarContentProps = {
  user: UserProfile | null;
  className?: string;
  onNavigate?: () => void;
  LinkWrapper?: React.ComponentType<{
    children: React.ReactNode;
    asChild?: boolean;
    onClick?: () => void;
  }>;
};

function SidebarContent({
  user,
  className,
  onNavigate,
  LinkWrapper,
}: SidebarContentProps) {
  const t = useTranslations("Profile.sidebar");
  const pathname = usePathname();
  const { isBuyer, isLoading: roleLoading } = useUserRole();

  const navSections: NavSection[] = [
    {
      title: t("overview"),
      items: [
        { label: t("dashboard"), href: "/profile", icon: LayoutDashboard },
      ],
    },
    {
      title: t("myActivity"),
      items: [
        { label: t("myAds"), href: "/profile/my-ads", icon: Megaphone },
        { label: t("favouriteAds"), href: "/profile/favourites", icon: Heart },
        { label: t("myLottery"), href: "/profile/my-lottery", icon: Ticket },
        { label: t("mySubscription"), href: "/profile/subscription", icon: CreditCard },
      ],
    },
    {
      title: t("account"),
      items: [{ label: t("settings"), href: "/profile/settings", icon: Settings }],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/profile") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  if (roleLoading) {
    return (
      <div className={cn("flex flex-col gap-4 animate-pulse", className)}>
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-3 w-32 bg-muted rounded" />
          </div>
        </div>
        <div className="h-10 w-full bg-muted rounded-full" />
        <div className="space-y-4 pt-4">
          <div className="h-3 w-16 bg-muted rounded" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-full bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-3">
        <Avatar className="h-14 w-14 border border-border/50 shadow-sm">
          <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
          <AvatarFallback className="bg-primary/5 text-primary">
            <UserCircle className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold leading-tight truncate">
            {user?.name || t("userName")}
          </h2>
          <p className="text-xs text-muted-foreground font-medium">
            {user?.phone || user?.email || t("noContactInfo")}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="text-[10px] h-5 font-semibold bg-primary/10 text-primary border-none"
            >
              {user?.role ? t(`roles.${user.role}`) : t("member")}
            </Badge>
            {user?.isVerifiedByOTP ? (
              <Badge className="text-[10px] h-5 gap-1 bg-emerald-500 hover:bg-emerald-600 border-none">
                <ShieldCheck className="h-3 w-3" />
                {t("verified")}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>

      {!isBuyer && (
        <Button variant="default" className="w-full rounded-full">
          <Link href="/ads/create">{t("postAnAd")}</Link>
        </Button>
      )}

      <Separator className="bg-border/70" />

      <nav className="space-y-5 text-sm">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground/80">
              {section.title}
            </p>
            <div className="space-y-1.5">
              {section.items.map(({ label, icon: Icon, href, badge }) => {
                // Hide "My Ads" and "My Subscription" for BUYER role
                if (isBuyer && (href === "/profile/my-ads" || href === "/profile/subscription")) {
                  return null;
                }

                const active = isActive(href);

                const LinkComponent = (
                  <Link
                    href={href}
                    className={cn(
                      "group flex items-center justify-between gap-3 rounded-xl border px-3 py-2 transition",
                      active
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/60"
                    )}
                    onClick={onNavigate}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-lg border text-sm transition",
                          active
                            ? "border-primary/30 bg-primary/20 text-primary"
                            : "border-border/60 bg-muted/60 text-muted-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-medium leading-tight">{label}</span>
                    </span>
                    {badge ? (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "h-6 min-w-7 justify-center text-[11px]",
                          active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        )}
                      >
                        {badge}
                      </Badge>
                    ) : null}
                  </Link>
                );

                if (LinkWrapper) {
                  return (
                    <LinkWrapper key={label} asChild>
                      {LinkComponent}
                    </LinkWrapper>
                  );
                }

                return <React.Fragment key={label}>{LinkComponent}</React.Fragment>;
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

type ProfileSidebarProps = {
  user: UserProfile | null;
  variant?: "desktop" | "mobile";
  className?: string;
  onNavigate?: () => void;
};

export default function ProfileSidebar({
  user,
  variant = "desktop",
  className,
  onNavigate,
}: ProfileSidebarProps) {
  const t = useTranslations("Profile.sidebar");
  if (variant === "mobile") {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className={cn("w-full justify-between h-auto py-1 px-1", className)}
          >
            <div className="flex items-center gap-3 text-left">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={user?.image} alt={user?.name} className="object-cover" />
                <AvatarFallback>
                  <UserCircle className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-semibold leading-none truncate">{user?.name || t("userName")}</p>
                <p className="text-xs text-muted-foreground mt-1">{t("manageAccount")}</p>
              </div>
            </div>
            <Menu className="h-5 w-5 text-muted-foreground" />
          </Button>
        </SheetTrigger>
        <SheetTitle className="sr-only">{t("manageAccount")}</SheetTitle>
        <SheetContent side="left" className="w-[320px] p-5 overflow-y-auto">
          <SidebarContent user={user} onNavigate={onNavigate} LinkWrapper={SheetClose} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
   <div>
     <aside
      className={cn(
        "hidden rounded-xl border bg-card/95 p-5 shadow-sm lg:flex flex-col gap-4 sticky top-24",
        className
      )}
    >
      <SidebarContent user={user} onNavigate={onNavigate} />
    </aside>
   </div>
  );
}
