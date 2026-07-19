"use client";

import { Building2, CreditCard, DollarSign, Network, Trophy, Users } from "lucide-react";
import { CategoryBar } from "@/modules/dept-admin/recognition/CategoryBar";
import StatCard from "@/modules/user/rewards/components/StatCard";
import RecognitionChart from "@/modules/dept-admin/recognition/RecognitionChart";
import RecognitionByDeptChart from "@/modules/org-admin/recognition/RecognitionByDeptChart";
import TopPerformers from "@/modules/dept-admin/dashboard/PerformerList";
import RecentSystemActivity from "./components/RecentSystemActivity";
import { useGetSuperAdminDashboardQuery } from "@/redux/api/superAdminApi";

export default function DashboardPage() {
  const { data: dashboardRes, isLoading } = useGetSuperAdminDashboardQuery();
  const dashboardData = dashboardRes?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-2">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        <p className="text-sm text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const overview = dashboardData?.overview || {};
  const charts = dashboardData?.charts || {};
  const recentActivities = dashboardData?.recentActivities || [];

  // Format monthly revenue growth trend data for RecognitionChart
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedRevenueGrowth = monthNames.map((name, index) => {
    const monthNum = index + 1;
    const monthData = charts?.revenueGrowth?.find((item: any) => item._id === monthNum);
    return {
      name,
      value: monthData ? monthData.total : 0
    };
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <h2 className="text-[28px] font-medium mb-4">System Overview</h2>

      {/* ১. স্ট্যাটস কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-5">
        <StatCard
          title="Total Organizations"
          count={overview.totalOrganizations ?? 0}
          icon={<Building2 className="w-5 h-5 text-orange-500" />}
          iconBgColor="bg-[#FFAA00]/10"
        />
        <StatCard
          title="Active Subscriptions"
          count={overview.activeSubscriptions ?? 0}
          icon={<CreditCard className="w-5 h-5 text-red-500" />}
          iconBgColor="bg-[#FFAA00]/10"
        />
        <StatCard
          title="Total Departments"
          count={overview.totalDepartments ?? 0}
          icon={<Network className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-[#FFAA00]/10"
        />
        <StatCard
          title="Total Recognitions"
          count={overview.totalRecognitions ?? 0}
          icon={<Trophy className="w-5 h-5 text-orange-500" />}
          iconBgColor="bg-[#FFAA00]/10"
        />

        <StatCard
          title="Monthly Revenue"
          count={overview.monthlyRevenue != null ? `$${overview.monthlyRevenue}` : "$0"}
          icon={<DollarSign className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-[#00AC5F]/10"
        />

        <StatCard
          title="Total Users"
          count={overview.activeUsers ?? 0}
          icon={<Users className="w-5 h-5 text-red-500" />}
          iconBgColor="bg-[#FF0000]/10"
        />
      </div>

      {/* ২. চার্ট এবং ক্যাটাগরি */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray shadow-sm">
          <h3 className="font-bold mb-4">Revenue Growth</h3>
          <RecognitionChart data={formattedRevenueGrowth} />
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm border-gray">
          <h3 className="font-bold mb-4">Recognition by Category</h3>
          <CategoryBar label="Team Collaboration" percentage={85} color="#6366f1" />
          <CategoryBar label="Peer Recognition" percentage={72} color="#ec4899" />
          <CategoryBar label="Innovation" percentage={65} color="#3b82f6" />
        </div>
      </div>

      <div className="mb-5">
        <RecognitionByDeptChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopPerformers performers={[]} />
        <RecentSystemActivity activities={recentActivities} />
      </div>
    </div>
  );
}