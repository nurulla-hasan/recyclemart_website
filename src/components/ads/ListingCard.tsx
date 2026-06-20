import Image from "next/image";
import Link from "next/link";
import { MapPin, Eye } from "lucide-react";
import { RemoveFavoriteButton } from "./RemoveFavoriteButton";

export type ListingCardProps = {
  id: string;
  title: string;
  price: string | number;
  location: string;
  postedAt: string;
  imageUrl: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
  showRemove?: boolean;
  views?: number;
};

const ListingCard = ({
  id,
  title,
  price,
  location,
  imageUrl,
  showRemove = false,
  views,
}: ListingCardProps) => {
  const formattedPrice = typeof price === 'number' 
    ? new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(price) 
    : price;

  return (
    <Link
      href={`/ads/${id || 'item'}`}
      className="group rounded-2xl border bg-card shadow-sm overflow-hidden relative"
    >
      <div className="aspect-6/5 relative">
        <Image
          src={imageUrl || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
        />
        {showRemove && <RemoveFavoriteButton adId={id} />}
      </div>
      <div className="p-3">
        <div className="line-clamp-2 font-medium group-hover:text-primary transition-colors min-h-10">
          {title}
        </div>
        <div className="mt-1 text-sm font-semibold text-muted-foreground">{formattedPrice}</div>
        <div className="mt-2 flex items-center justify-between gap-1 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{location}</span>
          </div>
          {typeof views === 'number' && (
            <div className="flex items-center gap-1 shrink-0">
              <Eye className="h-3 w-3" />
              <span>{views}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
