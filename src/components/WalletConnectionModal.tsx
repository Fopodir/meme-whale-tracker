
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import PrivateKeyForm from "@/components/PrivateKeyForm";

interface WalletConnectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WalletConnectionModal({ open, onOpenChange }: WalletConnectionModalProps) {
  const { connectWallet, connecting } = useWallet();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Choose how you'd like to connect to access your real wallet data and start trading
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Phantom Wallet</h3>
            <Button 
              onClick={connectWallet}
              disabled={connecting}
              className="bg-gradient-to-r from-glow-green to-warm-yellow hover:from-warm-yellow hover:to-glow-green text-midnight text-lg font-medium px-8 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {connecting ? 'Connecting...' : 'Connect Phantom'}
            </Button>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Private Key</h3>
            <PrivateKeyForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
