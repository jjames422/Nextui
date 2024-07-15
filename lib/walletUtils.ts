import * as bitcoin from 'bitcoinjs-lib';
import { ethers } from 'ethers';
import { NETWORKS } from './networkConfig';

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
