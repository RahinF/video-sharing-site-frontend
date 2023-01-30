import { apiSlice } from "../../app/api/apiSlice";
import { clearUser, setUser } from "../user/userSlice";
import { clearToken, setToken } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        user: {
          id: string;
          image: string;
          subscriptions: string[];
        };
        accessToken: string;
      },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, accessToken } = data;

          dispatch(setUser(user));
          dispatch(setToken(accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    register: builder.mutation<
      {
        user: {
          id: string;
          image: string;
          subscriptions: string[];
        };
        accessToken: string;
      },
      { name: string; email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, accessToken } = data;

          dispatch(setUser(user));
          dispatch(setToken(accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.mutation<
      {
        user: {
          id: string;
          image: string;
          subscriptions: string[];
        };
        accessToken: string;
      },
      void
    >({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, accessToken } = data;

          dispatch(setUser(user));
          dispatch(setToken(accessToken));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearToken());
          dispatch(clearUser());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApiSlice;
