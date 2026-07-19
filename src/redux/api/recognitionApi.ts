import { baseApi } from "./baseApi";

export const recognitionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<any, void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
    }),
    getTones: builder.query<any, void>({
      query: () => ({
        url: "/tone",
        method: "GET",
      }),
    }),
    getRecognitionValues: builder.query<any, void>({
      query: () => ({
        url: "/recognition-value",
        method: "GET",
      }),
    }),
    getMyBalance: builder.query<any, void>({
      query: () => ({
        url: "/points/my-balance",
        method: "GET",
      }),
    }),
    getRecognitionHistory: builder.query<any, Record<string, any> | void>({
      query: (params) => ({
        url: "/recognition/history",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Recognition"],
    }),
    deleteRecognition: builder.mutation<any, string>({
      query: (id) => ({
        url: `/recognition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recognition"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetTonesQuery,
  useGetRecognitionValuesQuery,
  useGetMyBalanceQuery,
  useGetRecognitionHistoryQuery,
  useDeleteRecognitionMutation,
} = recognitionApi;
