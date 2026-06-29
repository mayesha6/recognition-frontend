import { baseApi } from "@/redux/api/baseApi";


const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserData : builder.query({
            query: () => ({
                url: "/dashboard/user-data",
            }),
        }),
         post : builder.mutation({
            query: (data) => ({
                url: "/dashboard/user-data",
                method: "POST",
                body: data,
            }),
        }),
    }),
});


export const { useGetUserDataQuery, usePostMutation } = dashboardApi;