import { ArrowDown, ArrowUp } from "lucide-react"

export function MarketOverview() {
  const markets = [
    { name: "Bitcoin", symbol: "BTC", price: "$43,567.89", change: "+2.34%", status: "up" },
    { name: "Ethereum", symbol: "ETH", price: "$3,245.67", change: "+1.56%", status: "up" },
    { name: "Cardano", symbol: "ADA", price: "$1.23", change: "-0.78%", status: "down" },
    { name: "Solana", symbol: "SOL", price: "$145.67", change: "+4.32%", status: "up" },
    { name: "Ripple", symbol: "XRP", price: "$0.89", change: "-1.23%", status: "down" },
  ]

  return (
    <div className="h-full">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Market Overview</h2>
      <div className="overflow-x-auto h-[calc(100%-2rem)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-2 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="pb-2 text-right text-sm font-medium text-gray-500">Price</th>
              <th className="pb-2 text-right text-sm font-medium text-gray-500">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((market) => (
              <tr key={market.symbol} className="border-b border-gray-100">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                      {market.symbol.substring(0, 1)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{market.name}</div>
                      <div className="text-sm text-gray-500">{market.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right font-medium text-gray-900">{market.price}</td>
                <td className="py-3 text-right">
                  <div
                    className={`flex items-center justify-end gap-1 ${
                      market.status === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {market.status === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    <span>{market.change}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}