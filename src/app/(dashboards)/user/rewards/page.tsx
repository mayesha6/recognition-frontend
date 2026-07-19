// src/components/dashboard/RewardPage.tsx
"use client";

import { useState } from "react";
import RewardCard from "@/modules/user/rewards/components/RewardCard";
import { useGetRewardsQuery, useClaimRewardMutation } from "@/redux/api/rewardApi";
import { toast } from "react-toastify";
import { formatErrorMessage } from "@/utils/formatError";

export default function RewardPage() {
  const { data: rewardsRes, isLoading } = useGetRewardsQuery();
  const [claimReward] = useClaimRewardMutation();
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const rewards = rewardsRes?.data || [];

  const handleClaim = async (id: string) => {
    try {
      setClaimingId(id);
      await claimReward({ rewardId: id }).unwrap();
      toast.success("Reward claimed successfully! Go to Claim List to view status.");
    } catch (error) {
      console.error("Failed to claim reward:", error);
      toast.error(formatErrorMessage(error, "Failed to claim reward. Please try again."));
    } finally {
      setClaimingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading available rewards...</p>
      </div>
    );
  }

  return (
    <div className="pt-3 md:pt-8 md:pb-8 pb-16">
      <h2 className="text-2xl font-bold mb-8">Available Rewards</h2>
      
      {rewards.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center">
          <p className="text-gray-500 font-medium">No rewards available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rewards.map((reward: any) => (
            <RewardCard 
              key={reward._id}
              {...reward}
              onClaim={handleClaim}
              isClaiming={claimingId === reward._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}