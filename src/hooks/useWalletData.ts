import { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { getWalletData, WalletData } from '@/utils/walletDataUtils';

export const useWalletData = () => {
  const { wallet, connected } = useWallet();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletData = async () => {
    if (!wallet || !connected) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getWalletData(wallet);
      setWalletData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch wallet data';
      setError(errorMessage);
      console.error('Wallet data fetch error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected && wallet) {
      fetchWalletData();
    } else {
      setWalletData(null);
      setError(null);
    }
  }, [wallet, connected]);

  const refreshData = () => {
    fetchWalletData();
  };

  return {
    walletData,
    loading,
    error,
    refreshData,
  };
};
