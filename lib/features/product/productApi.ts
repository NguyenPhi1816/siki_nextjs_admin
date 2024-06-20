import { AddProductRequest, IProduct } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = process.env.NEXT_PUBLIC_SIKI_API;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getBaseProducstByCategorySlug: builder.mutation<IProduct[], string>({
      query: (slug: string) => {
        return { url: `/products/category/${slug}` };
      },
      invalidatesTags: ["Product"],
    }),
    saveProduct: builder.mutation<any, AddProductRequest>({
      query: (addProductRequest: AddProductRequest) => {
        const token = addProductRequest.token;
        const bodyData = {
          name: addProductRequest.name,
          description: addProductRequest.description,
          categoryId: addProductRequest.categoryId,
          images: addProductRequest.images,
          options: addProductRequest.options,
          variants: addProductRequest.variants,
        };
        return {
          url: "/products",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
  keepUnusedDataFor: 120, // time in seconds
});

export const {
  useGetBaseProducstByCategorySlugMutation,
  useSaveProductMutation,
} = productApi;
