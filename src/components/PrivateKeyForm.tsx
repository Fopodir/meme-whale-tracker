
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/context/WalletContext";
import { Eye, EyeOff, Key } from "lucide-react";

export default function PrivateKeyForm() {
  const [privateKey, setPrivateKey] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const { connectWithPrivateKey, connecting } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (privateKey.trim()) {
      await connectWithPrivateKey(privateKey.trim());
      setPrivateKey(""); // Clear the input for security
    }
  };

  return (
    <Card className="glass-card border-border/50 w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5 text-glow-green" />
          Connect with Private Key
        </CardTitle>
        <CardDescription>
          Enter your base58 encoded private key to connect
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="privateKey">Private Key</Label>
            <div className="relative">
              <Input
                id="privateKey"
                type={showPrivateKey ? "text" : "password"}
                placeholder="Enter your private key..."
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="pr-10"
                disabled={connecting}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
              >
                {showPrivateKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-glow-green to-warm-yellow hover:from-warm-yellow hover:to-glow-green text-midnight transition-all duration-300"
            disabled={connecting || !privateKey.trim()}
          >
            {connecting ? "Connecting..." : "Connect"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
