import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { categoryApi } from "./features/category/categoryApi";
import { modalSlice } from "./features/modal/ModalSlice";
import { authApi } from "./features/auth/authApi";
import { userApi } from "./features/user/userApi";
import { userSlice } from "./features/user/userSlice";
import { mediaApi } from "./features/media/mediaApi";
import { productApi } from "./features/product/productApi";

const rootReducer = combineSlices(
  authSlice,
  modalSlice,
  userSlice,
  categoryApi,
  authApi,
  userApi,
  mediaApi,
  productApi
);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        categoryApi.middleware,
        authApi.middleware,
        userApi.middleware,
        mediaApi.middleware,
        productApi.middleware
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
