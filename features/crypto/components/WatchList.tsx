"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetCryptosQuery } from "../cryptoApi"

interface Crypto {
  symbol: string,
  name: string,
  quote: {
    USD: {
      price: number,
      volume_change_24h: number,
      percent_change_24h: number,
    }
  }
}

export function WatchList() {

  const {data, isLoading} = useGetCryptosQuery(null)

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
        {isLoading && "Loading..."}
        {data?.crypto.map((item: Crypto) => (
          <div
            key={item.symbol}
            className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 p-3"
          >
      
            <div>
              <div className="font-medium text-gray-900">{item?.symbol}</div>
              <div className="text-sm text-gray-500">{item?.name}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">${item?.quote.USD.price.toFixed(2)}</div>
              <div className={`text-sm ${item?.quote?.USD?.volume_change_24h > 0 ? "text-green-600" : "text-red-600"}`}>
                {item?.quote?.USD?.volume_change_24h > 0 ? "+" : "-"}
                {item?.quote?.USD?.percent_change_24h.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}