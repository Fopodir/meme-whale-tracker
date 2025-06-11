
import { Connection } from '@solana/web3.js';

// Use environment variable for RPC endpoint
const DEFAULT_HELIUS_RPC = import.meta.env.VITE_RPC || 'https://api.mainnet-beta.solana.com';

// Get Solana connection - now uses env variable
export const getSolanaConnection = (): Connection => {
  return new Connection(DEFAULT_HELIUS_RPC, 'confirmed');
};
