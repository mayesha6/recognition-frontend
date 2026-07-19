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
  useDeleteRecognitionMutation
} = userApi;