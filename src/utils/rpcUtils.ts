
import { Connection } from '@solana/web3.js';

// Use environment variable for RPC endpoint with a secure fallback
const DEFAULT_RPC = import.meta.env.VITE_RPC || 'https://api.mainnet-beta.solana.com';

// Get Solana connection
export const getSolanaConnection = (): Connection => {
  return new Connection(DEFAULT_RPC, 'confirmed');
};

// Re-export everything for backward compatibility
export { getWalletBalance } from './walletUtils';
export { getWalletTransactions, type Transaction } from './transactionUtils';
export { 
  getWalletTokens, 
  getWalletNFTs, 
  getTokenMetadata, 
  getTokenSymbolFromSolscan, 
  get_spl_token_balance,
  type TokenBalance,
  type NFT 
} from './tokenUtils';
export { executeJupiterSwap } from './jupiterUtils';
export { getWalletData, type WalletData } from './walletDataUtils';
