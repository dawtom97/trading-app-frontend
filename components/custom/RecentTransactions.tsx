import { ArrowDown, ArrowUp } from "lucide-react"

export function RecentTransactions() {
  const transactions = [
    { type: "buy", asset: "BTC", amount: "0.05", value: "$2,178.39", time: "2 hours ago" },
    { type: "sell", asset: "ETH", amount: "1.2", value: "$3,894.80", time: "5 hours ago" },
    { type: "buy", asset: "SOL", amount: "10", value: "$1,456.70", time: "1 day ago" },
    { type: "sell", asset: "ADA", amount: "500", value: "$615.00", time: "2 days ago" },
    { type: "buy", asset: "XRP", amount: "1000", value: "$890.00", time: "3 days ago" },
  ]

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Recent Transactions</h2>
      <div className="space-y-3 overflow-y-auto max-h-[400px]">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-start gap-3 rounded-md border border-gray-100 bg-gray-50 p-3">
            <div className={`mt-0.5 rounded-full p-1.5 ${transaction.type === "buy" ? "bg-green-100" : "bg-red-100"}`}>
              {transaction.type === "buy" ? (
                <ArrowDown className={`h-3 w-3 text-green-600`} />
              ) : (
                <ArrowUp className={`h-3 w-3 text-red-600`} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-900">
                  {transaction.type === "buy" ? "Bought" : "Sold"} {transaction.asset}
                </div>
                <div className="text-sm text-gray-500">{transaction.time}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500">
                  {transaction.amount} {transaction.asset}
                </div>
                <div className="font-medium text-gray-900">{transaction.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}