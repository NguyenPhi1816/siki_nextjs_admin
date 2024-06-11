// Need to use the React-specific entry point to import createApi
import {
  CategoryByNameResponse,
  CategoryRequest,
  ICategory,
} from "@/types/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";

const apiBaseUrl = process.env.NEXT_PUBLIC_SIKI_API;

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => {
        return { url: "/products/category/parents" };
      },
    }),
    getByName: builder.query<CategoryByNameResponse, string>({
      query: (name: string) => `/products/category/${name}`,
    }),
    saveCategory: builder.mutation({
      query: (categoryRequest: CategoryRequest) => {
        const token =
          "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBdnE1ZnhpOGxqeHU5aFF0ZHJGQzhQTjdpaXhPY1pGWF9aWmIzbUhKTDl3In0.eyJleHAiOjE3MTgwODY2MTYsImlhdCI6MTcxODA4NTExNiwianRpIjoiOGI2M2Y0YTAtYzgyNC00NzVkLWFjODAtMjBkOGQ3NTM5YjUzIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4ODgwL3JlYWxtcy9zaWtpIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImM0MWNjMmY3LTU3NTEtNDAwMS1hZmQxLTdiY2Q0Mjc4ZTgyMyIsInR5cCI6IkJlYXJlciIsImF6cCI6InNpa2ktY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImJmNzE2YmMxLWY4MjAtNDJkMC1iNDg3LTBhODAwZjgyY2VkNSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXNpa2kiLCJBRE1JTiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJtaWNyb3Byb2ZpbGUtand0IHByb2ZpbGUgZW1haWwiLCJzaWQiOiJiZjcxNmJjMS1mODIwLTQyZDAtYjQ4Ny0wYTgwMGY4MmNlZDUiLCJ1cG4iOiJhZG1pbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJhZG1pbiBhZG1pbiIsImdyb3VwcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtc2lraSIsIkFETUlOIiwidW1hX2F1dGhvcml6YXRpb24iXSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6ImFkbWluIiwiZmFtaWx5X25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0.uR97E64FOkpfCJI_O3BNtjUBH_StMk4FgMRslZGBCHMhyvf-sZ6kBtzkKHHd2YE4KEnZ9sYaKy2Cc8M7-76IFVdEiHz_QVFdBBnUU5cS6fdZl33TGwEpjSxjjCpaYrW-bprmNSuL60yOoyHPvdOznbgp_-PNZt4R5fgru9YfeIJNOwZi241pmGWYtw11iMriTJ58I4kYgRLRf8M4CtQb3gEAHwC6hDfR7m6Gd4Fo0qjLyshFi5Iaj60uj0PyOVjNa27NUeVowMpzSngkjS9p0WeTrbFEMx_YGEzkw6kCzjZXd5K5unGlCy-JfANX5smqnFDAXyNJoiH--HmnU6BLeg";

        const bodyData = {
          name: categoryRequest.name,
          image:
            "https://res.cloudinary.com/di6h4mtfa/image/upload/v1717756676/efdd3909-3bf3-47ea-bd46-1c947167150f.webp",
          description: categoryRequest.desc,
          categoryParentId: categoryRequest.parentId,
        };

        return {
          url: "/products/backoffice/category",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        };
      },
    }),
  }),
  keepUnusedDataFor: 120, // time in seconds
});

export const {
  useGetCategoriesQuery,
  useGetByNameQuery,
  useSaveCategoryMutation,
} = categoryApi;
