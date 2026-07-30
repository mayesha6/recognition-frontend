"use client";
import { Calendar, CheckIcon, ClockIcon, Coins, Trophy, XIcon, Users } from "lucide-react";
import { CategoryBar } from "@/modules/dept-admin/recognition/CategoryBar";
import StatCard from "@/modules/user/rewards/components/StatCard";
import RecognitionTable from "@/modules/dept-admin/recognition/RecognitionTable";
import RecognitionChart from "@/modules/dept-admin/recognition/RecognitionChart";
import RecognitionByDeptChart from "@/modules/org-admin/recognition/RecognitionByDeptChart";
import TopPerformers from "@/modules/dept-admin/dashboard/PerformerList";
import RecentActivity from "@/modules/dept-admin/dashboard/RecentRecognition";
import { useGetOrgDashboardQuery } from "@/redux/api/orgAdminApi";

export const trendData = [
  { name: 'Jan', value: 70000 },
  { name: 'Feb', value: 95000 },
  { name: 'Mar', value: 120000 },
  { name: 'Apr', value: 150000 },
  { name: 'May', value: 190000 },
  { name: 'Jun', value: 180000 },
  { name: 'Jul', value: 170000 },
  { name: 'Aug', value: 200000 },
  { name: 'Sep', value: 250000 },
  { name: 'Oct', value: 300000 },
  { name: 'Nov', value: 400000 },
  { name: 'Dec', value: 500000 },
];

export const recognitionList = [
  { sender: "Courtney Henry", recipient: "Darrell Steward", department: "Engineering", points: 320, date: "Apr 12, 2026", occasion: "Daily Recognition", status: "Delivered" },
  { sender: "Darlene Robertson", recipient: "Jerome Bell", department: "Engineering", points: 180, date: "Mar 02, 2026", occasion: "Milestone", status: "Delivered" },
  { sender: "Kristin Watson", recipient: "Ronald Richards", department: "Engineering", points: 210, date: "Mar 02, 2026", occasion: "Promotion", status: "Delivered" },
  { sender: "Dianne Russell", recipient: "Jane Cooper", department: "Engineering", points: 180, date: "Mar 02, 2026", occasion: "Welcome", status: "Delivered" },
  { sender: "Darrell Steward", recipient: "Courtney Henry", department: "Engineering", points: 320, date: "Apr 12, 2026", occasion: "Appreciation", status: "Delivered" },
  { sender: "Leslie Alexander", recipient: "Brooklyn Simmons", department: "Engineering", points: 210, date: "Mar 02, 2026", occasion: "Welcome", status: "Delivered" },
  { sender: "Jane Cooper", recipient: "Theresa Webb", department: "Engineering", points: 210, date: "Mar 02, 2026", occasion: "Daily Recognition", status: "Delivered" },
];

export default function DashboardPage() {
  const { data: dashboardRes, isLoading } = useGetOrgDashboardQuery();
  const dashboardData = dashboardRes?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] gap-2 bg-gray-50/50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        <p className="text-sm text-gray-500 font-medium animate-pulse">Loading dashboard statistics...</p>
      </div>
    );
  }

  const overview = dashboardData?.overview || {};

  // Format monthly recognition trends data for RecognitionChart
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedTrendData = monthNames.map((name, index) => {
    const monthNum = index + 1;
    const monthData = dashboardData?.recognitionTrends?.find((item: any) => item._id === monthNum);
    return {
      name,
      value: monthData ? monthData.total : 0
    };
  });

  // Category counts and total for percentage
  const categoryData = dashboardData?.recognitionByCategory || [];
  const totalCategoryCounts = categoryData.reduce((sum: number, item: any) => sum + (item.count || 0), 0);

  // Format department performance data
  const formattedDeptData = dashboardData?.departmentPerformance?.map((item: any) => ({
    name: item.department || "N/A",
    value: item.count || 0
  })) || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <h2 className="text-[28px] font-medium mb-4">Organization Overview</h2>

      {/* ১. স্ট্যাটস কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
        <StatCard
          title="Total Recognitions"
          count={overview.recognitionsSent || 0}
          icon={<Trophy className="w-5 h-5 text-orange-500" />}
          iconBgColor="bg-[#FFAA00]/10"
        />

        <StatCard
          title="Total Employees"
          count={overview.totalEmployees || 0}
          icon={<Users className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-[#00AC5F]/10"
        />

        <StatCard
          title="Point Distributed"
          count={overview.pointsInCirculation || 0}
          icon={<Coins className="w-5 h-5 text-red-500" />}
          iconBgColor="bg-[#FF0000]/10"
        />
      </div>

      {/* ২. চার্ট এবং ক্যাটাগরি */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray shadow-sm">
          <h3 className="font-bold mb-4">Recognition Trends</h3>
          <RecognitionChart data={formattedTrendData} />
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm border-gray">
          <h3 className="font-bold mb-4">Recognition by Category</h3>
          {categoryData.length === 0 ? (
            <div className="text-sm text-gray-400 py-12 text-center font-medium">No category data.</div>
          ) : (
            categoryData.map((item: any, idx: number) => {
              const percentage = totalCategoryCounts > 0 ? Math.round((item.count / totalCategoryCounts) * 100) : 0;
              const colors = ["#6366f1", "#ec4899", "#3b82f6", "#f59e0b", "#10b981", "#8b5cf6"];
              const color = colors[idx % colors.length];
              return (
                <CategoryBar 
                  key={item.category || idx} 
                  label={item.category || "N/A"} 
                  percentage={percentage} 
                  color={color} 
                />
              );
            })
          )}
        </div>
      </div>

      <div className="mb-5">
        <RecognitionByDeptChart data={formattedDeptData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopPerformers performers={dashboardData?.topPerformers || []} />
        <RecentActivity activities={dashboardData?.recentActivities || []} />
      </div>
    </div>
  );
}