import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

interface StripeResponse extends Response {
  message: string;
  data?: Record<string, unknown>;
}
interface StripeErrorResponse extends Response {
  data: {
    message: string;
  };
}

export const stripeApi = createApi({
  reducerPath: "stripeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    payment: builder.mutation({
      query: (data) => {
        return {
          url: "/stripe/create-checkout-session",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (res: StripeResponse) => {
        toast.success(res.message);
        return res;
      },
      transformErrorResponse: (res: StripeErrorResponse) => {
        console.log("ERR!", res);
        toast.error(res.data.message);
        return res;
      },
    }),

  }),
});

export const { usePaymentMutation } = stripeApi;