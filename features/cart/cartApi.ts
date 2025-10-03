import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

interface CartResponse {
  message: string;
  data?: [];
}

interface CartErrorResponse extends Response {
  data: {
    message: string;
  };
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    addItem: builder.mutation<
      CartResponse,
      { product_id: string | number; quantity: number; price: number }
    >({
      query: (data) => ({
        url: "/cart/add",
        method: "POST",
        body: data,
      }),
      transformResponse: (res: CartResponse) => {
        toast.success(res.message);
        return res;
      },
      transformErrorResponse: (res: CartErrorResponse) => {
        toast.error(res.data.message);
        return res;
      },
    }),

    removeItem: builder.mutation<CartResponse, { product_id: string }>({
      query: (data) => ({
        url: "/cart/remove",
        method: "POST",
        body: data,
      }),
      transformResponse: (res: CartResponse) => {
        toast.success(res.message);
        return res;
      },
      transformErrorResponse: (res: CartErrorResponse) => {
        toast.error(res.data.message);
        return res;
      },
    }),

    getCartTotal: builder.query<CartResponse, void>({
      query: () => "/cart/total",
      transformResponse: (res: CartResponse) => res,
      transformErrorResponse: (res: CartErrorResponse) => {
        toast.error(res.data.message);
        return res;
      },
    }),
    getCart: builder.query<CartResponse, void>({
      query: () => "/cart/single",
      transformResponse: (res: CartResponse) => res,
      transformErrorResponse: (res: CartErrorResponse) => {
        toast.error(res.data.message);
        return res;
      },
    }),

    getItemTotal: builder.query<CartResponse, string>({
      query: (productId) => `/cart/item-total/${productId}`,
      transformResponse: (res: CartResponse) => res,
      transformErrorResponse: (res: CartErrorResponse) => {
        toast.error(res.data.message);
        return res;
      },
    }),
  }),
});

export const {
  useAddItemMutation,
  useRemoveItemMutation,
  useGetCartTotalQuery,
  useGetItemTotalQuery,
  useGetCartQuery
} = cartApi;
