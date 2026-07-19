import { baseApi } from "./baseApi";

export const rewardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRewards: builder.query<any, void>({
      query: () => ({
        url: "/reward",
        method: "GET",
      }),
      providesTags: ["Reward"],
    }),
    claimReward: builder.mutation<any, { rewardId: string }>({
      query: (payload) => ({
        url: "/redeem",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Reward", "User", "Claim"],
    }),
    getMyClaims: builder.query<any, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: "/redeem",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Claim"],
    }),
  }),
});

export const {
  useGetRewardsQuery,
  useClaimRewardMutation,
  useGetMyClaimsQuery,
} = rewardApi;
