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
  }),
});

export const {
  useGetCategoriesQuery,
  useGetTonesQuery,
  useGetRecognitionValuesQuery,
  useGetMyBalanceQuery,
} = recognitionApi;
