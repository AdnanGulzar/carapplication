// categoryApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["category"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/category",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "",
      providesTags: ["category"],
    }),
    getCategoryById: builder.query({
      query: (id) => `/categories/${id}`,
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: "/new",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
