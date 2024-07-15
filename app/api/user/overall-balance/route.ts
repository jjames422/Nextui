// app/api/user/overall-balance/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = session.user.id;

    console.log(`Fetching fiat wallet for user ID: ${userId}`);
    const fiatWallet = await prisma.wallet.findFirst({
      where: { userId, type: 'FIAT' },
    });

    if (!fiatWallet) {
      console.log(`No fiat wallet found for user ID: ${userId}`);
    }

    console.log(`Fetching crypto wallets for user ID: ${userId}`);
    const assets = await prisma.wallet.findMany({
      where: {
        userId,
        type: { in: ['BTC', 'ETH', 'BNB', 'POLYGON'] },
      },
      select: { balance: true },
    });

    const totalBalance = assets.reduce((acc, asset) => acc + asset.balance, 0);

    console.log(`Total Balance: ${totalBalance}, Fiat Balance: ${fiatWallet?.balance || 0.0}`);

    return NextResponse.json({ totalBalance: totalBalance || 0.0, fiatBalance: fiatWallet?.balance || 0.0 }, { status: 200 });
  } catch (error) {
    console.error('Error fetching overall balance:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
