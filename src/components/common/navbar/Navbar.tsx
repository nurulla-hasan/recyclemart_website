/* eslint-disable @typescript-eslint/no-explicit-any */
import NavMiddle from './NavMiddle';
import NavTop from './NavTop';
import { Category } from '@/types/category.type';

const Navbar = ({ categories, extraData }: { categories: Category[], extraData?: any }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-orange-300 dark:bg-orange-400">
      <NavTop extraData={extraData} />
      <div className="shadow-md">
        <NavMiddle categories={categories} logo={extraData?.websiteLogo} />
      </div>
    </nav>
  );
};

export default Navbar;
