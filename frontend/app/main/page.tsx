export default function Dashboard() {
  return (
    <main className="px-8 py-12">
      <h1 className="text-2xl font-light text-[#1a1a1a] mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/60 backdrop-blur-sm border border-[rgba(0,0,0,0.06)] rounded-lg p-6">
          <p className="text-[11px] text-[#999] font-mono uppercase tracking-wider mb-2">
            Total Supplied
          </p>
          <p className="text-3xl font-light text-[#1a1a1a]">$0.00</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm border border-[rgba(0,0,0,0.06)] rounded-lg p-6">
          <p className="text-[11px] text-[#999] font-mono uppercase tracking-wider mb-2">
            Total Borrowed
          </p>
          <p className="text-3xl font-light text-[#1a1a1a]">$0.00</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm border border-[rgba(0,0,0,0.06)] rounded-lg p-6">
          <p className="text-[11px] text-[#999] font-mono uppercase tracking-wider mb-2">
            Net APY
          </p>
          <p className="text-3xl font-light text-[#4a6fa5]">—</p>
        </div>
      </div>

      <h2 className="text-lg font-light text-[#1a1a1a] mb-4">Markets</h2>
      <div className="bg-white/60 backdrop-blur-sm border border-[rgba(0,0,0,0.06)] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(0,0,0,0.06)]">
              <th className="text-left text-[11px] text-[#999] font-mono uppercase tracking-wider px-6 py-3">Asset</th>
              <th className="text-right text-[11px] text-[#999] font-mono uppercase tracking-wider px-6 py-3">Chain</th>
              <th className="text-right text-[11px] text-[#999] font-mono uppercase tracking-wider px-6 py-3">Supply APY</th>
              <th className="text-right text-[11px] text-[#999] font-mono uppercase tracking-wider px-6 py-3">Borrow APY</th>
              <th className="text-right text-[11px] text-[#999] font-mono uppercase tracking-wider px-6 py-3">Liquidity</th>
            </tr>
          </thead>
          <tbody>
            {[
              { asset: "ETH", chain: "Ethereum", supplyApy: "3.2%", borrowApy: "4.8%", liquidity: "$12.4M" },
              { asset: "USDC", chain: "Arbitrum", supplyApy: "5.1%", borrowApy: "6.3%", liquidity: "$8.7M" },
              { asset: "SUI", chain: "SuiMVM", supplyApy: "4.5%", borrowApy: "5.9%", liquidity: "$3.2M" },
              { asset: "WBTC", chain: "HyperEVM", supplyApy: "1.8%", borrowApy: "3.1%", liquidity: "$6.1M" },
            ].map((row) => (
              <tr key={row.asset} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[rgba(74,111,165,0.03)]">
                <td className="px-6 py-4 text-sm font-medium text-[#1a1a1a]">{row.asset}</td>
                <td className="px-6 py-4 text-sm text-[#999] text-right font-mono">{row.chain}</td>
                <td className="px-6 py-4 text-sm text-[#4a6fa5] text-right font-mono">{row.supplyApy}</td>
                <td className="px-6 py-4 text-sm text-[#999] text-right font-mono">{row.borrowApy}</td>
                <td className="px-6 py-4 text-sm text-[#1a1a1a] text-right font-mono">{row.liquidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
