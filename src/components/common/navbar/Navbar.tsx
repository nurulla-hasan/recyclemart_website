'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import NavMiddle from './NavMiddle';
import NavTop from './NavTop';
import { Category } from '@/types/category.type';

const Navbar = ({ categories, extraData }: { categories: Category[], extraData?: any }) => {
  const [showNavTop, setShowNavTop] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 50) {
              setShowNavTop(true);
            } else {
              const delta = currentScrollY - lastScrollYRef.current;
              if (Math.abs(delta) > 15) {
                if (delta > 0 && currentScrollY > 10) {
                  setShowNavTop(false);
                } else if (delta < 0) {
                  setShowNavTop(true);
                }
                lastScrollYRef.current = currentScrollY;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="h-26 z-50">
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-primary/70 backdrop-blur-xl text-primary-foreground transition-colors shadow-md">
        <div 
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
            showNavTop ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <NavTop extraData={extraData} />
          </div>
        </div>
        <div>
          <NavMiddle categories={categories} logo={extraData?.websiteLogo} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
