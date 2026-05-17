"use client";

import { Shield, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { useTranslations, useFormatter } from "next-intl";
import { User } from "@/types/ad.type";

type SellerInfoProps = {
  seller: User;
  location?: string;
};

export default function SellerInfo({ seller, location }: SellerInfoProps) {
  const t = useTranslations("AdDetails");
  const format = useFormatter();
  const initials = seller.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="rounded-xl border border-border/40 bg-card">
      <div className="p-6 pb-4 border-b border-border/40">
        <h3 className="text-lg font-semibold">{t("sellerInfo")}</h3>
      </div>
      <div className="p-6 space-y-4">
        {/* Seller Profile */}
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted border border-border/40">
            {seller.image ? (
              <Image
                src={seller.image}
                alt={seller.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-bold">
                {initials}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate text-foreground text-lg">
                {seller.name}
              </h3>
              {seller.role === "VENDOR" && (
                <Shield className="w-4 h-4 text-primary shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground capitalize">
              {seller.role.toLowerCase()}
            </p>
          </div>
        </div>

        {/* Seller Details */}
        <div className="space-y-2.5 pt-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {t("memberSince", {
                date: format.dateTime(new Date(seller.createdAt), {
                  year: "numeric",
                  month: "short",
                }),
              })}
            </span>
          </div>
          {location && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{location}</span>
            </div>
          )}
        </div>

        {/* Action Button (Optional, can be added if needed) */}
        <div className="pt-2">
           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/20">
             {t("verifiedUser")}
           </span>
        </div>
      </div>
    </div>
  );
}
