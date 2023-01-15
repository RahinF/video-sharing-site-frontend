import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import menuReducer from "../features/menu/menuSlice";
import userReducer from "../features/user/userSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV === "development" ? true : false,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
