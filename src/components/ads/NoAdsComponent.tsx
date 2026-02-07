import { PackageOpen } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function NoAdsComponent() {
    const t = useTranslations('Ads');
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-100">
            <div className="rounded-full bg-muted p-6 mb-6">
                <PackageOpen className="h-16 w-16 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{t('noAdsTitle')}</h3>
            <p className="text-muted-foreground max-w-md mb-8">
                {t('noAdsDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    variant="outline"
                    onClick={() => window.location.href = '/ads'}
                    className="rounded-full"
                >
                    {t('clearFilters')}
                </Button>
                <Link href="/ads/create">
                    <Button className="rounded-full bg-primary px-8 text-base font-bold shadow-lg">
                        {t('postAd')}
                    </Button>
                </Link>
            </div>
        </div>
    )
}
