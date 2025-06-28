import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

interface AuthResponse extends Response {
  token: string;
  message: string;
  data?: Record<string, unknown>;
}
interface AuthErrorResponse extends Response {
  data: {
    message: string;
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    activate: builder.query({
      query: (token: string) => "/auth/activate/" + token,
      transformResponse: (res: AuthResponse) => {
        toast.success(res.message);
        return res;
      },
      transformErrorResponse: (res: AuthErrorResponse) => {
        toast.error(res.data.message);
        return res;
      },
    }),

    allUsers: builder.query({
      query: () => "/auth/all-users",
      transformResponse: (res: AuthResponse) => {
        return res.data;
      },
      transformErrorResponse: (res: AuthErrorResponse) => {
        toast.error(res.data.message);
        return res;
      },
    }),

    login: builder.mutation({
      query: (user) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: user,
        };
      },
      transformResponse: (res: AuthResponse) => {
        document.cookie = `access_token=${res.data}; path=/; max-age=3600`;
        toast.success(res.message);

        return res;
      },
      transformErrorResponse: (res: AuthErrorResponse) => {
        toast.error(res.data.message);
        return res;
      },
    }),

    register: builder.mutation({
      query: (user) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: user,
        };
      },
      transformResponse: (res: AuthResponse) => {
        toast.success(res.message);
        return res;
      },
      transformErrorResponse: (res: AuthErrorResponse) => {
        console.log("ERR!", res);
        toast.error(res.data.message);
        return res;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyActivateQuery, useAllUsersQuery } = authApi;
