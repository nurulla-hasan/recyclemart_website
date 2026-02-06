'use client';

import { useState } from 'react';
import Link from 'next/link';
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

const NavMiddle = ({ categories }: { categories: Category[] }) => {
  const { user } = useUser();
  const { isBuyer, isLoading: roleLoading } = useUserRole();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-5">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Recycle Mart"
            width={100}
            height={20}
            unoptimized
            className="h-auto w-10 md:w-16"
          />
        </Link>

        {/* Desktop Primary Actions - Centered */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-3">
          {/* Categories Dropdown */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button className="h-10 flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20 shrink-0">
                <MenuIcon className="h-4 w-4" />
                <span>Categories</span>
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
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            <ListTree className="h-4 w-4 text-white/80" />
            <span>Browse listings</span>
          </Link>

          <Link
            href="/language"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            <Globe className="h-4 w-4 text-white/80" />
            <span>বাংলা</span>
          </Link>
        </div>

        {/* Desktop Utility Links */}
        <div className="hidden lg:flex items-center gap-3 text-sm">
          <Link href={user ? '/chat' : '/auth/login'}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 text-white hover:bg-white/20 w-10 h-10"
              title="Inbox"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>

          {roleLoading ? (
            <div className="h-10 w-32 rounded-full bg-white/10 animate-pulse" />
          ) : (
            !isBuyer && (
              <Link href={user ? '/ads/create' : '/auth/login'}>
                <Button
                  size="sm"
                  className="flex items-center gap-2 rounded-full bg-linear-to-r from-pink-400 to-orange-500 px-6 py-5 text-sm font-bold text-white hover:from-pink-300 hover:to-orange-400 shadow-lg shadow-orange-500/20"
                >
                  <PlusCircle className="h-4 w-4" />
                  Post Free Ad
                </Button>
              </Link>
            )
          )}
        </div>

        {/* Mobile & Tablet View */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Favorites Button */}
          <Link href="/profile/favourites">
            <Button
              size="icon"
              className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-white/30 w-10 h-10"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Main Menu (Mobile) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-white/30 w-10 h-10"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] border-white/20 bg-primary/95 p-0 text-white"
            >
              <SheetHeader className="px-6 py-4 border-b border-white/10">
                <SheetTitle className="flex items-center justify-between">
                  <Link href="/" className="inline-flex">
                    <Image
                      src="/logo.png"
                      alt="logo"
                      width={80}
                      height={20}
                      className="h-auto w-12 md:w-16"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-80px)]">
                <div className="flex flex-col gap-6 px-6 py-6">
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      Explore
                    </p>
                    <Link
                      href="/ads"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base font-semibold transition hover:bg-white/15"
                    >
                      <ListTree className="h-5 w-5 text-white/80" />
                      Browse Ads
                    </Link>

                    {/* Categories Trigger inside Main Menu */}
                    <div className="space-y-3">
                       <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mt-4">
                        Categories
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                         {categories.slice(0, 6).map(category => (
                          <Link
                            key={category._id}
                            href={`/ads?category=${category.slug}`}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/5 transition hover:bg-white/10"
                          >
                             {category.icon && (
                              <div className="relative w-5 h-5">
                                <Image src={category.icon} alt={category.name} fill className="object-contain" />
                              </div>
                            )}
                            <span className="text-sm font-medium">{category.name}</span>
                          </Link>
                        ))}
                        <Link href="/ads" className="text-center text-xs text-white/60 hover:text-white py-2">
                          View all categories →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      Settings
                    </p>
                    <Link
                      href="/language"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                    >
                      <Globe className="h-4 w-4 text-white/80" />
                      বাংলা (Language)
                    </Link>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/chat"
                        className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:bg-white/15 justify-center"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Inbox
                      </Link>
                      <Link
                        href={user ? '/profile' : '/auth/login'}
                        className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:bg-white/15 justify-center"
                      >
                        <User className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </div>
                  </div>
                </div>
                {roleLoading ? (
                  <div className="px-6 py-6 pb-10">
                    <div className="h-14 w-full rounded-xl bg-white/10 animate-pulse" />
                  </div>
                ) : (
                  !isBuyer && (
                    <div className="px-6 py-6 pb-10">
                      <Link href={user ? '/ads/create' : '/auth/login'}>
                        <Button className="w-full gap-2 rounded-xl bg-linear-to-r from-pink-400 to-orange-500 text-base font-semibold text-white shadow-lg hover:from-pink-300 hover:to-orange-400 py-6">
                          <PlusCircle className="h-5 w-5" />
                          Post Free Ad
                        </Button>
                      </Link>
                    </div>
                  )
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
