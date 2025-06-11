
export const CodeSample = () => {
  return (
    <div className="bg-card border border-muted rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Code Sample</h3>
      <div className="bg-muted rounded-md p-4 overflow-auto">
        <pre className="text-xs text-gray-300">
          <code>
{`// Solana Sniper Bot Pseudocode
async function snipeToken(tokenAddress, amount, slippageTolerance) {
  const connection = new Connection(SOLANA_RPC_URL);
  const wallet = connectWallet();
  
  // Create transaction
  const transaction = new Transaction();
  
  // Add token swap instruction
  transaction.add(
    createSwapInstruction({
      tokenIn: USDC_TOKEN_ADDRESS,
      tokenOut: tokenAddress,
      amountIn: amount,
      minimumAmountOut: calculateMinAmountOut(amount, slippageTolerance),
    })
  );
  
  // Optimize transaction priority
  transaction.recentBlockhash = await connection.getLatestBlockhash();
  transaction.feePayer = wallet.publicKey;
  
  // Sign and execute
  const signed = await wallet.signTransaction(transaction);
  const txId = await connection.sendRawTransaction(signed.serialize());
  
  return txId;`
}
          </code>
        </pre>
      </div>
    </div>
  );
};
