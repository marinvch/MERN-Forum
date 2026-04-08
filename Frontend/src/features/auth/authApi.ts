import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery.js";
import {
  User,
  LoginPayload,
  RegisterPayload,
  ApiResponse,
} from "../../types/index.js";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<User>, RegisterPayload>({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation<ApiResponse<User>, LoginPayload>({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        body: userData,
      }),
    }),

    validateToken: builder.mutation<{ verified: boolean; user: User }, void>({
      query: () => ({
        url: "/users/validToken",
        method: "POST",
        body: {},
      }),
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => "/users/currentUser",
    }),

    deleteUser: builder.mutation<void, void>({
      query: () => ({
        url: "/users/delete",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useValidateTokenMutation,
  useGetCurrentUserQuery,
  useDeleteUserMutation,
} = authApi;
