import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { NETWORKS } from '@/lib/networkConfig';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      console.error('User already exists:', email);
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Create wallets for the user
    await prisma.wallet.create({
      data: {
        userId: newUser.id,
        type: 'FIAT',
        balance: 0.0,
      },
    });

    await prisma.wallet.create({
      data: {
        userId: newUser.id,
        type: 'BTC',
        balance: 0.0,
        address: generateBTCAddress(),
      },
    });

    await prisma.wallet.create({
      data: {
        userId: newUser.id,
        type: 'ETH',
        balance: 0.0,
        address: generateAddress('ethereum'),
      },
    });

    await prisma.wallet.create({
      data: {
        userId: newUser.id,
        type: 'BNB',
        balance: 0.0,
        address: generateAddress('bsc'),
      },
    });

    await prisma.wallet.create({
      data: {
        userId: newUser.id,
        type: 'POLYGON',
        balance: 0.0,
        address: generateAddress('polygon'),
      },
    });

    console.log('User registered successfully:', email);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

function generateBTCAddress(): string {
  const bitcoin = require('bitcoinjs-lib');
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  return address!;
}

function generateAddress(network: string): string {
  const { ethers } = require('ethers');
  const provider = new ethers.providers.JsonRpcProvider(NETWORKS[network]);
  const wallet = ethers.Wallet.createRandom().connect(provider);
  return wallet.address;
}	
