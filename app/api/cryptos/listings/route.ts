// app/api/cryptos/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
      headers: {
        "X-CMC_PRO_API_KEY": "ffbd9894-4d85-48ac-bc24-732218f7071c",
      },
      next: { revalidate: 60 }, // możesz ustawić cache, jeśli chcesz
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch from CoinMarketCap" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
