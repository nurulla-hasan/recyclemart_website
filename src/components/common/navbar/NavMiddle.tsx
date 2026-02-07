'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Menu,
  MenuIcon,
  MessageCircle,
  User,
  ListTree,
  Globe,
  PlusCircle,
  Heart,
  Loader2,
  LogOut,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/context/UserContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Category } from '@/types/category.type';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { logOut } from '@/services/Auth';
import { protectedRoutes } from '@/constants';

const NavMiddle = ({ categories }: { categories: Category[] }) => {
  const { user, setIsLoading, setUser } = useUser();
  const { isBuyer } = useUserRole();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();

  const handleLanguageChange = () => {
    const nextLocale = locale === 'en' ? 'bn' : 'en';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const handleLogout = async () => {
    await logOut();
    setIsLoading(true);
    setUser(null);

    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push(`/auth/login?redirectPath=${pathname}`);
    }
  };

  return (
    <div>
      <div className="custom-width mx-auto flex items-center justify-between py-2.5 px-5">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Recycle Mart"
            width={100}
            height={20}
            unoptimized
            className="h-auto w-9 md:w-14"
          />
        </Link>

        {/* Desktop Primary Actions - Centered */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-2">
          {/* Categories Dropdown */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button className="h-9 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/20 shrink-0">
                <MenuIcon className="h-4 w-4" />
                <span>{t('categories')}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-200 border-white/20 bg-primary/95 dark:bg-teal-950 p-6 text-white rounded-3xl backdrop-blur-md z-50">
              <ScrollArea className="h-fit max-h-[70vh]">
                <div className="grid grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/ads?category=${category.slug}`}
                      onClick={() => setIsPopoverOpen(false)}
                      className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-white/10 transition hover:border-white/30 hover:bg-white/15 text-center"
                    >
                      {category.icon && (
                        <div className="relative w-10 h-10 mb-2 transition-transform group-hover:scale-110">
                          <Image src={category.icon} alt={category.name} fill className="object-contain invert" />
                        </div>
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

          <Link
            href="/ads"
            className="group h-9 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <ListTree className="h-4 w-4 text-white/80" />
            <span>{t('browseListings')}</span>
          </Link>

          <Button
            onClick={handleLanguageChange}
            disabled={isPending}
            className="h-9 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/20 disabled:opacity-70"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin text-white/80" />
            ) : (
              <Globe className="h-4 w-4 text-white/80" />
            )}
            <span>{t('language')}</span>
          </Button>
        </div>

        {/* Desktop Utility Links */}
        <div className="hidden lg:flex items-center gap-2 text-sm">
          {user && (
            <Link href="/chat">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 text-white hover:bg-white/20 w-9 h-9"
                title={t('inbox')}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {user && !isBuyer && (
            <Link href="/ads/create">
              <Button
                size="sm"
                className="h-9 flex items-center gap-2 rounded-full bg-linear-to-r from-pink-400 to-orange-500 px-5 text-sm font-bold text-white hover:from-pink-300 hover:to-orange-400 shadow-lg shadow-orange-500/20"
              >
                <PlusCircle className="h-4 w-4" />
                {t('postFreeAd')}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile & Tablet View */}
        <div className="flex items-center gap-1.5 lg:hidden">
          {/* Favorites Button */}
          {user && (
            <Link href="/profile/favourites">
              <Button
                size="icon"
                className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-white/30 w-9 h-9"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </Link>
          )}

          {/* Main Menu (Mobile) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-white/30 w-9 h-9 border border-white/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-75 border-l border-white/10 bg-primary/95 p-0 text-white backdrop-blur-xl"
            >
              <SheetHeader className="px-5 py-4 border-b border-white/10 bg-white/5">
                <SheetTitle className="flex items-center justify-between">
                  <Link href="/" className="inline-flex">
                    <Image
                      src="/logo.png"
                      alt="logo"
                      width={100}
                      height={25}
                      className="h-auto w-12 md:w-16"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              <ScrollArea className="h-[calc(100vh-75px)]">
                <div className="flex flex-col gap-6 px-5 pb-6 pt-4">
                  {/* Explore Section */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 px-1">
                      {t('explore')}
                    </p>
                    <Link
                      href="/ads"
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium transition hover:bg-white/10"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                        <ListTree className="h-4 w-4 text-white" />
                      </div>
                      <span>{t('browseListings')}</span>
                    </Link>

                    {/* Categories Grid */}
                    <div className="space-y-3 mt-5">
                       <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 px-1">
                        {t('categories')}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                         {categories.slice(0, 6).map(category => (
                          <Link
                            key={category._id}
                            href={`/ads?category=${category.slug}`}
                            className="group flex flex-col items-center gap-2 p-2.5 rounded-xl border border-white/5 bg-white/5 transition hover:bg-white/10 text-center"
                          >
                             {category.icon && (
                              <div className="relative w-5 h-5 transition-transform group-hover:scale-110">
                                <Image src={category.icon} alt={category.name} fill className="object-contain invert opacity-70 group-hover:opacity-100" />
                              </div>
                            )}
                            <span className="text-[11px] font-medium text-white/80 group-hover:text-white">{category.name}</span>
                          </Link>
                        ))}
                      </div>
                      <Link href="/ads" className="block text-center text-[11px] font-medium text-white/50 hover:text-white transition-colors py-0.5">
                        {t('viewAllCategories')} →
                      </Link>
                    </div>
                  </div>

                  {/* Settings & Account */}
                  <div className="space-y-3">
                     <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 px-1">
                      {t('settings')}
                    </p>
                    <Button
                      onClick={handleLanguageChange}
                      disabled={isPending}
                      className="w-full h-11 justify-start flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-70"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                        {isPending ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                        ) : (
                          <Globe className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>
                      <span>{t('language')}</span>
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      {user && (
                        <Link
                          href="/chat"
                          className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-2.5 text-sm transition hover:bg-white/10"
                        >
                          <MessageCircle className="h-4 w-4 text-white/70" />
                          <span className="text-[11px] font-medium">{t('inbox')}</span>
                        </Link>
                      )}
                      <Link
                        href={user ? '/profile' : '/auth/login'}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 p-2.5 text-sm transition hover:bg-white/10 ${!user ? 'col-span-2' : ''}`}
                      >
                        <User className="h-4 w-4 text-white/70" />
                        <span className="text-[11px] font-medium">{user ? t('profile') : t('signIn')}</span>
                      </Link>
                    </div>

                    {user && (
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full h-11 justify-start flex items-center gap-3 rounded-xl border border-red-500/10 bg-red-500/5 px-4 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10">
                          <LogOut className="h-3.5 w-3.5" />
                        </div>
                        <span>{t('logout')}</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Bottom Action */}
                {!isBuyer && (
                  <div className="px-5 py-5 mt-auto">
                    <Link href="/ads/create">
                      <Button className="w-full h-12 gap-3 rounded-xl bg-linear-to-r from-pink-500 via-orange-500 to-yellow-500 text-sm font-bold text-white shadow-lg hover:brightness-110 transition-all active:scale-[0.98]">
                        <PlusCircle className="h-5 w-5" />
                        {t('postFreeAd')}
                      </Button>
                    </Link>
                  </div>
                )}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default NavMiddle;
