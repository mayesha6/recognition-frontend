import { baseApi } from "./baseApi";

export const rewardApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["Reward", "Claim"] })
  .injectEndpoints({
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
    getMyClaims: builder.query<any, { page?: number; limit?: number; status?: string; search?: string } | void>({
      query: (params) => ({
        url: "/redeem",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Claim"],
    }),
    updateClaimStatus: builder.mutation<any, { id: string; status: "Approved" | "Rejected" }>({
      query: ({ id, status }) => ({
        url: `/redeem/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Claim", "Reward", "User"],
    }),
    createReward: builder.mutation<any, Partial<any>>({
      query: (data) => {
        const formData = new FormData();
        const statusValue = data.status === "ACTIVE" || data.status === "Active" ? "Active" : "Inactive";
        const jsonPayload = {
          name: data.name,
          points: Number(data.points) || 1,
          stock: Number(data.stock) || 0,
          status: statusValue,
          description: data.description || "",
        };
        formData.append("data", JSON.stringify(jsonPayload));
        if (data.file) {
          formData.append("files", data.file);
        }
        return {
          url: "/reward",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Reward"],
    }),
    updateReward: builder.mutation<any, { id: string; [key: string]: any }>({
      query: ({ id, ...data }) => {
        const formData = new FormData();
        const statusValue = data.status ? (data.status === "ACTIVE" || data.status === "Active" ? "Active" : "Inactive") : undefined;
        const jsonPayload = {
          ...(data.name && { name: data.name }),
          ...(data.points !== undefined && { points: Number(data.points) }),
          ...(data.stock !== undefined && { stock: Number(data.stock) }),
          ...(statusValue && { status: statusValue }),
          ...(data.description !== undefined && { description: data.description }),
        };
        formData.append("data", JSON.stringify(jsonPayload));
        if (data.file) {
          formData.append("files", data.file);
        }
        return {
          url: `/reward/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Reward"],
    }),
    deleteReward: builder.mutation<any, string>({
      query: (id) => ({
        url: `/reward/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reward"],
    }),
  }),
});

export const {
  useGetRewardsQuery,
  useClaimRewardMutation,
  useGetMyClaimsQuery,
  useUpdateClaimStatusMutation,
  useCreateRewardMutation,
  useUpdateRewardMutation,
  useDeleteRewardMutation,
} = rewardApi;
