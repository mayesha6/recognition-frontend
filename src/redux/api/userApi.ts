import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendRecognition: builder.mutation({
      query: (data) => ({
        url: "/recognition/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Recognition"],
    }),

    generateMessage: builder.mutation({
      query: (data) => ({
        url: "/ai/generate",
        method: "POST",
        body: data,
      }),
    }),

    regenerateMessage: builder.mutation({
      query: (data) => ({
        url: "/ai/regenerate",
        method: "POST",
        body: data,
      }),
    }),

    editMessage: builder.mutation({
      query: (data) => ({
        url: "/ai/edit",
        method: "PATCH",
        body: data,
      }),
    }),

    getRecognitionHistory: builder.query({
      query: (params) => ({
        url: "/recognition/history",
        method: "GET",
        params,
      }),
      providesTags: ["Recognition"],
    }),

    getDepartmentUsers: builder.query({
      query: (params) => ({
        url: "/user/all-users", 
        method: "GET",
        params, 
      }),
      providesTags: ["User"],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    deleteOwnAccount: builder.mutation({
      query: () => ({
        url: "/user/delete-own-account",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserBySlug: builder.query({
      query: (slug) => ({
        url: `/user/by-slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    deleteRecognition: builder.mutation({
      query: (id) => ({
        url: `/recognition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recognition"],
    }),

  }),
});

export const { 
  useSendRecognitionMutation, 
  useGenerateMessageMutation,
  useRegenerateMessageMutation,
  useEditMessageMutation,
  useGetRecognitionHistoryQuery,
  useGetDepartmentUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteOwnAccountMutation,
  useGetSingleUserQuery,
  useGetUserBySlugQuery,
  useDeleteRecognitionMutation
} = userApi;