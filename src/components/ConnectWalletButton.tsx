
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

export default function ConnectWalletButton() {
  const { wallet, connected, connecting, connectWallet, disconnectWallet } = useWallet();

  const formatWalletAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Button
      onClick={connected ? disconnectWallet : connectWallet}
      disabled={connecting}
      className="bg-gradient-to-r from-glow-green to-warm-yellow text-midnight hover:from-warm-yellow hover:to-glow-green flex items-center gap-2 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-glow-green/20"
    >
      <Wallet size={16} />
      {connecting ? "Connecting..." : connected ? formatWalletAddress(wallet) : "Connect Wallet"}
    </Button>
  );
}
