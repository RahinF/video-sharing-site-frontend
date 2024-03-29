import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { clearToken, setToken } from '../../features/auth/authSlice';
import { clearUser, setUser } from '../../features/user/userSlice';
import User from '../../types/user';
import { RootState } from '../store';
import { url } from './config';

interface Props {
  user: User;
  accessToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${url}/api/v1`,
  credentials: 'include', // send cookies with request
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    // try to get a new token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      // store the new token and user
      const { user, accessToken } = refreshResult.data as Props;
      api.dispatch(setToken(accessToken));
      api.dispatch(setUser(user));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearToken());
      api.dispatch(clearUser());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
