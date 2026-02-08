import Navbar from '@/components/common/navbar/Navbar';
import Footer from '@/components/home/Footer';
import { fetchAllCategories } from '@/services/category';
import { fetchExtraData } from '@/services/promo';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categoriesRes, extraDataRes] = await Promise.all([
    fetchAllCategories(),
    fetchExtraData(),
  ]);

  const categories = categoriesRes.success ? categoriesRes.data : [];
  const extraData = extraDataRes.success ? extraDataRes.data : null;

  return (
    <>
      <Navbar categories={categories} extraData={extraData} />
      <div className="min-h-[calc(100vh-37rem)] flex flex-col grow">
        {children}
      </div>
      <Footer />
    </>
  );
}
