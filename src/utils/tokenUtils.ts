
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import Moralis from 'moralis';
import { getSolanaConnection } from './connectionUtils';
import { initMoralis, isMoralisInitialized, getMoralisApiKey } from './moralisUtils';

export interface TokenBalance {
  mint: string;
  amount: number;
  decimals: number;
  symbol?: string;
  name?: string;
}

export interface NFT {
  mint: string;
  name: string;
  image: string;
  collection?: string;
}

// Get wallet tokens using Moralis with better error handling
export const getWalletTokens = async (walletAddress: string): Promise<TokenBalance[]> => {
  try {
    if (!getMoralisApiKey()) {
      console.warn('Moralis API key not provided, skipping token fetch');
      return [];
    }

    await initMoralis();
    
    if (!isMoralisInitialized()) {
      console.warn('Moralis not initialized, skipping token fetch');
      return [];
    }
    
    const response = await Moralis.SolApi.account.getSPL({
      network: "mainnet",
      address: walletAddress,
    });
    
    return response.raw.map((token: any) => ({
      mint: token.mint,
      amount: parseFloat(token.amount) / Math.pow(10, token.decimals),
      decimals: token.decimals,
      symbol: token.symbol,
      name: token.name,
    }));
  } catch (error) {
    console.error('Error fetching wallet tokens:', error);
    return [];
  }
};

// Get wallet NFTs using Moralis with better error handling
export const getWalletNFTs = async (walletAddress: string): Promise<NFT[]> => {
  try {
    if (!getMoralisApiKey()) {
      console.warn('Moralis API key not provided, skipping NFT fetch');
      return [];
    }

    await initMoralis();
    
    if (!isMoralisInitialized()) {
      console.warn('Moralis not initialized, skipping NFT fetch');
      return [];
    }
    
    const response = await Moralis.SolApi.account.getNFTs({
      network: "mainnet",
      address: walletAddress,
    });
    
    return response.raw.map((nft: any) => ({
      mint: nft.mint,
      name: nft.name || 'Unknown NFT',
      image: nft.content?.links?.image || '',
      collection: nft.grouping?.[0]?.group_value,
    }));
  } catch (error) {
    console.error('Error fetching wallet NFTs:', error);
    return [];
  }
};

// Get token metadata using Moralis
export const getTokenMetadata = async (tokenAddress: string): Promise<{ symbol: string; name: string } | null> => {
  try {
    if (!getMoralisApiKey() || !isMoralisInitialized()) {
      console.warn('Moralis not available for token metadata');
      return null;
    }
    
    const response = await Moralis.SolApi.token.getTokenMetadata({
      network: "mainnet",
      address: tokenAddress,
    });
    
    if (!response?.raw) {
      console.warn('No token metadata found for address:', tokenAddress);
      return null;
    }
    
    return {
      symbol: response.raw.symbol || '',
      name: response.raw.name || ''
    };
  } catch (error) {
    console.error('Error fetching token metadata from Moralis:', error);
    return null;
  }
};

export const getTokenSymbolFromSolscan = async (tokenAddress: string): Promise<string | null> => {
  try {
    const response = await fetch(`https://public-api.solscan.io/token/meta?tokenAddress=${tokenAddress}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data.symbol || null;
  } catch (error) {
    console.error('Error fetching token symbol from Solscan:', error);
    return null;
  }
};

export const get_spl_token_balance = async (mint: string, walletAddress: string): Promise<number> => {
  const connection = getSolanaConnection();
  const ata = await getAssociatedTokenAddress(new PublicKey(mint), new PublicKey(walletAddress));
  try {
    const account = await getAccount(connection, ata);
    return Number(account.amount);
  } catch (e) {
    console.error("Error getting SPL token balance:", e);
    return 0;
  }
};
