"use client";
import { Bar, BarChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetCryptosQuery } from "@/features/crypto/cryptoApi";

interface CurrencyForChart {
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_90d: number;
    };
  };
}

const chartConfig = {
  price: {
    label: "Price",
    color: "aqua",
  },
  oldPrice: {
    label: "Old Price",
    color: "blue",
  },
} satisfies ChartConfig;
export function TradingChart() {
  const { data } = useGetCryptosQuery(null);

  const sortedByPrice = data?.crypto
    ?.slice()
    .sort((a: CurrencyForChart, b: CurrencyForChart) => {
      return b.quote.USD.price - a.quote.USD.price;
    })
    .slice(1, 6);

  const currencies = sortedByPrice?.map((item: CurrencyForChart) => ({
    symbol: item.symbol,
    oldPrice: item.quote.USD.price.toFixed(2),
    price: (
      item.quote.USD.price *
      (1 + item.quote.USD.percent_change_90d / 100)
    ).toFixed(2),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip - Default</CardTitle>
        <CardDescription>
          Default tooltip with ChartTooltipContent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={currencies}>
            <XAxis
              dataKey="symbol"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar
              dataKey="oldPrice"
              stackId="a"
              fill="aqua"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="price"
              stackId="a"
              fill="greenyellow"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
