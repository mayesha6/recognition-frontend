import { baseApi } from "./baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: "/notification",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Notification"],
    }),

    getUnreadCount: builder.query<any, void>({
      query: () => ({
        url: "/notification/unread-count",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    markAsRead: builder.mutation<any, string>({
      query: (id) => ({
        url: `/notification/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    markAllAsRead: builder.mutation<any, void>({
      query: () => ({
        url: "/notification/mark-all-read",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApi;
