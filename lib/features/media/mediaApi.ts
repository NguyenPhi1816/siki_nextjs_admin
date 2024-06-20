import { MediaResponse } from "@/types/media";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = process.env.NEXT_PUBLIC_SIKI_API;

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  endpoints: (builder) => ({
    createMedia: builder.mutation<MediaResponse, File[]>({
      query: (files: File[]) => {
        const formData = new FormData();

        files.forEach((file) => formData.append("file", file));

        return {
          url: "/images/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
  keepUnusedDataFor: 120,
});

export const { useCreateMediaMutation } = mediaApi;
