
import React, { useEffect, useRef, useState } from 'react';
import { getTokenMetadata } from '@/utils/tokenUtils';

interface TradingChartProps {
  tokenAddress: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ tokenAddress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);
  const [symbol, setSymbol] = useState<string>('SOLUSDT');

  // Function to get symbol from token address
  const getSymbolFromAddress = async (address: string): Promise<string> => {
    try {
      // Handle SOL specifically
      if (address === 'So11111111111111111111111111111111111111112') {
        return 'SOLUSDT';
      }

      // Try to get metadata from Moralis
      const metadata = await getTokenMetadata(address);
      if (metadata?.symbol) {
        return `${metadata.symbol}USDT`;
      }

      // Fallback to address truncation
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    } catch (error) {
      console.error('Error getting symbol:', error);
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
  };

  useEffect(() => {
    const updateSymbol = async () => {
      const newSymbol = await getSymbolFromAddress(tokenAddress);
      setSymbol(newSymbol);
    };

    updateSymbol();
  }, [tokenAddress]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up existing widget
    if (widgetRef.current) {
      widgetRef.current.remove();
    }

    // Create new widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: false,
      calendar: false,
      support_host: "https://www.tradingview.com"
    });

    containerRef.current.appendChild(script);
    widgetRef.current = script;

    return () => {
      if (widgetRef.current && widgetRef.current.parentNode) {
        widgetRef.current.parentNode.removeChild(widgetRef.current);
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container h-96">
      <div ref={containerRef} className="tradingview-widget-container__widget h-full"></div>
      <div className="tradingview-widget-copyright">
        <span className="blue-text text-xs opacity-50">
          Track all markets on{" "}
          <a
            href="https://www.tradingview.com/"
            rel="noopener nofollow"
            target="_blank"
            className="text-blue-400"
          >
            TradingView
          </a>
        </span>
      </div>
    </div>
  );
};

export default TradingChart;
