import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { prisma, WalletType } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = session.user.id;

    // Ensure all wallet types are defined and filter out any undefined ones
    const walletTypes = [
      WalletType.BTC,
      WalletType.ETH,
      WalletType.BNB,
      WalletType.POLYGON,
      WalletType.USDC
    ].filter(type => type !== undefined);

    const assets = await prisma.wallet.findMany({
      where: {
        userId,
        balance: {
          gt: 0, // Only fetch assets with a balance greater than 0
        },
        type: {
          in: walletTypes, // Use the filtered wallet types
        },
      },
      select: {
        type: true,
        balance: true,
      },
    });

    return NextResponse.json({ assets }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user portfolio:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
