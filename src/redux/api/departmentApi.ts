import { baseApi } from "./baseApi";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<any, { searchTerm?: string; organizationId?: string } | void>({
      query: (params) => ({
        url: "/department",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["User", "Recognition"],
    }),

    createDepartment: builder.mutation<any, { name: string; adminId?: string }>({
      query: (data) => ({
        url: "/department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User", "Recognition"],
    }),

    updateDepartment: builder.mutation<any, { id: string; name: string; adminId?: string }>({
      query: ({ id, ...data }) => ({
        url: `/department/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User", "Recognition"],
    }),

    deleteDepartment: builder.mutation<any, string>({
      query: (id) => ({
        url: `/department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Recognition"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
