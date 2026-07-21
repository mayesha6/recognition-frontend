import { baseApi } from "./baseApi";

export const toneApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Tone"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTones: builder.query<any, void>({
        query: () => ({
          url: "/tone",
          method: "GET",
        }),
        providesTags: ["Tone"],
      }),

      createTone: builder.mutation<any, { name: string }>({
        query: (data) => ({
          url: "/tone",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Tone"],
      }),

      updateTone: builder.mutation<any, { id: string; name: string }>({
        query: ({ id, ...data }) => ({
          url: `/tone/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["Tone"],
      }),

      deleteTone: builder.mutation<any, string>({
        query: (id) => ({
          url: `/tone/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Tone"],
      }),
    }),
  });

export const {
  useGetTonesQuery,
  useCreateToneMutation,
  useUpdateToneMutation,
  useDeleteToneMutation,
} = toneApi;
