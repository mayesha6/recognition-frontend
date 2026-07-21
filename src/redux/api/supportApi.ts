import { baseApi } from "./baseApi";

export const supportApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["SupportTicket"] })
  .injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<any, { page?: number; limit?: number; search?: string; status?: string; priority?: string } | void>({
      query: (params) => ({
        url: "/support",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["SupportTicket"],
    }),
    getTicketStats: builder.query<any, void>({
      query: () => ({
        url: "/support/stats",
        method: "GET",
      }),
      providesTags: ["SupportTicket"],
    }),
    createTicket: builder.mutation<any, { category: string; subject: string; description: string; priority?: string }>({
      query: (payload) => ({
        url: "/support",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["SupportTicket"],
    }),
    respondToTicket: builder.mutation<any, { ticketId: string; message?: string; status?: string; priority?: string }>({
      query: ({ ticketId, ...payload }) => ({
        url: `/support/${ticketId}/respond`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["SupportTicket"],
    }),
    deleteTicket: builder.mutation<any, string>({
      query: (ticketId) => ({
        url: `/support/${ticketId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SupportTicket"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketStatsQuery,
  useCreateTicketMutation,
  useRespondToTicketMutation,
  useDeleteTicketMutation,
} = supportApi;
