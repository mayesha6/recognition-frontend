"use client";

import { useGetSuperAdminDashboardQuery } from "@/redux/api/superAdminApi";
import PlanDistributionChart from "@/modules/super-admin/revenue/PlanDistribution";
import StatCard from "@/modules/user/rewards/components/StatCard";
import RevenueChart from "@/modules/super-admin/revenue/RevenueChart";
import UpgradeBarChart from "@/modules/super-admin/revenue/UpgradeBarChart";
import { Calendar, Coins, Trophy } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function RevenuePage() {
  const { data: dashRes, isLoading } = useGetSuperAdminDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="text-sm text-gray-500 font-medium animate-pulse">Loading revenue analytics...</p>
      </div>
    );
  }

  const dashData = dashRes?.data || {};
  const overview = dashData.overview || {};
  const charts = dashData.charts || {};

  const monthlyRev = overview.monthlyRevenue || 0;

  // Transform monthly revenue growth chart data
  const rawGrowth = charts.revenueGrowth || [];
  const growthData = MONTHS.map((monthName, idx) => {
    const monthNum = idx + 1;
    const found = rawGrowth.find((g: any) => g._id === monthNum);
    return {
      month: monthName,
      revenue: found ? found.total : 0,
    };
  });

  const totalAnnualRev = overview.totalAnnualRevenue || growthData.reduce((acc, curr) => acc + curr.revenue, 0);

  // Transform plan distribution data
  const rawPlanDist = charts.planDistribution || [];
  const planDistribution = rawPlanDist.length > 0
    ? rawPlanDist.map((p: any) => ({
        name: p._id || "Free",
        value: p.count || 0,
      }))
    : [
        { name: "Free", value: overview.totalOrganizations || 1 },
      ];

  // Upgrades / revenue bar chart data
  const upgradeData = growthData.map((item) => ({
    month: item.month,
    value: item.revenue,
  }));

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount.toLocaleString()}`;
  };

  // Use backend computed growth percentage or fallback
  const currentMonthIdx = new Date().getMonth();
  const currentMonthRev = growthData[currentMonthIdx]?.revenue || 0;
  const prevMonthRev = growthData[currentMonthIdx > 0 ? currentMonthIdx - 1 : 11]?.revenue || 0;

  let computedTrend: string | undefined = undefined;
  if (prevMonthRev > 0) {
    const pct = (((currentMonthRev - prevMonthRev) / prevMonthRev) * 100).toFixed(1);
    computedTrend = `${Number(pct) >= 0 ? "+" : ""}${pct}%`;
  }

  const monthlyTrend = overview.monthlyGrowthPercentage || computedTrend || undefined;

  return (
    <div className="space-y-6">
      <h1 className="text-[28px] font-medium text-gray-900 font-bold">Revenue & Billing Analytics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
        <StatCard
          title="Total Revenue"
          count={formatCurrency(totalAnnualRev)}
          trend={monthlyTrend}
          icon={<Trophy className="w-5 h-5 text-orange-500" />}
          iconBgColor="bg-[#FFAA00]/10"
        />

        <StatCard
          title="Monthly Revenue"
          count={formatCurrency(monthlyRev)}
          trend={monthlyTrend}
          icon={<Calendar className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-[#00AC5F]/10"
        />

        <StatCard
          title="Annual Revenue"
          count={formatCurrency(totalAnnualRev)}
          trend={monthlyTrend}
          icon={<Coins className="w-5 h-5 text-red-500" />}
          iconBgColor="bg-[#FF0000]/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-medium text-xl mb-4 text-gray-900">Revenue Growth</h3>
          <RevenueChart data={growthData} />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-medium text-xl mb-4 text-gray-900">Plan Distribution</h3>
          <PlanDistributionChart data={planDistribution} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-medium text-xl mb-4 text-gray-900">Subscription Upgrades</h3>
        <UpgradeBarChart data={upgradeData} />
      </div>
    </div>
  );
}