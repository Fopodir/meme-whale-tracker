
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getSolanaConnection } from './connectionUtils';

// Get wallet balance with better error handling
export const getWalletBalance = async (walletAddress: string): Promise<number> => {
  try {
    const connection = getSolanaConnection();
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    // Return 0 instead of throwing to prevent app crashes
    return 0;
  }
};
