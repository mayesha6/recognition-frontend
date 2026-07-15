import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getMe: builder.query({
      query: () => ({ url: "/user/me" }),
      providesTags: ["User"],
    }),

    changePassword: builder.mutation({
        query: (payload) => {
            return {
                url: "/auth/change-password",
                method: "POST",
                body: payload
            }
        }
    })

  }),
});

export const { useGetMeQuery, useChangePasswordMutation } = authApi;