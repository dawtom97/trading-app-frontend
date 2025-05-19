"use client";
import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCryptosQuery } from "@/features/crypto/cryptoApi";


interface CurrencyForChart {
  symbol: string;
  name: string;
  quote: {
    USD: {
      price: number;
      percent_change_90d: number;
      market_cap: number;
    };
  };
}

export function PieChartWidget() {
  const { data } = useGetCryptosQuery(null);
  const currencies = data?.crypto.slice(0, 5);

  const currenciesData = currencies?.map((item: CurrencyForChart, index: number) => {
    const maxIndex = currencies.length - 1;
    const darknessFactor = (index / maxIndex) * 0.7 + 0.3; // zakres 0.3–1.0
    const colorValue = Math.floor(255 * (1 - darknessFactor)); // mniej = ciemniej

    return {
      name: item.symbol,
      marketCap: item.quote.USD.market_cap,
      fill: `rgb(${colorValue}, ${100 + index * 10}, ${255 - index * 10})`, // niebieskawy gradient
    };
  });


  const id = "pie-interactive";
  const [activeItem, setActiveItem] = React.useState("BTC");
  const activeIndex = React.useMemo(
    () => currenciesData?.findIndex((item: CurrencyForChart) => item.name === activeItem),
    [activeItem, currenciesData]
  );
  const names = currenciesData?.map((item: CurrencyForChart) => item.name);
  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={{}} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Pie Chart - Interactive</CardTitle>
          <CardDescription>Crypto currencies</CardDescription>
        </div>
        <Select value={activeItem} onValueChange={setActiveItem}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {names?.map((key: string) => {
              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {key}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={{}}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={currenciesData}
              dataKey="marketCap"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          
                          {currenciesData?.[activeIndex]?.name?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-[9px]"
                        >
                           {currenciesData?.[activeIndex]?.marketCap?.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
