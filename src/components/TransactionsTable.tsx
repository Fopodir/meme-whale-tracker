import React, { useRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInfiniteTransactions } from "@/hooks/useInfiniteTransactions";
import { Transaction } from "@/utils/transactionUtils";

const TransactionsTable = () => {
  const { toast } = useToast();
  const { transactions, loading, loadingMore, hasMore, error, loadMore, refresh } = useInfiniteTransactions();
  const observerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore]);

  const formatTransaction = (tx: Transaction) => {
    const fee = tx.meta?.fee || 0;
    const preBalance = tx.meta?.preBalances?.[0] || 0;
    const postBalance = tx.meta?.postBalances?.[0] || 0;
    const change = (postBalance - preBalance) / 1e9;
    
    return {
      signature: tx.signature,
      date: new Date(tx.blockTime * 1000).toLocaleDateString(),
      change: change,
      fee: fee / 1e9,
      type: change > 0 ? 'Received' : 'Sent'
    };
  };

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

  const openSolscan = (signature: string) => {
    window.open(`https://solscan.io/tx/${signature}`, '_blank');
  };

  // Show error only if there's an actual error AND we're not just dealing with empty transactions
  if (error && transactions.length === 0 && !loading) {
    return (
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>Transaction Error</CardTitle>
          <CardDescription>Failed to load transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={refresh}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-border/50">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest transactions from your wallet</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : transactions.length ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Signature</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => {
                  const formatted = formatTransaction(tx);
                  return (
                    <TableRow key={tx.signature}>
                      <TableCell 
                        className="font-mono text-xs cursor-pointer hover:text-glow-green transition-colors"
                        onClick={() => copyToClipboard(formatted.signature, 'Transaction signature')}
                        title="Click to copy"
                      >
                        <div className="flex items-center gap-1">
                          {formatted.signature.slice(0, 8)}...
                          <Copy className="h-3 w-3 opacity-50" />
                        </div>
                      </TableCell>
                      <TableCell>{formatted.type}</TableCell>
                      <TableCell className={formatted.change > 0 ? "text-green-400" : "text-red-400"}>
                        {formatted.change > 0 ? '+' : ''}{formatted.change.toFixed(6)} SOL
                      </TableCell>
                      <TableCell>{formatted.fee.toFixed(6)} SOL</TableCell>
                      <TableCell>{formatted.date}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openSolscan(formatted.signature)}
                          className="h-7 w-7 p-0 border-glow-green/30 hover:border-glow-green hover:bg-glow-green/10"
                          title="View on Solscan"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {/* Loading indicator for more transactions */}
            {loadingMore && (
              <div className="flex justify-center p-4">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">Loading more transactions...</span>
              </div>
            )}
            
            {/* End of list indicator */}
            {!hasMore && (
              <div className="text-center p-4 text-sm text-muted-foreground">
                All transactions loaded
              </div>
            )}
            
            {/* Intersection observer target */}
            <div ref={observerRef} className="h-1" />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ExternalLink className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No transactions found</h3>
            <p className="text-muted-foreground text-sm">
              This wallet doesn't have any transactions yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
