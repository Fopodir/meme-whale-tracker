import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/context/WalletContext";
import { useWalletData } from "@/hooks/useWalletData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, RefreshCw, Copy } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradingChart from "@/components/TradingChart";
import TradingInterface from "@/components/TradingInterface";
import TransactionsTable from "@/components/TransactionsTable";
import WalletConnectionModal from "@/components/WalletConnectionModal";

export default function Dashboard() {
  const { toast } = useToast();
  const { wallet, connected, connecting, connectionType } = useWallet();
  const { walletData, loading, error, refreshData } = useWalletData();
  const [tradingTokenAddress, setTradingTokenAddress] = useState('So11111111111111111111111111111111111111112');
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  // Show connection modal after a brief delay when not connected
  useEffect(() => {
    if (!connected) {
      const timer = setTimeout(() => {
        setShowConnectionModal(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [connected]);

  // Close modal when wallet connects
  useEffect(() => {
    if (connected) {
      setShowConnectionModal(false);
    }
  }, [connected]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className={`container flex-1 py-24 px-4 z-20 ${!connected ? 'blur-[4px] pointer-events-none' : ''} transition-all duration-300`}>
        <div className="flex flex-col md:flex-row justify-between mb-8 items-center gap-4">
          {connected && (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshData}
                disabled={loading}
                className="glass-card border-border/50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <div className="glass-card p-3 px-4 rounded-full border border-glow-green/20 flex items-center">
                <div className="w-2 h-2 rounded-full bg-glow-green animate-pulse mr-2" />
                <span className="text-xs md:text-sm font-mono">
                  {wallet?.slice(0, 4)}...{wallet?.slice(-4)}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  ({connectionType})
                </span>
              </div>
            </div>
          )}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-[500px] glass-card">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Main Trading Section - Always visible */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="glass-card border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">SOL Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-glow-green">
                        {connected && loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : connected ? (
                          `${walletData?.balance.toFixed(4) || '0.0000'} SOL`
                        ) : (
                          '0.0000 SOL'
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">
                        {connected && loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : connected ? (
                          walletData?.transactions.length || 0
                        ) : (
                          0
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Tokens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">
                        {connected && loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : connected ? (
                          walletData?.tokens.length || 0
                        ) : (
                          0
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-border/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">NFTs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">
                        {connected && loading ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : connected ? (
                          walletData?.nfts.length || 0
                        ) : (
                          0
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Price Chart - Always rendered */}
                <Card className="glass-card border-border/50">
                  <CardHeader>
                    <CardTitle>Price Chart</CardTitle>
                    <CardDescription>Real-time token price data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TradingChart tokenAddress={tradingTokenAddress} />
                  </CardContent>
                </Card>
              </div>
              
              {/* Trading Interface - Always rendered */}
              <div className="lg:col-span-1">
                <TradingInterface 
                  tokenAddress={tradingTokenAddress}
                  onTokenAddressChange={setTradingTokenAddress}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <TransactionsTable />
          </TabsContent>

          <TabsContent value="tokens" className="space-y-4">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Token Holdings</CardTitle>
                <CardDescription>Your SPL token balances</CardDescription>
              </CardHeader>
              <CardContent>
                {connected && loading ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : connected && walletData?.tokens.length ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Token</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Mint</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {walletData.tokens.map((token, index) => (
                        <TableRow key={token.mint || index}>
                          <TableCell>{token.name || 'Unknown'}</TableCell>
                          <TableCell>{token.symbol || 'N/A'}</TableCell>
                          <TableCell>{token.amount.toFixed(6)}</TableCell>
                          <TableCell 
                            className="font-mono text-xs cursor-pointer hover:text-glow-green transition-colors"
                            onClick={() => copyToClipboard(token.mint, 'Token mint address')}
                            title="Click to copy"
                          >
                            <div className="flex items-center gap-1">
                              {token.mint.slice(0, 8)}...
                              <Copy className="h-3 w-3 opacity-50" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {connected ? 'No tokens found' : 'Connect your wallet to view tokens'}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nfts" className="space-y-4">
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>NFT Collection</CardTitle>
                <CardDescription>Your NFT holdings</CardDescription>
              </CardHeader>
              <CardContent>
                {connected && loading ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : connected && walletData?.nfts.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {walletData.nfts.map((nft, index) => (
                      <Card key={nft.mint || index} className="glass-card border-border/50">
                        <CardContent className="p-4">
                          {nft.image && (
                            <img 
                              src={nft.image} 
                              alt={nft.name}
                              className="w-full h-40 object-cover rounded mb-2"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          )}
                          <h3 className="font-medium truncate">{nft.name}</h3>
                          <p className="text-xs text-muted-foreground font-mono">
                            {nft.mint.slice(0, 8)}...
                          </p>
                          {nft.collection && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Collection: {nft.collection.slice(0, 8)}...
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {connected ? 'No NFTs found' : 'Connect your wallet to view NFTs'}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Wallet Connection Modal */}
      <WalletConnectionModal 
        open={showConnectionModal && !connected} 
        onOpenChange={setShowConnectionModal}
      />
      
      <Footer />
    </div>
  );
}
