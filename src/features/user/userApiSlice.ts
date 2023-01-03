import { apiSlice } from "../../app/api/apiSlice";
import User from "../../types/user";
import { addSubscription, removeSubscription } from "./userSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string | undefined>({
      query: (id) => `users/find/${id}`,
    }),
    updateUser: builder.mutation<
      User,
      {
        id: string | undefined;
        inputs: {
          name: string;
          bio: string;
          image: string | undefined;
        };
      }
    >({
      query: ({ id, inputs }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: inputs,
      }),
    }),
    deleteUser: builder.mutation<string, string | undefined>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
    subscribe: builder.mutation<
      string,
      { currentUserId: string | null; videoOwnerId: string | undefined }
    >({
      query: ({ currentUserId, videoOwnerId }) => ({
        url: `users/${currentUserId}/subscribe/${videoOwnerId}`,
        method: "PUT",
      }),
      async onQueryStarted({ videoOwnerId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          videoOwnerId && dispatch(addSubscription(videoOwnerId));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    unsubscribe: builder.mutation<
      string,
      { currentUserId: string | null; videoOwnerId: string | undefined }
    >({
      query: ({ currentUserId, videoOwnerId }) => ({
        url: `users/${currentUserId}/unsubscribe/${videoOwnerId}`,
        method: "PUT",
      }),
      async onQueryStarted({ videoOwnerId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          videoOwnerId && dispatch(removeSubscription(videoOwnerId));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

apiSlice.enhanceEndpoints({
  addTagTypes: ["User"],
  endpoints: {
    getUser: {
      providesTags: ["User"],
    },
    updateUser: {
      invalidatesTags: ["User"],
    },
  },
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSubscribeMutation,
  useUnsubscribeMutation,
} = userApiSlice;
