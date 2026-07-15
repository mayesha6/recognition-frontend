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

  }),
});

export const { 
  useSendRecognitionMutation, 
  useGetRecognitionHistoryQuery,
  useGetDepartmentUsersQuery
} = userApi;