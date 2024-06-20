import { SignInRequest } from "@/types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = process.env.NEXT_PUBLIC_SIKI_API;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (signInRequest: SignInRequest) => {
        return {
          url: `${apiBaseUrl}/auth/signin`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: signInRequest.phoneNumber,
            password: signInRequest.password,
          }),
        };
      },
    }),
  }),
  keepUnusedDataFor: 120,
});

export const { useSignInMutation } = authApi;
