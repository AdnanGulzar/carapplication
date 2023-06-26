// carApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
    credentials: "include",
  }),
  tagTypes: ["car"],
  endpoints: (builder) => ({
    getCars: builder.query({
      query: () => "/car",
      providesTags: ["car"],
    }),
    getCarById: builder.query({
      query: (id) => `/cars/${id}`,
    }),
    createCar: builder.mutation({
      query: (car) => ({
        url: "/car/new",
        method: "POST",
        body: car,
      }),
      invalidatesTags: ["car"],
    }),
    updateCar: builder.mutation({
      query: ({ id, ...car }) => ({
        url: `/car/${id}`,
        method: "PUT",
        body: car,
      }),
      invalidatesTags: ["car"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/car/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["car"],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;
