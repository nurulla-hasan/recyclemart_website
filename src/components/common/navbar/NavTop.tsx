/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/UserContext';
import { logOut } from '@/services/Auth';
import { usePathname, useRouter } from 'next/navigation';
import { protectedRoutes } from '@/constants';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NavTop({ extraData }: { extraData?: any }) {
  const t = useTranslations('NavTop');
  
  const promoMessages = extraData?.heading && extraData.heading.length > 0
    ? extraData.heading
    : [
          t('promo1'),
          t('promo2'),
          t('promo3'),
          t('promo4'),
        ];
  
  const [promoIndex, setPromoIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading, setUser } = useUser();

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setIsAnimating(true);
      timeoutRef.current = window.setTimeout(() => {
        setPromoIndex(prev => (prev + 1) % promoMessages.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // logout function
  const handleLogout = async () => {
    await logOut();
    setIsLoading(true);
    setUser(null);

    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push(`/auth/login?redirectPath=${pathname}`);
      // router.push('/auth/login');
    }
  };

  const nextMessage = promoMessages[(promoIndex + 1) % promoMessages.length];
  const transitionClass = isAnimating
    ? 'transition-transform duration-500 ease-in-out'
    : 'transition-none';

  return (
    <section 
      className="border-b border-primary-foreground/15 overflow-hidden transition-all duration-200 ease-in-out max-h-12 opacity-100 visible"
    >
      {/* Mobile Top Row */}
      <div className="flex md:hidden h-10 items-center justify-end px-5 text-sm text-primary-foreground gap-2">
        {/* <Link href="/lottery">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white hover:text-yellow-300"
          >
            <Ticket />
          </Button>
        </Link> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary-foreground hover:text-primary-foreground/80"
            >
              {t('myAccount')}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-border bg-background text-foreground"
          >
            <DropdownMenuItem asChild>
              <Link href="/profile">{t('profile')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/login">{t('signIn')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/register">{t('register')}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="group relative rounded-md h-7 w-7 text-primary-foreground data-[state=active]:bg-primary-foreground/0"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={mounted ? (theme === 'dark' ? t('switchToLight') : t('switchToDark')) : t('toggleTheme')}
          suppressHydrationWarning
        >
          <Moon
            className={`absolute h-5 w-5 transition-all ${
              mounted && theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
            aria-hidden="true"
          />
          <Sun
            className={`h-5 w-5 transition-all ${
              mounted && theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
            aria-hidden="true"
          />
        </Button>
      </div>
      <div className="custom-width mx-auto hidden md:flex h-9 items-center justify-between px-5 text-sm text-primary-foreground">
        <div className="relative h-full min-w-0 flex-1 overflow-hidden">
          <span
            className={`absolute inset-0 flex items-center uppercase ${transitionClass} ${
              isAnimating ? '-translate-y-full' : 'translate-y-0'
            }`}
          >
            {promoMessages[promoIndex]}
          </span>
          <span
            className={`absolute inset-0 flex items-center uppercase ${transitionClass} ${
              isAnimating ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {nextMessage}
          </span>
        </div>

        <div className="flex h-5 items-center space-x-4 text-sm text-primary-foreground">
          {/* <Link href="/lottery">
            <Button
              variant="ghost"
              size="sm"
              className="tracking-widest text-xs hover:bg-black/20 text-white gap-2 hover:text-yellow-300 transition-colors"
            >
              <Ticket />
              {t('lottery')}
            </Button>
          </Link> */}
          {/* <Separator orientation="vertical" className="bg-white" /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="tracking-widest text-xs text-primary-foreground! hover:bg-primary-foreground/10"
              >
                {t('myAccount')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="z-10000"
            >
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t('profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <div onClick={handleLogout} className="text-red-500 hover:text-red-400 cursor-pointer">{t('logout')}</div>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login">{t('signIn')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register">{t('register')}</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="bg-primary-foreground/20" />
          <Button
            variant="ghost"
            size="icon"
            className="group relative rounded-md h-8 w-8 text-primary-foreground data-[state=active]:bg-primary-foreground/0 hover:bg-primary-foreground/0 "
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={mounted ? (theme === 'dark' ? t('switchToLight') : t('switchToDark')) : t('toggleTheme')}
            suppressHydrationWarning
          >
            <Moon
              className={`absolute h-5 w-5 transition-all ${
                mounted && theme === 'dark'
                  ? 'scale-0 opacity-0'
                  : 'scale-100 opacity-100'
              }`}
              aria-hidden="true"
            />
            <Sun
              className={`h-5 w-5 transition-all ${
                mounted && theme === 'dark'
                  ? 'scale-100 opacity-100'
                  : 'scale-0 opacity-0'
              }`}
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
