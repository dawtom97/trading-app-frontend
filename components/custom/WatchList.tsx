import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WatchList() {
  const watchlist = [
    { name: "Bitcoin", symbol: "BTC", price: "$43,567.89", change: "+2.34%" },
    { name: "Ethereum", symbol: "ETH", price: "$3,245.67", change: "+1.56%" },
    { name: "Cardano", symbol: "ADA", price: "$1.23", change: "-0.78%" },
    { name: "Solana", symbol: "SOL", price: "$145.67", change: "+4.32%" },
    { name: "Ripple", symbol: "XRP", price: "$0.89", change: "-1.23%" },
  ]

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Watchlist</h2>
        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
          <Star className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
      <div className="space-y-3 h-[calc(100%-3rem)] overflow-y-auto">
        {watchlist.map((item) => (
          <div
            key={item.symbol}
            className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 p-3"
          >
            <div>
              <div className="font-medium text-gray-900">{item.symbol}</div>
              <div className="text-sm text-gray-500">{item.name}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{item.price}</div>
              <div className={`text-sm ${item.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}