import { apiSlice } from "../../app/api/apiSlice";
import { clearUser, setUser } from "../user/userSlice";
import { clearToken, setToken } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { user, accessToken } = data

                    dispatch(setUser(user));
                    dispatch(setToken(accessToken));
                } catch (error) {
                    console.log(error)
                }
            } 
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { user, accessToken } = data

                    dispatch(setUser(user));
                    dispatch(setToken(accessToken));
                } catch (error) {
                    console.log(error)
                }
            } 
        }),
        refresh: builder.mutation({
            query: () =>  ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { user, accessToken } = data

                    dispatch(setUser(user));
                    dispatch(setToken(accessToken));
                } catch (error) {
                    console.log(error)
                }
            } 
        }),
        logout: builder.mutation({
            query: () =>  ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(clearToken())
                    dispatch(clearUser())
                    dispatch(apiSlice.util.resetApiState())
                } catch (error) {
                    console.log(error)
                }

            }
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useLogoutMutation
  } = authApiSlice