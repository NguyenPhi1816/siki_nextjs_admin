import { SignInRequest, SignInRequestBody } from "@/types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = process.env.NEXT_PUBLIC_SIKI_API;
const signInUrl = process.env.NEXT_PUBLIC_SIKI_SIGN_IN_API;
const keycloakSecret = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (signInRequest: SignInRequest) => {
        const details: SignInRequestBody = {
          client_id: "siki-client",
          grant_type: "password",
          client_secret: keycloakSecret as string,
          username: signInRequest.email,
          password: signInRequest.password,
          scope: "profile",
        };

        const formBody = [];
        for (let property in details) {
          const encodedKey = encodeURIComponent(property);
          const encodedValue = encodeURIComponent(
            details[property as keyof SignInRequestBody]
          );
          formBody.push(encodedKey + "=" + encodedValue);
        }
        const new_formBody = formBody.join("&");
        return {
          url: signInUrl as string,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new_formBody,
        };
      },
    }),
  }),
  keepUnusedDataFor: 120,
});

export const { useSignInMutation } = authApi;
