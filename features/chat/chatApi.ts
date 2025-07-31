import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface IConversation {
    sender: string;
    recipient: string
}

export const chatApi = createApi({
  reducerPath: "chatApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getConversation: builder.query({
      query: ({sender,recipient}:IConversation) => `/chat/get-conversation/${sender}/${recipient}`,
      transformResponse: (res) => {
        const obj = {
          messages: res.data,
        };
        return obj;
      },
    }),
  }),

});

export const { useLazyGetConversationQuery } = chatApi;
