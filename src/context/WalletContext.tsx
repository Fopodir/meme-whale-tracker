
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { PublicKey, VersionedTransaction, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

// Define the wallet connection type
type PhantomEvent = "disconnect" | "connect" | "accountChanged";

// Define the wallet window interface
interface PhantomProvider {
  connect: ({ onlyIfTrusted }: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signTransaction: (transaction: VersionedTransaction) => Promise<VersionedTransaction>;
  on: (event: PhantomEvent, callback: () => void) => void;
  off: (event: PhantomEvent, callback: () => void) => void;
  isPhantom: boolean;
  publicKey: { toString: () => string } | null;
  isConnected: boolean | null;
}

// Extend the global Window interface
declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

// Wallet context types
type WalletContextType = {
  wallet: string | null;
  connected: boolean;
  connecting: boolean;
  connectionType: 'phantom' | 'privateKey' | null;
  connectWallet: () => Promise<void>;
  connectWithPrivateKey: (privateKey: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connectionType, setConnectionType] = useState<'phantom' | 'privateKey' | null>(null);

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      // Check for stored private key connection
      const storedPrivateKey = sessionStorage.getItem("privateKeyConnected");
      const storedWallet = sessionStorage.getItem("walletAddress");
      
      if (storedPrivateKey && storedWallet) {
        setWallet(storedWallet);
        setConnected(true);
        setConnectionType('privateKey');
        console.log("Private key wallet already connected:", storedWallet);
        return;
      }

      // Check for Phantom connection
      const solana = window.solana;
      if (solana?.isPhantom && solana?.publicKey) {
        try {
          setConnecting(true);
          const publicKey = solana.publicKey.toString();
          setWallet(publicKey);
          setConnected(true);
          setConnectionType('phantom');
          console.log("Phantom wallet already connected:", publicKey);
        } catch (error) {
          console.error("Failed to reconnect wallet:", error);
        } finally {
          setConnecting(false);
        }
      }
    };

    checkWalletConnection();

    // Add listener for wallet connection changes
    const handleAccountChanged = () => {
      window.location.reload();
    };

    const solana = window.solana;
    if (solana?.isPhantom) {
      solana.on("accountChanged", handleAccountChanged);
    }

    return () => {
      // Cleanup listeners
      if (solana?.isPhantom) {
        solana.off("accountChanged", handleAccountChanged);
      }
    };
  }, []);

  const connectWallet = async () => {
    try {
      setConnecting(true);
      const solana = window.solana;
      
      if (!solana) {
        toast.error("Phantom wallet not found! Please install the Phantom browser extension.");
        window.open("https://phantom.app/", "_blank");
        return;
      }

      if (!solana.isPhantom) {
        toast.error("Please install Phantom wallet!");
        return;
      }

      const { publicKey } = await solana.connect({ onlyIfTrusted: false });
      const walletAddress = publicKey.toString();
      setWallet(walletAddress);
      setConnected(true);
      setConnectionType('phantom');
      toast.success("Phantom wallet connected successfully!");
      
      // Store in session storage to persist through page reloads
      sessionStorage.setItem("walletConnected", "true");
      
    } catch (error: any) {
      console.error("Error connecting wallet:", error?.message);
      toast.error("Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  };

  const connectWithPrivateKey = async (privateKey: string) => {
    try {
      setConnecting(true);
      
      // Validate and decode the private key
      let keypair: Keypair;
      try {
        const privateKeyBytes = bs58.decode(privateKey);
        keypair = Keypair.fromSecretKey(privateKeyBytes);
      } catch (error) {
        throw new Error("Invalid private key format. Please use base58 encoded private key.");
      }

      const walletAddress = keypair.publicKey.toString();
      setWallet(walletAddress);
      setConnected(true);
      setConnectionType('privateKey');
      toast.success("Private key wallet connected successfully!");
      
      // Store connection state (not the private key itself for security)
      sessionStorage.setItem("privateKeyConnected", "true");
      sessionStorage.setItem("walletAddress", walletAddress);
      
    } catch (error: any) {
      console.error("Error connecting with private key:", error?.message);
      toast.error(error?.message || "Failed to connect with private key");
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (connectionType === 'phantom') {
        const solana = window.solana;
        if (solana && solana.isConnected) {
          await solana.disconnect();
        }
        sessionStorage.removeItem("walletConnected");
      } else if (connectionType === 'privateKey') {
        sessionStorage.removeItem("privateKeyConnected");
        sessionStorage.removeItem("walletAddress");
      }
      
      setWallet(null);
      setConnected(false);
      setConnectionType(null);
      
      toast.info("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast.error("Failed to disconnect wallet");
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connected,
        connecting,
        connectionType,
        connectWallet,
        connectWithPrivateKey,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
