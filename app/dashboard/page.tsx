'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import OverallBalanceCard from '@/components/OverallBalanceCard';
import TopCryptoAssets from '@/components/TopCryptoAssets';
import MyPortfolio from '@/components/MyPortfolio';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
      <OverallBalanceCard />
      <MyPortfolio />
      <TopCryptoAssets />
    </div>
  );
};

export default DashboardPage;
