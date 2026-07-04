"use client";

import RewardClaimTable from "@/modules/dept-admin/reward-claim/RewardClaimTable";

const mockClaims = [
  { claimId: "CLM-2041", user: "Saifur Rahman", department: "Engineering", reward: "Amazon Gift Card $25", status: "Resolved" },
  { claimId: "CLM-2042", user: "Rahman", department: "Sterling Health", reward: "Yoga Mat", status: "Pending" },
  { claimId: "CLM-2043", user: "Jessica Liu", department: "Tech Innovations", reward: "Wireless Charger", status: "Rejected" },
];

export default function RewardClaimPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Rewards & Redeem</h1>
      
      {/* স্ট্যাটস কার্ডস (আগের বানানো StatCard কম্পোনেন্ট এখানে বসাবেন) */}
      
      <RewardClaimTable data={mockClaims} />
    </div>
  );
}