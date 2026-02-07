import Link from 'next/link';
import NoData from '@/components/common/no-data/NoData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Ghost, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="custom-width mx-auto screen-height">
      <NoData msg="Oops! Page not found." size="full" className="py-16">
        <Card className="w-full max-w-xl border-dashed mt-4">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
              <Ghost className="size-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              404
              <span className="sr-only"> - </span>
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent ml-2">
                Not Found
              </span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or was moved.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button>
                  <ArrowLeft className="mr-1.5" />
                  Go Home
                </Button>
              </Link>
              <Link href="/ads">
                <Button variant="outline">
                  <ShoppingBag className="mr-1.5" />
                  Browse Ads
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </NoData>
    </main>
  );
}
