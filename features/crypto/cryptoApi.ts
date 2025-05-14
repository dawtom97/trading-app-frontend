import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set(
        "X-CMC_PRO_API_KEY",
        process.env.NEXT_PUBLIC_COIN_MARKET_API_KEY || ""
      );
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => "/cryptos/listings",
      transformResponse: (res) => {
        const obj = {
            crypto: res.data,
            timestamp: res.status.timestamp,
        }
        return obj
      }
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
