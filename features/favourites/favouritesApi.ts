import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

interface FavResponse extends Response {
  message: string;
  data?: Record<string, unknown>;
}
interface FavErrorResponse extends Response {
  data: {
    message: string;
  };
}

export const favouritesApi = createApi({
  reducerPath: "favouritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    addFavourite: builder.mutation({
      query: (data) => {
        return {
          url: "/favourites/add",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (res: FavResponse) => {
        toast.success(res.message);
        return res;
      },
      transformErrorResponse: (res: FavErrorResponse) => {
        console.log("ERR!", res);
        toast.error(res.data.message);
        return res;
      },
    }),

    allFavs: builder.query({
      query: () => "/favourites/all-favs",
      transformResponse: (res: FavResponse) => {
        return res.data;
      },
      transformErrorResponse: (res: FavErrorResponse) => {
        toast.error(res.data.message);
        return res;
      },
    }),
  }),
});

export const { useAddFavouriteMutation, useAllFavsQuery } = favouritesApi;
