// /app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { generateBTCAddress, generateAddress } from '@/lib/walletUtils';

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

    // Create wallets for the user with unique addresses
    const fiatAddress = `fiat-${newUser.id}-${Date.now()}`; // Unique placeholder for FIAT

    await prisma.wallet.create({
      data: {
        userId: newUser.id,
        type: 'FIAT',
        balance: 0.0,
        address: fiatAddress,
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
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
  }
}
