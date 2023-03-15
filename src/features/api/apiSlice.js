import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["videos", "video", "relatedVideos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["videos"],
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      providesTags: (result, error, arg) => [{ type: "video", id: arg }],
    }),
    getRelatedVideos: builder.query({
      query: ({ videoId, title }) => {
        const tags = title.split(" ");
        const queryString =
          tags.map((tag) => `title_like=${tag}`).join("&") +
          `&id_ne=${videoId}` +
          `&_limit=4`;
        return `/videos?${queryString}`;
      },
      providesTags: (result, error, arg) => [
        { type: "relatedVideos", id: arg.id },
      ],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "videos",
        { type: "video", id: arg.id },
        { type: "relatedVideos", id: arg.id },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
