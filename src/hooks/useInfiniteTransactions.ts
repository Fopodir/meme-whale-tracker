import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@/context/WalletContext';
import { getWalletTransactions, Transaction } from '@/utils/transactionUtils';

export const useInfiniteTransactions = () => {
  const { wallet, connected } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = useCallback(async (reset = false) => {
    if (!wallet || !connected) return;

    if (reset) {
      setLoading(true);
      setTransactions([]);
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const before = reset ? undefined : transactions[transactions.length - 1]?.signature;
      const newTransactions = await getWalletTransactions(wallet, 10, before);
      
      if (newTransactions.length === 0) {
        setHasMore(false);
      } else {
        setTransactions(prev => reset ? newTransactions : [...prev, ...newTransactions]);
        if (newTransactions.length < 10) {
          setHasMore(false);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch transactions';
      setError(errorMessage);
      console.error('Transaction fetch error:', errorMessage);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [wallet, connected, transactions]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      loadTransactions(false);
    }
  }, [loadTransactions, loadingMore, hasMore]);

  const refresh = useCallback(() => {
    loadTransactions(true);
  }, [loadTransactions]);

  useEffect(() => {
    if (connected && wallet) {
      loadTransactions(true);
    } else {
      setTransactions([]);
      setError(null);
      setHasMore(true);
    }
  }, [wallet, connected]);

  return {
    transactions,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    refresh,
  };
};
