import { apiSlice } from "../../app/api/apiSlice";
import { Comment } from "../../types/comment";

const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string | undefined>({
      query: (videoId) => `comments/${videoId}`,
      transformResponse: (comments: Comment[]) =>
        comments.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()),
    }),
    postComment: builder.mutation({
      query: (comment) => ({
        url: "comments/",
        method: "POST",
        body: comment,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
    }),
    likeComment: builder.mutation({
      query: ({ currentUserId, commentId }) => ({
        url: `users/${currentUserId}/comment/like/${commentId}`,
        method: "PUT",
      }),
    }),
    unlikeComment: builder.mutation({
      query: ({ currentUserId, commentId }) => ({
        url: `users/${currentUserId}/comment/unlike/${commentId}`,
        method: "PUT",
      }),
    }),
  }),
});

apiSlice.enhanceEndpoints({
  addTagTypes: ["Comment"],
  endpoints: {
    getComments: {
      providesTags: ["Comment"],
    },
    postComment: {
      invalidatesTags: ["Comment"],
    },
    deleteComment: {
      invalidatesTags: ["Comment"],
    },
    likeComment: {
      invalidatesTags: ["Comment"],
    },
    unlikeComment: {
      invalidatesTags: ["Comment"],
    },
  },
});

export const {
  useGetCommentsQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} = commentsApiSlice;
