import { baseApi } from "./baseApi";

export const orgAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrgDashboard: builder.query<any, void>({
      query: () => ({
        url: "/admin/org-dashboard",
        method: "GET",
      }),
      providesTags: ["User", "Recognition", "Reward", "Claim"],
    }),
  }),
});

export const { useGetOrgDashboardQuery } = orgAdminApi;
