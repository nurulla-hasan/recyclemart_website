import LotteryClient from '@/components/lottery/LotteryClient';
import { fetchLotteries } from '@/services/lottery';

export default async function LotteryPage() {
  const res = await fetchLotteries();
  const initialLotteries = res?.success ? res.data : [];

  return <LotteryClient initialLotteries={initialLotteries} />;
}
