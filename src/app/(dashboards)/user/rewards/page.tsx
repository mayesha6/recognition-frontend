// src/components/dashboard/RewardPage.tsx
"use client";

import RewardCard from "@/modules/user/rewards/components/RewardCard";

// ধরি আপনার API হুকটি এমন
// import { useGetRewardsQuery } from "@/redux/api/rewardApi";

export default function RewardPage() {
  // const { data: rewards, isLoading } = useGetRewardsQuery();

  const mockRewards = [
    { title: "Gift Cards", description: "Amazon, Starbucks, and more", points: 250, icon: "/reward.png" },
    { title: "Travel Experiences", description: "Hotels, flights, getaways", points: 200, icon: "/reward.png" },
    { title: "Dining Vouchers", description: "Local restaurants & cafes", points: 120, icon: "/reward.png" },
    { title: "Tech Gadgets", description: "Latest electronics & accessories", points: 200, icon: "/reward.png" },
    { title: "Vacation Days", description: "Extra paid time off", points: 350, icon: "/reward.png" },
    { title: "Entertainment", description: "Movie tickets, concerts, events", points: 100, icon: "/reward.png" },
  ];

  return (
    <div className="pt-3 md:pt-8 md:pb-8 pb-16">
      <h2 className="text-2xl font-bold mb-8">Available Rewards</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockRewards.map((reward, index) => (
          <RewardCard 
            key={index}
            {...reward}
          />
        ))}
      </div>
    </div>
  );
}