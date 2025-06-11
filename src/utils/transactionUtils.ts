
import { PublicKey } from '@solana/web3.js';
import { getSolanaConnection } from './connectionUtils';

export interface Transaction {
  signature: string;
  blockTime: number;
  slot: number;
  meta?: {
    fee: number;
    preBalances: number[];
    postBalances: number[];
  };
}

// Get wallet transactions with pagination support and better error handling
export const getWalletTransactions = async (
  walletAddress: string, 
  limit = 10, 
  before?: string
): Promise<Transaction[]> => {
  try {
    const connection = getSolanaConnection();
    const publicKey = new PublicKey(walletAddress);
    const options: any = { limit };
    
    if (before) {
      options.before = before;
    }
    
    const signatures = await connection.getSignaturesForAddress(publicKey, options);
    
    const transactions = await Promise.all(
      signatures.map(async (sig) => {
        try {
          const tx = await connection.getTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0
          });
          return {
            signature: sig.signature,
            blockTime: sig.blockTime || 0,
            slot: sig.slot,
            meta: tx?.meta ? {
              fee: tx.meta.fee,
              preBalances: tx.meta.preBalances,
              postBalances: tx.meta.postBalances,
            } : undefined
          };
        } catch (error) {
          console.warn(`Failed to fetch transaction ${sig.signature}:`, error);
          return {
            signature: sig.signature,
            blockTime: sig.blockTime || 0,
            slot: sig.slot,
            meta: undefined
          };
        }
      })
    );
    
    return transactions;
  } catch (error) {
    console.error('Error fetching wallet transactions:', error);
    // Return empty array instead of throwing
    return [];
  }
};
