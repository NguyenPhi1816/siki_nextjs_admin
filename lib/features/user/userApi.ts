import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = process.env.NEXT_PUBLIC_SIKI_API;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    credentials: "same-origin",
  }),
  endpoints: (builder) => ({
    getProfile: builder.mutation({
      query: (token: string) => ({
        url: "/users/storefront/customer/profile",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  keepUnusedDataFor: 120,
});

export const { useGetProfileMutation } = userApi;
