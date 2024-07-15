// /lib/walletUtils.ts
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ethers } from 'ethers';
import { NETWORKS } from './networkConfig';

bitcoin.initEccLib(ecc);

// Generate a Bitcoin address
export function generateBTCAddress(): string {
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  return address!;
}

// Generate an Ethereum-compatible address (ETH, BNB, Polygon)
export function generateAddress(network: string): string {
  const provider = new ethers.providers.JsonRpcProvider(NETWORKS[network]);
  const wallet = ethers.Wallet.createRandom().connect(provider);
  return wallet.address;
}
