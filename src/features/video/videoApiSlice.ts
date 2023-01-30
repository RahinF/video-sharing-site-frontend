import { apiSlice } from "../../app/api/apiSlice";
import { Video } from "../../types/video";

const videoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query<Video, string | undefined>({
      query: (id) => `videos/find/${id}`,
    }),
    getVideos: builder.query<Video[], string | undefined>({
      query: (type) => `videos/${type}`,
    }),
    getVideosByUser: builder.query<Video[], string | undefined>({
      query: (id) => `videos/user/${id}`,
    }),
    getVideosByTags: builder.query<
      Video[],
      string[] | string | undefined | null
    >({
      query: (tags) => `videos/tags?tags=${tags}`,
    }),
    getVideosBySearch: builder.query<Video[], string>({
      query: (search) => `videos/search${search}`,
    }),
    deleteVideo: builder.mutation<string, string>({
      query: (id) => ({
        url: `videos/${id}`,
        method: "DELETE",
      }),
    }),
    updateVideo: builder.mutation<
      Video,
      {
        id: string;
        inputs: {
          title: string;
          description: string;
          imageUrl?: string;
          tags: string[];
        };
      }
    >({
      query: ({ id, inputs }) => ({
        url: `videos/${id}`,
        method: "PUT",
        body: inputs,
      }),
    }),
    uploadVideo: builder.mutation<
      Video,
      {
        title: string;
        description: string;
        duration: number;
        imageUrl: string;
        videoUrl: string;
        tags: string[];
        userId: string;
      }
    >({
      query: (inputs) => ({
        url: `videos/`,
        method: "POST",
        body: inputs,
      }),
    }),
    addView: builder.mutation<string, string>({
      query: (id) => ({
        url: `videos/view/${id}`,
        method: "PUT",
      }),
    }),
    likeVideo: builder.mutation<
      string,
      { currentUserId: string | null; videoId: string }
    >({
      query: ({ currentUserId, videoId }) => ({
        url: `users/${currentUserId}/video/like/${videoId}`,
        method: "PUT",
      }),
    }),
    unlikeVideo: builder.mutation<
      string,
      { currentUserId: string | null; videoId: string }
    >({
      query: ({ currentUserId, videoId }) => ({
        url: `users/${currentUserId}/video/unlike/${videoId}`,
        method: "PUT",
      }),
    }),
  }),
});

apiSlice.enhanceEndpoints({
  addTagTypes: ["Video"],
  endpoints: {
    getVideos: {
      providesTags: ["Video"],
    },
    useGetVideosByTagsQuery: {
      providesTags: ["Video"],
    },
    getVideo: {
      providesTags: ["Video"],
    },
    updateVideo: {
      invalidatesTags: ["Video"],
    },
    likeVideo: {
      invalidatesTags: ["Video"],
    },
    unlikeVideo: {
      invalidatesTags: ["Video"],
    },
  },
});

export const {
  useGetVideoQuery,
  useGetVideosQuery,
  useGetVideosByUserQuery,
  useGetVideosBySearchQuery,
  useGetVideosByTagsQuery,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useUploadVideoMutation,
  useAddViewMutation,
  useLikeVideoMutation,
  useUnlikeVideoMutation,
} = videoApiSlice;
