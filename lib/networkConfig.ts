// lib/networkConfig.ts
export const NETWORKS = {
  ethereum: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  bsc: process.env.BSC_URL,
  polygon: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
};

