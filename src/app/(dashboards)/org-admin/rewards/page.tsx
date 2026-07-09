"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RewardTable from "@/modules/org-admin/reward/RewardTable";
import StatCard from "@/modules/user/rewards/components/StatCard";
import { Gift, Target, ShoppingBag, CreditCard, Search, Plus, Coins } from "lucide-react";
// import StatCard from "@/components/StatCard";
// import RewardTable from "@/components/RewardTable";

export default function RewardsPage() {
  const rewards = [
    { name: "Gift Cards", description: "Amazon, Starbucks, and more", points: 250, stock: 50, status: "Active" },
    { name: "Travel Experiences", description: "Hotels, flights, getaways", points: 200, stock: 25, status: "Active" },
    { name: "Dining Vouchers", description: "Local restaurants & cafes", points: 120, stock: 100, status: "Active" },
    { name: "Tech Gadgets", description: "Latest electronics & accessories", points: 200, stock: 30, status: "Active" },
    { name: "Vacation Days", description: "Extra paid time off", points: 350, stock: 10, status: "Active" },
    { name: "Entertainment", description: "Movie tickets, concerts, events", points: 100, stock: 75, status: "Active" },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
                <h2 className="text-[28px] font-medium">Reward & Redeem</h2>
                <div className="flex items-center justify-end gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                    </div>
                    <Button onClick={() => setIsTicketModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        Open New Ticket
                    </Button>
                </div>
            </div>

      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Total Rewards"
          count="142"
          icon={<Gift className="w-5 h-5 text-indigo-800" />}
          iconBgColor="bg-indigo-800/10"
        />
        <StatCard
          title="Points in Circulation"
          count="8.6M"
          icon={<Coins className="w-5 h-5 text-orange-500" />}
          iconBgColor="bg-orange-500/10"
        />
        <StatCard 
        title="Redemptions This Month" 
        count="2,841" 
         icon={<ShoppingBag className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-green-500/10"
         />
        <StatCard 
        title="Top Reward" 
        count="Amazon Gift Card" 
        icon={<CreditCard className="w-5 h-5 text-indigo-500" />}
          iconBgColor="bg-indigo-500/10"
        />
      </div>

      <h2 className="text-lg font-medium mt-8">Reward Catalog</h2>
      <RewardTable rewards={rewards} />
    </div>
  );
}