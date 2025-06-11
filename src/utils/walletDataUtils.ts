
import { getWalletBalance } from './walletUtils';
import { getWalletTransactions } from './transactionUtils';
import { getWalletTokens, getWalletNFTs, TokenBalance, NFT } from './tokenUtils';
import { Transaction } from './transactionUtils';

export interface WalletData {
  balance: number;
  transactions: Transaction[];
  tokens: TokenBalance[];
  nfts: NFT[];
}

// Get comprehensive wallet data with better error handling
export const getWalletData = async (walletAddress: string): Promise<WalletData> => {
  try {
    const [balance, transactions, tokens, nfts] = await Promise.allSettled([
      getWalletBalance(walletAddress),
      getWalletTransactions(walletAddress),
      getWalletTokens(walletAddress),
      getWalletNFTs(walletAddress),
    ]);

    return {
      balance: balance.status === 'fulfilled' ? balance.value : 0,
      transactions: transactions.status === 'fulfilled' ? transactions.value : [],
      tokens: tokens.status === 'fulfilled' ? tokens.value : [],
      nfts: nfts.status === 'fulfilled' ? nfts.value : [],
    };
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    // Return default values instead of throwing
    return {
      balance: 0,
      transactions: [],
      tokens: [],
      nfts: [],
    };
  }
};
