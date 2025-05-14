"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TradingChartCard from "./TradingChartCard";

export function TradingChart() {
  const [interval, setInterval] = useState("1D");

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">BTC/USD</h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">$43,567.89</span>
            <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              +2.34%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="chart" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="depth">Depth</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="h-[300px] w-full rounded-md bg-white">
        {/* Chart would be rendered here with a library like recharts, chart.js, or a trading-specific library */}
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mb-2 text-sm text-gray-500">
              Trading chart would render here
            </div>
            <div className="h-[200px] w-full bg-gray-100 rounded-md flex items-center justify-center">
              <TradingChartCard />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {["1H", "1D", "1W", "1M", "1Y"].map((period) => (
          <Button
            key={period}
            variant={interval === period ? "default" : "outline"}
            size="sm"
            onClick={() => setInterval(period)}
            className={
              interval === period ? "bg-green-600 hover:bg-green-700" : ""
            }
          >
            {period}
          </Button>
        ))}
      </div>
    </div>
  );
}
