
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/context/WalletContext';
import { Loader2, TrendingUp, TrendingDown, Zap } from 'lucide-react';

import { executeJupiterSwap } from '@/utils/jupiterUtils';

interface TradingInterfaceProps {
  tokenAddress: string;
  onTokenAddressChange: (address: string) => void;
}

const TradingInterface: React.FC<TradingInterfaceProps> = ({ 
  tokenAddress, 
  onTokenAddressChange 
}) => {
  const { toast } = useToast();
  const { wallet, connected, connectionType } = useWallet();
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [speedOption, setSpeedOption] = useState<'priority' | 'jito' | 'private'>('priority');
  const [feeAmount, setFeeAmount] = useState('0.001');
  const [loading, setLoading] = useState(false);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const buyAmounts = ['0.1', '0.2', '0.5', '1'];
  const sellPercentages = ['10', '25', '50', '70', '100'];

  const handleQuickAmount = (value: string) => {
    setAmount(value);
  };

  const handleSwap = () => {
    executeJupiterSwap(tradeType, {
      connected,
      wallet,
      connectionType,
      tokenAddress,
      amount,
      slippage,
      priorityFee: speedOption === 'priority' ? feeAmount : '0.001',
      tipType: speedOption === 'priority' ? 'priority' : speedOption,
      tipAmount: speedOption !== 'priority' ? feeAmount : '0.0001',
      setLoading,
      toast: (props: { title: string; description: string; variant?: "default" | "destructive" }) => toast(props)
    });
  };

  return (
    <div className="space-y-4">
      <Card className="glass-card border-border/50 h-[556px] flex flex-col">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-base">Token Trading</CardTitle>
          <CardDescription className="text-xs">Buy and sell tokens using Jupiter aggregator</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-2 px-4 pb-4">
          <div className="space-y-1">
            <Label htmlFor="tokenAddress" className="text-xs">Token Address</Label>
            <Input
              id="tokenAddress"
              placeholder="Enter token mint address..."
              value={tokenAddress}
              onChange={(e) => onTokenAddressChange(e.target.value)}
              className="font-mono text-xs h-8"
            />
          </div>

          {/* Buy/Sell Toggle */}
          <div className="space-y-1">
            <Label className="text-xs">Trade Type</Label>
            <ToggleGroup 
              type="single" 
              value={tradeType} 
              onValueChange={(value) => value && setTradeType(value as 'buy' | 'sell')}
              className="justify-start"
            >
              <ToggleGroupItem value="buy" className="data-[state=on]:bg-green-100 data-[state=on]:text-green-800 text-xs px-2 py-1 h-7">
                <TrendingUp className="h-3 w-3 mr-1" />
                Buy
              </ToggleGroupItem>
              <ToggleGroupItem value="sell" className="data-[state=on]:bg-red-100 data-[state=on]:text-red-800 text-xs px-2 py-1 h-7">
                <TrendingDown className="h-3 w-3 mr-1" />
                Sell
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Amount Input with Quick Buttons */}
          <div className="space-y-1">
            <Label htmlFor="amount" className="text-xs">
              {tradeType === 'buy' ? 'Amount (SOL)' : 'Percentage'}
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder={tradeType === 'buy' ? '0.1' : '50'}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step={tradeType === 'buy' ? '0.001' : '1'}
              min="0"
              className="text-xs h-8"
            />
            
            {/* Quick Amount/Percentage Buttons */}
            <div className="grid grid-cols-4 gap-1">
              {tradeType === 'buy' ? (
                buyAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAmount(amt)}
                    className="text-xs py-1 h-6"
                  >
                    {amt} SOL
                  </Button>
                ))
              ) : (
                sellPercentages.map((pct) => (
                  <Button
                    key={pct}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAmount(pct)}
                    className="text-xs py-1 h-6"
                  >
                    {pct}%
                  </Button>
                ))
              )}
            </div>
          </div>

          {/* Trading Settings */}
          <div className="space-y-2 border-t pt-2">
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-yellow-500" />
              <Label className="text-xs font-medium">Trading Settings</Label>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="slippage" className="text-xs">Slippage (%)</Label>
              <Input
                id="slippage"
                type="number"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                step="0.1"
                min="0"
                max="100"
                className="text-xs h-8"
              />
            </div>

            {/* Speed & Fee Options */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Transaction Speed</Label>
              <RadioGroup value={speedOption} onValueChange={(value) => setSpeedOption(value as 'priority' | 'jito' | 'private')} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="priority" id="priority" className="h-3 w-3" />
                  <Label htmlFor="priority" className="text-xs">Priority Fee (Standard Speed)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="jito" id="jito" className="h-3 w-3" />
                  <Label htmlFor="jito" className="text-xs">Jito Tip (MEV Protection)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" className="h-3 w-3" />
                  <Label htmlFor="private" className="text-xs">Private Tip (Ultra Speed)</Label>
                </div>
              </RadioGroup>
              
              <div className="space-y-1">
                <Label htmlFor="feeAmount" className="text-xs">
                  {speedOption === 'priority' ? 'Priority Fee (SOL)' : 
                   speedOption === 'jito' ? 'Jito Tip (SOL)' : 'Private Tip (SOL)'}
                </Label>
                <Input
                  id="feeAmount"
                  type="number"
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(e.target.value)}
                  step="0.0001"
                  min="0"
                  placeholder={speedOption === 'priority' ? '0.001' : '0.0001'}
                  className="text-xs h-8"
                />
                <p className="text-xs text-muted-foreground leading-tight">
                  {speedOption === 'priority' 
                    ? 'Standard transaction fee for faster processing' 
                    : speedOption === 'jito' 
                    ? 'Higher tips increase priority and MEV protection' 
                    : 'Private mempool for ultra-fast execution'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <Button
              onClick={handleSwap}
              disabled={loading || !connected || !tokenAddress || !amount}
              className={`w-full h-9 ${
                tradeType === 'buy' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
              } text-white`}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : tradeType === 'buy' ? (
                <TrendingUp className="h-4 w-4 mr-2" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-2" />
              )}
              {tradeType === 'buy' ? 'Buy Token' : 'Sell Token'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TradingInterface;
