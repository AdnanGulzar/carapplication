import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'

import { userApi } from "./apis/userApi";
import { carApi } from "./apis/carApi";
import { categoryApi } from "./apis/categoryApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(carApi.middleware)
      .concat(categoryApi.middleware),
});
