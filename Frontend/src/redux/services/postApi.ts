import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery.js";
import {
  Post,
  Comment,
  CreatePostPayload,
  CreateCommentPayload,
} from "../../types/index.js";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery,
  tagTypes: ["Post", "Comment"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),

    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),

    createPost: builder.mutation<Post, CreatePostPayload>({
      query: (postData) => ({
        url: "/posts/create",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation<
      Post,
      { id: string; data: Partial<CreatePostPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/posts/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Post", id }],
    }),

    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    likePost: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/posts/like/${id}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),

    dislikePost: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/posts/dislike/${id}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),

    getComments: builder.query<Comment[], string>({
      query: (postId) => `/comments/${postId}`,
      providesTags: (_result, _error, postId) => [
        { type: "Comment", id: postId },
      ],
    }),

    createComment: builder.mutation<Post, CreateCommentPayload>({
      query: (commentData) => ({
        url: "/comments/create",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "Comment", id: postId },
        { type: "Post", id: postId },
      ],
    }),

    deleteComment: builder.mutation<void, { commentId: string; postId: string }>(
      {
        query: ({ commentId }) => ({
          url: `/comments/${commentId}`,
          method: "DELETE",
        }),
        invalidatesTags: (_result, _error, { postId }) => [
          { type: "Comment", id: postId },
        ],
      }
    ),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = postApi;
