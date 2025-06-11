
import { VersionedTransaction, Keypair } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { getSolanaConnection } from './connectionUtils';
import { get_spl_token_balance } from './tokenUtils';

export const executeJupiterSwap = async (
  type: 'buy' | 'sell',
  params: {
    connected: boolean;
    wallet: string | null;
    connectionType: 'phantom' | 'privateKey' | null;
    tokenAddress: string;
    amount: string;
    slippage: string;
    priorityFee: string;
    tipType: string;
    tipAmount: string;
    setLoading: (loading: boolean) => void;
    toast: (props: { title: string; description: string; variant?: string }) => void;
  }
) => {
  const { connected, wallet, connectionType, tokenAddress, amount, slippage, priorityFee, tipType, tipAmount, setLoading, toast } = params;

  if (!connected || !wallet) {
    toast({
      title: "Error",
      description: "Please connect your wallet first",
      variant: "destructive",
    });
    return;
  }

  if (!tokenAddress || !amount) {
    toast({
      title: "Error", 
      description: "Please enter token address and amount",
      variant: "destructive",
    });
    return;
  }

  setLoading(true);
  
  try {
    const connection = getSolanaConnection();

    // Get quote from Jupiter
    const inputMint = type === 'buy' ? 'So11111111111111111111111111111111111111112' : tokenAddress;
    const outputMint = type === 'buy' ? tokenAddress : 'So11111111111111111111111111111111111111112';
    let amountInSmallestUnit: number;
    if (type === 'buy') {
      amountInSmallestUnit = Math.floor(parseFloat(amount) * 1e9);
    } else {
      // For sell, amount is percentage, so we need to get token balance first
      const tokenBalance = await get_spl_token_balance(tokenAddress, wallet);
      const percentage = parseFloat(amount) / 100;
      amountInSmallestUnit = Math.floor(tokenBalance * percentage);
    }

    const quoteResponse = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInSmallestUnit}&slippageBps=${Math.floor(parseFloat(slippage) * 100)}`
    );

    if (!quoteResponse.ok) {
      throw new Error('Failed to get quote from Jupiter');
    }

    const quoteData = await quoteResponse.json();

    // Get swap transaction
    const swapResponse = await fetch('https://quote-api.jup.ag/v6/swap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quoteResponse: quoteData,
        userPublicKey: wallet,
        wrapAndUnwrapSol: true,
        prioritizationFeeLamports: Math.floor(parseFloat(priorityFee) * 1e9),
      }),
    });

    if (!swapResponse.ok) {
      throw new Error('Failed to get swap transaction');
    }

    const { swapTransaction } = await swapResponse.json();
    
    // Sign and send the transaction based on connection type
    const transaction = VersionedTransaction.deserialize(Buffer.from(swapTransaction, "base64"));
    
    let signedTx: VersionedTransaction;
    
    if (connectionType === 'phantom') {
      if (!window.solana?.signTransaction) {
        throw new Error('Phantom wallet not connected');
      }
      signedTx = await window.solana.signTransaction(transaction);
    } else if (connectionType === 'privateKey') {
      // For private key connections, we need to get the keypair from session storage
      const storedPrivateKey = sessionStorage.getItem("privateKeyConnected");
      if (!storedPrivateKey) {
        throw new Error('Private key not found');
      }
      
      // Note: In a real implementation, you'd want to securely store and retrieve the actual private key
      // For now, we'll show an error since we don't store the actual private key for security
      throw new Error('Private key signing not fully implemented for security reasons');
    } else {
      throw new Error('Unknown connection type');
    }
    
    const signature = await connection.sendRawTransaction(signedTx.serialize(), {
      skipPreflight: true,
    });
    
    toast({
      title: "Transaction Sent",
      description: `${type === 'buy' ? 'Buy' : 'Sell'} transaction sent. Transaction ID: ${signature}`,
    });

    console.log('Transaction ID:', signature);
    
  } catch (error) {
    console.error('Jupiter swap error:', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to execute swap",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};
