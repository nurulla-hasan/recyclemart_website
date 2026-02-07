import Navbar from '@/components/common/navbar/Navbar';
import Footer from '@/components/home/Footer';
import { fetchAllCategories } from '@/services/category';
import { fetchAllPromos } from '@/services/promo';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categoriesRes, promosRes] = await Promise.all([
    fetchAllCategories(),
    fetchAllPromos(),
  ]);

  const categories = categoriesRes.success ? categoriesRes.data : [];
  const promos = promosRes.success ? promosRes.data : [];

  return (
    <>
      <Navbar categories={categories} promos={promos} />
      <div className="min-h-[calc(100vh-37rem)] flex flex-col grow">
        {children}
      </div>
      <Footer />
    </>
  );
}
