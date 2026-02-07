/* eslint-disable @typescript-eslint/no-explicit-any */
import NavMiddle from './NavMiddle';
import NavTop from './NavTop';
import { Category } from '@/types/category.type';

const Navbar = ({ categories, promos = [] }: { categories: Category[], promos?: any[] }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-primary dark:bg-teal-950">
      <NavTop promos={promos} />
      <div className="shadow-md">
        <NavMiddle categories={categories} />
      </div>
    </nav>
  );
};

export default Navbar;
