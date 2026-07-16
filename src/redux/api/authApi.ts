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
    }),

    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const { useGetMeQuery, useChangePasswordMutation, useUpdateMyProfileMutation } = authApi;