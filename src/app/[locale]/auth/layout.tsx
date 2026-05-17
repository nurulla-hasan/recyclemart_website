import Navbar from '@/components/common/navbar/Navbar';
import { fetchAllCategories } from '@/services/category';
import { fetchExtraData } from '@/services/promo';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categoriesRes, extraDataRes] = await Promise.all([
    fetchAllCategories(),
    fetchExtraData(),
  ]);

  const categories = categoriesRes.success ? categoriesRes.data : [];
  const extraData = extraDataRes.success ? extraDataRes.data : null;

  return (
    <>
      <Navbar categories={categories} extraData={extraData} />
      <main className="min-h-[calc(100vh-112px)]">{children}</main>
    </>
  );
}
