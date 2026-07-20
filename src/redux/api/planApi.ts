import { baseApi } from "./baseApi";

export const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query<any, void>({
      query: () => ({
        url: "/plan",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    createPlan: builder.mutation<any, any>({
      query: (data) => ({
        url: "/plan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updatePlan: builder.mutation<any, { id: string; [key: string]: any }>({
      query: ({ id, ...data }) => ({
        url: `/plan/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deletePlan: builder.mutation<any, string>({
      query: (id) => ({
        url: `/plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = planApi;
