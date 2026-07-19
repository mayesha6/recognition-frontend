import { baseApi } from "./baseApi";

export const superAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuperAdminDashboard: builder.query<any, void>({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["User", "Recognition", "Reward", "Claim"],
    }),

    deleteOrganization: builder.mutation<any, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateOrganizationStatus: builder.mutation<any, { id: string; isActive: string }>({
      query: ({ id, isActive }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: { isActive },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetSuperAdminDashboardQuery,
  useDeleteOrganizationMutation,
  useUpdateOrganizationStatusMutation,
} = superAdminApi;
