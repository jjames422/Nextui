import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { generateBTCAddress, generateAddress } from '@/lib/walletUtils';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              emailVerified: true,
              image: true
            }
          });

          if (user) {
            const isPasswordValid = bcrypt.compareSync(credentials?.password, user.password);

            if (isPasswordValid) {
              return user;
            }
          }
          return null;
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  events: {
    async createUser({ user }) {
      // Create a fiat wallet for the new user
      await prisma.wallet.create({
        data: {
          userId: user.id,
          type: 'FIAT',
          balance: 0.0,
        },
      });

      // Create BTC wallet
      await prisma.wallet.create({
        data: {
          userId: user.id,
          type: 'BTC',
          balance: 0.0,
          address: generateBTCAddress(),
        },
      });

      // Create ETH wallet
      await prisma.wallet.create({
        data: {
          userId: user.id,
          type: 'ETH',
          balance: 0.0,
          address: generateAddress('ethereum'),
        },
      });

      // Create BNB wallet
      await prisma.wallet.create({
        data: {
          userId: user.id,
          type: 'BNB',
          balance: 0.0,
          address: generateAddress('bsc'),
        },
      });

      // Create Polygon wallet
      await prisma.wallet.create({
        data: {
          userId: user.id,
          type: 'POLYGON',
          balance: 0.0,
          address: generateAddress('polygon'),
        },
      });
    },
  },
};
