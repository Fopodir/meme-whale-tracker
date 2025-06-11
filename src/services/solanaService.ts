import { getSolanaConnection } from '../utils/connectionUtils';
import { PublicKey } from '@solana/web3.js';

interface TokenData {
  address: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  holders: number;
  isNew: boolean;
  age: string;
  liquidity: number;
  transactions24h: number;
}

const DEFAULT_TOKEN_IMAGE = '/placeholder.svg';

let moralisInitialized = false;

const initializeMoralis = async (apiKey: string) => {
  if (!moralisInitialized && apiKey) {
    try {
      const Moralis = await import('moralis');
      await Moralis.default.start({
        apiKey: apiKey,
      });
      moralisInitialized = true;
      console.log('Moralis initialized successfully');
    } catch (error) {
      console.warn('Failed to initialize Moralis:', error);
    }
  }
};

const fetchTokensFromJupiter = async (): Promise<TokenData[]> => {
  try {
    const connection = getSolanaConnection();
    const jupiterTokenListUrl = 'https://token.jup.ag/strict';
    const response = await fetch(jupiterTokenListUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tokenList = await response.json();

    // Fetch additional details for each token
    const enrichedTokens = await Promise.all(tokenList.slice(0, 20).map(async (token: any) => {
      try {
        const mintPublicKey = new PublicKey(token.address);
        
        // Use getParsedProgramAccounts to get token accounts for this mint
        const tokenAccounts = await connection.getParsedProgramAccounts(
          new PublicKey("TokenkegQfeZyiNwmdzGKJ3Eu3tYhzeqa5WeR5oFFf"),
          {
            filters: [
              {
                dataSize: 165, // size of token account
              },
              {
                memcmp: {
                  offset: 0,
                  bytes: mintPublicKey.toBase58(),
                },
              },
            ],
          }
        );

        let totalHolders = 0;
        tokenAccounts.forEach(accountInfo => {
          // Check if the account data is parsed (not a Buffer)
          if ('parsed' in accountInfo.account.data) {
            const parsedInfo = accountInfo.account.data.parsed?.info;
            if (parsedInfo && parsedInfo.tokenAmount.uiAmount > 0) {
              totalHolders++;
            }
          }
        });

        return {
          address: token.address,
          name: token.name,
          symbol: token.symbol,
          image: token.logoURI || DEFAULT_TOKEN_IMAGE,
          price: Math.random() * 10, // Mock price
          change24h: (Math.random() - 0.5) * 200, // Mock 24h change
          volume24h: Math.random() * 1000000, // Mock 24h volume
          marketCap: Math.random() * 100000000, // Mock market cap
          holders: totalHolders,
          isNew: false,
          age: `${Math.floor(Math.random() * 24)}h`, // Mock age
          liquidity: Math.random() * 500000, // Mock liquidity
          transactions24h: Math.floor(Math.random() * 1000) // Mock transactions
        };
      } catch (accountError) {
        console.error(`Error fetching account info for token ${token.address}:`, accountError);
        return null;
      }
    }));

    // Filter out any tokens for which fetching account info failed
    return enrichedTokens.filter(token => token !== null) as TokenData[];

  } catch (error) {
    console.error('Error fetching tokens from Jupiter:', error);
    return [];
  }
};

const fetchTokensFromMoralis = async (apiKey: string): Promise<TokenData[]> => {
  try {
    await initializeMoralis(apiKey);
    
    if (!moralisInitialized) {
      throw new Error('Moralis not initialized');
    }

    // Since getTokens doesn't exist, let's create mock data for now
    // In a real implementation, you would use available Moralis endpoints
    const mockTokens = Array.from({ length: 20 }, (_, index) => ({
      address: `mock_token_${index}_${Math.random().toString(36).substr(2, 9)}`,
      name: `Mock Token ${index + 1}`,
      symbol: `MTK${index + 1}`,
      image: '/placeholder.svg',
      price: Math.random() * 10,
      change24h: (Math.random() - 0.5) * 200,
      volume24h: Math.random() * 1000000,
      marketCap: Math.random() * 100000000,
      holders: Math.floor(Math.random() * 10000),
      isNew: true,
      age: `${Math.floor(Math.random() * 24)}h`,
      liquidity: Math.random() * 500000,
      transactions24h: Math.floor(Math.random() * 1000)
    }));

    return mockTokens;
  } catch (error) {
    console.error('Error fetching tokens from Moralis:', error);
    throw error;
  }
};

export const fetchTokens = async (useMoralis: boolean, moralisApiKey: string): Promise<TokenData[]> => {
  if (useMoralis) {
    try {
      return await fetchTokensFromMoralis(moralisApiKey);
    } catch (moralisError) {
      console.error("Failed to fetch tokens from Moralis, falling back to Jupiter:", moralisError);
      return await fetchTokensFromJupiter();
    }
  } else {
    return await fetchTokensFromJupiter();
  }
};
