"use client";
import { useEffect, useState } from "react";
// import StatCard from "@/components/analytics/StatCard";
// import RevenueChart from "@/components/analytics/RevenueChart";
// import PlanDistributionChart from "@/components/analytics/PlanDistributionChart";
// import UpgradeBarChart from "@/components/analytics/UpgradeBarChart";
import { Calendar, Coins, Trophy } from "lucide-react";
import PlanDistributionChart from "@/modules/super-admin/revenue/PlanDistribution";
import StatCard from "@/modules/user/rewards/components/StatCard";
import RevenueChart from "@/modules/super-admin/revenue/RevenueChart";
import UpgradeBarChart from "@/modules/super-admin/revenue/UpgradeBarChart";

export default function RevenuePage() {
  // const [data, setData] = useState<any>(null);

  // useEffect(() => {
  //   // API Call
  //   fetch("/api/revenue-analytics").then(res => res.json()).then(setData);
  // }, []);
  const data = {
  totalRevenue: "$1,25,221.6M",
  monthlyRevenue: "$221.6K",
  annualRevenue: "$1.89M",
  
  growthData: [
    { month: 'Jan', revenue: 70000 },
    { month: 'Feb', revenue: 110000 },
    { month: 'Mar', revenue: 150000 },
    { month: 'Apr', revenue: 130000 },
    { month: 'May', revenue: 200000 },
    { month: 'Jun', revenue: 180000 },
    { month: 'Jul', revenue: 170000 },
    { month: 'Aug', revenue: 220000 },
    { month: 'Sep', revenue: 250000 },
    { month: 'Oct', revenue: 300000 },
    { month: 'Nov', revenue: 400000 },
    { month: 'Dec', revenue: 500000 },
  ],

  planDistribution: [
    { name: 'Premium', value: 45 },
    { name: 'Enterprise', value: 25 },
    { name: 'Professional', value: 20 },
    { name: 'Free', value: 10 },
  ],

  upgradeData: [
    { month: 'Jan', value: 500 },
    { month: 'Feb', value: 360 },
    { month: 'Mar', value: 180 },
    { month: 'Apr', value: 120 },
    { month: 'May', value: 220 },
    { month: 'Jun', value: 150 },
    { month: 'Jul', value: 280 },
    { month: 'Aug', value: 120 },
    { month: 'Sep', value: 160 },
    { month: 'Oct', value: 240 },
    { month: 'Nov', value: 360 },
    { month: 'Dec', value: 480 },
  ]
};

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-2xl font-bold">Revenue & Billing Analytics</h1>
      
      {/* Stats Cards */}
      {/* <div className="grid grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value={data.totalRevenue} trend="+8.4%" />
        <StatCard title="Monthly Revenue" value={data.monthlyRevenue} trend="+8.4%" />
        <StatCard title="Annual Revenue" value={data.annualRevenue} trend="+12.6%" />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                <StatCard
                    title="Total Revenue"
                    count={5}
                    icon={<Trophy className="w-5 h-5 text-orange-500" />}
                    iconBgColor="bg-[#FFAA00]/10"
                />

                <StatCard
                    title="Monthly Revenue"
                    count={3}
                    icon={<Calendar className="w-5 h-5 text-green-500" />}
                    iconBgColor="bg-[#00AC5F]/10"
                />

                <StatCard
                    title="Annual Revenue"
                    count={3}
                    // trend="+11.2%"
                    icon={<Coins className="w-5 h-5 text-red-500" />}
                    iconBgColor="bg-[#FF0000]/10"
                />
            </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-2xl border">
          <h3 className="font-medium mb-4">Revenue Growth</h3>
          <RevenueChart data={data.growthData} />
        </div>
        <div className="bg-white p-6 rounded-2xl border">
          <h3 className="font-medium mb-4">Plan Distribution</h3>
          <PlanDistributionChart data={data.planDistribution} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border">
        <h3 className="font-medium mb-4">Subscription Upgrades</h3>
        <UpgradeBarChart data={data.upgradeData} />
      </div>
    </div>
  );
}