// /app/api/user/buy-asset/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { generateBTCAddress, generateAddress } from '@/lib/walletUtils';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !('id' in session.user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { assetType, amount } = await req.json();

  try {
    const userId = session.user.id;

    console.log(`Fetching fiat wallet for user ID: ${userId}`);
    const fiatWallet = await prisma.wallet.findFirst({
      where: { userId, type: 'FIAT' },
    });

    if (!fiatWallet || fiatWallet.balance < amount) {
      console.log(`Insufficient funds in fiat wallet for user ID: ${userId}`);
      return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
    }

    // Deduct amount from fiat wallet
    await prisma.wallet.update({
      where: { id: fiatWallet.id },
      data: { balance: { decrement: amount } },
    });

    console.log(`Fetching or creating asset wallet for user ID: ${userId} and asset type: ${assetType}`);
    let assetWallet = await prisma.wallet.findFirst({
      where: { userId, type: assetType },
    });

    if (!assetWallet) {
      const address = assetType === 'BTC' ? generateBTCAddress() : generateAddress(assetType.toLowerCase());
      assetWallet = await prisma.wallet.create({
        data: {
          userId,
          type: assetType,
          balance: 0,
          address,
        },
      });
      console.log(`Created new wallet for user ID: ${userId} with address: ${address}`);
    }

    // Update asset wallet balance
    await prisma.wallet.update({
      where: { id: assetWallet.id },
      data: { balance: { increment: amount } },
    });

    console.log(`Updated wallet balance for user ID: ${userId}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error buying asset:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}
