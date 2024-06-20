import { IAuthResponse } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = process.env.NEXT_PUBLIC_SIKI_API;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  endpoints: (builder) => ({
    getProfile: builder.mutation<IAuthResponse, string>({
      query: (token: string) => ({
        url: "/users/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  keepUnusedDataFor: 120,
});

export const { useGetProfileMutation } = userApi;
