import { baseApi } from "./baseApi";

export const walletApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Wallet"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getWallet: builder.query<any, string>({
        query: (userId) => ({
          url: `/wallet/${userId}`,
          method: "GET",
        }),
        providesTags: ["Wallet"],
      }),

      distributePoints: builder.mutation<any, { department: string; points: number }>({
        query: (payload) => ({
          url: "/wallet/distribute",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["Wallet", "User"],
      }),

      setUserPoints: builder.mutation<any, { email: string; points: number }>({
        query: (payload) => ({
          url: "/wallet/set-user-points",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["Wallet", "User"],
      }),

      resetPoints: builder.mutation<any, { department?: string } | void>({
        query: (payload) => ({
          url: "/wallet/reset",
          method: "POST",
          body: payload || {},
        }),
        invalidatesTags: ["Wallet", "User"],
      }),
    }),
  });

export const {
  useGetWalletQuery,
  useDistributePointsMutation,
  useSetUserPointsMutation,
  useResetPointsMutation,
} = walletApi;
