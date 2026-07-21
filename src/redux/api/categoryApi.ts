import { baseApi } from "./baseApi";

export const categoryApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Category"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCategories: builder.query<any, void>({
        query: () => ({
          url: "/category",
          method: "GET",
        }),
        providesTags: ["Category"],
      }),

      createCategory: builder.mutation<any, { name: string }>({
        query: (data) => ({
          url: "/category/create",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Category"],
      }),

      updateCategory: builder.mutation<any, { id: string; name: string }>({
        query: ({ id, ...data }) => ({
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["Category"],
      }),

      deleteCategory: builder.mutation<any, string>({
        query: (id) => ({
          url: `/category/delete-category/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Category"],
      }),

      addCategoryImages: builder.mutation<any, { categoryId: string; formData: FormData }>({
        query: ({ categoryId, formData }) => ({
          url: `/category/${categoryId}/images`,
          method: "POST",
          body: formData,
        }),
        invalidatesTags: ["Category"],
      }),

      deleteCategoryImage: builder.mutation<any, { categoryId: string; imageUrl: string }>({
        query: (data) => ({
          url: "/category/image",
          method: "DELETE",
          body: data,
        }),
        invalidatesTags: ["Category"],
      }),
    }),
  });

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddCategoryImagesMutation,
  useDeleteCategoryImageMutation,
} = categoryApi;
