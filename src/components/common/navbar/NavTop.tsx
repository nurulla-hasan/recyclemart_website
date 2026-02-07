'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, ChevronDown, Ticket } from 'lucide-react';
import { useTheme } from 'next-themes';
import { promoMessages } from './shared';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { logOut } from '@/services/Auth';
import { usePathname, useRouter } from 'next/navigation';
import { protectedRoutes } from '@/constants';

export default function NavTop() {
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
    <section className="border-b border-white/15">
      {/* Mobile Top Row */}
      <div className="flex md:hidden h-10 items-center justify-end px-5 text-sm text-white gap-2">
        <Link href="/lottery">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white hover:text-yellow-300"
          >
            <Ticket />
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-white hover:text-white/80"
            >
              My Account
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-border bg-background text-foreground"
          >
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/login">Sign In</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/register">Register</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            className="group relative rounded-full h-7 w-7 text-white data-[state=active]:bg-white/0"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <Moon
              className={`absolute h-5 w-5 transition-all ${
                theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              aria-hidden="true"
            />
            <Sun
              className={`h-5 w-5 transition-all ${
                theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
              aria-hidden="true"
            />
          </Button>
        )}
      </div>
      <div className="custom-width mx-auto hidden md:flex h-9 items-center justify-between px-5 text-sm text-white">
        <div className="relative h-full min-w-0 flex-1 overflow-hidden">
          <span
            className={`absolute inset-0 flex items-center ${transitionClass} ${
              isAnimating ? '-translate-y-full' : 'translate-y-0'
            }`}
          >
            {promoMessages[promoIndex]}
          </span>
          <span
            className={`absolute inset-0 flex items-center ${transitionClass} ${
              isAnimating ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {nextMessage}
          </span>
        </div>

        <div className="flex h-5 items-center space-x-4 text-sm text-white">
          <Link href="/lottery">
            <Button
              variant="ghost"
              size="sm"
              className="tracking-widest text-xs hover:bg-black/20 text-white gap-2 hover:text-yellow-300 transition-colors"
            >
              <Ticket />
              LOTTERY
            </Button>
          </Link>
          <Separator orientation="vertical" className="bg-white" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="tracking-widest text-xs text-white! hover:bg-black/20"
              >
                MY ACCOUNT
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-border bg-background text-foreground"
            >
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <div onClick={handleLogout} className="text-red-500 hover:text-red-400">Logout</div>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="bg-white" />
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="group relative rounded-full h-8 w-8 text-white data-[state=active]:bg-white/0 hover:bg-white/0 "
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${
                theme === 'dark' ? 'light' : 'dark'
              } mode`}
            >
              <Moon
                className={`absolute h-5 w-5 transition-all ${
                  theme === 'dark'
                    ? 'scale-100 opacity-100'
                    : 'scale-0 opacity-0'
                }`}
                aria-hidden="true"
              />
              <Sun
                className={`h-5 w-5 transition-all ${
                  theme === 'dark'
                    ? 'scale-0 opacity-0'
                    : 'scale-100 opacity-100'
                }`}
                aria-hidden="true"
              />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
