"use client";

import { Building2, CreditCard, DollarSign, Network, Trophy, Users, Plus, MessageSquare, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StatCard from "@/modules/user/rewards/components/StatCard";
import RecognitionChart from "@/modules/dept-admin/recognition/RecognitionChart";
import PlatformPerformanceChart from "./components/PlatformPerformanceChart";
import PlanDistributionChart from "./components/PlanDistributionChart";
import RecentSystemActivity from "./components/RecentSystemActivity";
import { useGetSuperAdminDashboardQuery } from "@/redux/api/superAdminApi";

export default function DashboardPage() {
  const { data: dashboardRes, isLoading } = useGetSuperAdminDashboardQuery();
  const dashboardData = dashboardRes?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] gap-2 bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        <p className="text-sm text-gray-500 font-medium animate-pulse">Loading dashboard statistics...</p>
      </div>
    );
  }

  const overview = dashboardData?.overview || {};
  const charts = dashboardData?.charts || {};
  const recentActivities = dashboardData?.recentActivities || [];
  const organizations = dashboardData?.organizations || [];
  const departments = dashboardData?.departments || [];
  const users = dashboardData?.users || [];

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
    <div className="bg-gray-50 min-h-screen pb-12">
      <h2 className="text-[28px] font-bold text-gray-900 mb-6">Platform Overview</h2>

      {/* ১. স্ট্যাটস কার্ডস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <StatCard
          title="Total Organizations"
          count={overview.totalOrganizations ?? 0}
          icon={<Building2 className="w-5 h-5 text-indigo-500" />}
          iconBgColor="bg-indigo-50"
        />
        <StatCard
          title="Total Departments"
          count={overview.totalDepartments ?? 0}
          icon={<Network className="w-5 h-5 text-blue-500" />}
          iconBgColor="bg-blue-50"
        />
        <StatCard
          title="Active Users"
          count={overview.activeUsers ?? 0}
          icon={<Users className="w-5 h-5 text-emerald-500" />}
          iconBgColor="bg-emerald-50"
        />
        <StatCard
          title="Active Subscriptions"
          count={overview.activeSubscriptions ?? 0}
          icon={<CreditCard className="w-5 h-5 text-orange-500" />}
          iconBgColor="bg-orange-50"
        />
        <StatCard
          title="Monthly Revenue"
          count={overview.monthlyRevenue != null ? `$${overview.monthlyRevenue}` : "$0"}
          icon={<DollarSign className="w-5 h-5 text-teal-500" />}
          iconBgColor="bg-teal-50"
        />
        <StatCard
          title="Total Recognitions"
          count={overview.totalRecognitions ?? 0}
          icon={<Trophy className="w-5 h-5 text-amber-500" />}
          iconBgColor="bg-amber-50"
        />
      </div>

      {/* ২. পারফরম্যান্স এবং কুইক অ্যাকশনস */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <PlatformPerformanceChart performanceData={charts.platformPerformance || []} />
        </div>
        
        {/* Quick Actions Panel */}
        <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm h-88 flex flex-col justify-between">
          <h3 className="font-bold text-gray-900 mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4 flex-1 mb-4">
            <Link href="/super-admin/organizations" className="p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors border border-gray-100 rounded-xl flex flex-col justify-between text-left">
              <Building2 className="w-5 h-5 text-[#6366F1]" />
              <span className="text-xs font-semibold text-gray-700 mt-2">Organization</span>
            </Link>
            <Link href="/super-admin/subscription" className="p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors border border-gray-100 rounded-xl flex flex-col justify-between text-left">
              <CreditCard className="w-5 h-5 text-[#6366F1]" />
              <span className="text-xs font-semibold text-gray-700 mt-2">Create Subscription Plan</span>
            </Link>
            <Link href="/super-admin/revenue" className="p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors border border-gray-100 rounded-xl flex flex-col justify-between text-left">
              <Network className="w-5 h-5 text-[#6366F1]" />
              <span className="text-xs font-semibold text-gray-700 mt-2">Review Report</span>
            </Link>
            <Link href="/super-admin/support-ticket" className="p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors border border-gray-100 rounded-xl flex flex-col justify-between text-left">
              <MessageSquare className="w-5 h-5 text-[#6366F1]" />
              <span className="text-xs font-semibold text-gray-700 mt-2">Review Support Tickets</span>
            </Link>
          </div>
          <button className="w-full bg-[#6366F1] hover:bg-[#5254de] text-white py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm">
            <Plus className="w-4 h-4" /> New Quick Action
          </button>
        </div>
      </div>

      {/* ৩. অল অর্গানাইজেশনস এবং ডিপার্টমেন্টস */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* All Organizations Table */}
        <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">All Organizations</h3>
            <Link href="/super-admin/organizations" className="text-xs text-gray-400 font-semibold hover:text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg">
              See All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 font-semibold border-b border-gray-100 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Organization</th>
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Employees</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
                {organizations.map((org: any, idx: number) => (
                  <tr key={org._id || idx}>
                    <td className="py-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 overflow-hidden shrink-0 relative">
                        {org.picture ? <Image src={org.picture} alt={org.name} fill sizes="24px" className="object-cover" /> : org.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{org.name}</p>
                      </div>
                    </td>
                    <td className="py-3 text-gray-500">System</td>
                    <td className="py-3 text-gray-900">{org.employeesCount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        org.plan === "Enterprise" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                        org.plan === "Premium" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                        "bg-slate-50 text-slate-600 border border-gray-100"
                      }`}>
                        {org.plan}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        org.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                        org.status === "Trial" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                        "bg-rose-50 text-rose-600 border border-rose-100"
                      }`}>
                        {org.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {organizations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400 font-medium">No organizations found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Departments Table */}
        <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">All Departments</h3>
            <Link href="/super-admin/department-management" className="text-xs text-gray-400 font-semibold hover:text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg">
              See All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-400 font-semibold border-b border-gray-100 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Department</th>
                  <th className="pb-3 font-medium">Employees</th>
                  <th className="pb-3 font-medium">Engagement</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
                {departments.map((dept: any, idx: number) => {
                  const engagementVal = idx === 0 ? 92 : idx === 1 ? 50 : 20;
                  return (
                    <tr key={idx}>
                      <td className="py-3 text-gray-900">{dept.name}</td>
                      <td className="py-3 text-gray-900">{dept.employeesCount}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-[#6366F1] h-full" style={{ width: `${engagementVal}%` }} />
                          </div>
                          <span className="text-[10px] text-gray-500">{engagementVal}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100">
                          Active
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {departments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-400 font-medium">No departments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ৪. ইউজার ম্যানেজমেন্ট */}
      <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">User Management</h3>
          <Link href="/super-admin/user-management" className="text-xs text-gray-400 font-semibold hover:text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg">
            See All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-400 font-semibold border-b border-gray-100 uppercase tracking-wider">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Department</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Last Active</th>
                <th className="pb-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-semibold text-gray-700">
              {users.map((usr: any, idx: number) => {
                const getRoleBadge = (role: string) => {
                  if (role === "SUPER_ADMIN") return "bg-purple-50 text-purple-600 border border-purple-100";
                  if (role === "ORGANIZATION_ADMIN") return "bg-blue-50 text-blue-600 border border-blue-100";
                  if (role === "DEPARTMENT_ADMIN") return "bg-indigo-50 text-indigo-600 border border-indigo-100";
                  return "bg-slate-50 text-slate-600 border border-gray-100";
                };

                const formatRoleName = (role: string) => {
                  if (role === "SUPER_ADMIN") return "Super Admin";
                  if (role === "ORGANIZATION_ADMIN") return "Org Admin";
                  if (role === "DEPARTMENT_ADMIN") return "Dept Admin";
                  return "User";
                };

                const formatLastActive = (dateString?: string) => {
                  if (!dateString) return `${idx + 2} min ago`;
                  const date = new Date(dateString);
                  const now = new Date();
                  const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
                  if (diffMinutes < 1) return "Just now";
                  if (diffMinutes < 60) return `${diffMinutes} min ago`;
                  return date.toLocaleDateString();
                };

                return (
                  <tr key={usr._id || idx}>
                    <td className="py-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600 overflow-hidden shrink-0 border border-gray-100 relative">
                        {usr.picture ? <Image src={usr.picture} alt={usr.name} fill sizes="32px" className="object-cover" /> : usr.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{usr.name}</p>
                      </div>
                    </td>
                    <td className="py-3 text-gray-500">{usr.email}</td>
                    <td className="py-3 text-gray-900">{usr.department || "N/A"}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] ${getRoleBadge(usr.role)}`}>
                        {formatRoleName(usr.role)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] ${
                        usr.isActive === "ACTIVE" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                      }`}>
                        {usr.isActive === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{formatLastActive(usr.createdAt)}</td>
                    <td className="py-3 text-center">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-400 font-medium">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ৫. রেভিনিউ চার্ট, প্ল্যান ডিস্ট্রিবিউশন এবং অ্যাক্টিভিটি */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm h-88 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Revenue Growth</h3>
            <Link href="/super-admin/revenue" className="text-xs text-gray-400 font-semibold hover:text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg">
              View
            </Link>
          </div>
          <div className="h-64 mt-4 w-full">
            <RecognitionChart data={formattedRevenueGrowth} />
          </div>
        </div>
        
        <PlanDistributionChart distributionData={charts.planDistribution || []} />
        
        <RecentSystemActivity activities={recentActivities} />
      </div>
    </div>
  );
}