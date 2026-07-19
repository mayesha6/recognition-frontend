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
  }),
});

export const {
  useGetSuperAdminDashboardQuery,
} = superAdminApi;
