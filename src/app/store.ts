import type { PreloadedState } from "@reduxjs/toolkit";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import menuReducer from "../features/menu/menuSlice";
import userReducer from "../features/user/userSlice";
import { apiSlice } from "./api/apiSlice";

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  user: userReducer,
  menu: menuReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV === "development" ? true : false,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
