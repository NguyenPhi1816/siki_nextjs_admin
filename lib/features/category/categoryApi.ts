import {
  CategoryRequest,
  ICategory,
  UpdateCategoryRequest,
} from "@/types/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = process.env.NEXT_PUBLIC_SIKI_API;

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => {
        return { url: "/categories" };
      },
      providesTags: (result) =>
        result ? result.map(({ Id }) => ({ type: "Category", Id })) : [],
    }),
    saveCategory: builder.mutation({
      query: (categoryRequest: CategoryRequest) => {
        const bodyData = {
          name: categoryRequest.name,
          image: categoryRequest.image,
          description: categoryRequest.desc,
        };

        return {
          url: "/categories",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${categoryRequest.token}`,
          },
          body: JSON.stringify(bodyData),
        };
      },
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: (categoryRequest: UpdateCategoryRequest) => {
        const bodyData = {
          id: categoryRequest.id,
          name: categoryRequest.name,
          image: categoryRequest.image,
          description: categoryRequest.desc,
        };

        return {
          url: "/categories",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${categoryRequest.token}`,
          },
          body: JSON.stringify(bodyData),
        };
      },
      invalidatesTags: ["Category"],
    }),
  }),
  keepUnusedDataFor: 120, // time in seconds
});

export const {
  useGetCategoriesQuery,
  useSaveCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
