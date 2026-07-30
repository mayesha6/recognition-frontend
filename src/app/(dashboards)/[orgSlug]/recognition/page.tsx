"use client";
import { useEffect, useState } from "react";
import { Calendar, Coins, Trophy, Users } from "lucide-react";
import { CategoryBar } from "@/modules/dept-admin/recognition/CategoryBar";
import StatCard from "@/modules/user/rewards/components/StatCard";
import RecognitionTable from "@/modules/dept-admin/recognition/RecognitionTable";
import RecognitionChart from "@/modules/dept-admin/recognition/RecognitionChart";
import RecognitionByDeptChart from "@/modules/org-admin/recognition/RecognitionByDeptChart";
import { useGetOrgDashboardQuery } from "@/redux/api/orgAdminApi";
import { useGetRecognitionHistoryQuery } from "@/redux/api/userApi";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function RecognitionAnalyticsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const { data: dashboardRes, isLoading: isDashLoading } = useGetOrgDashboardQuery();
    const { data: historyRes, isLoading: isHistoryLoading } = useGetRecognitionHistoryQuery({
        page: currentPage,
        limit: 10,
        searchTerm: debouncedSearch || undefined,
    });

    const dashboardData = dashboardRes?.data || {};
    const overview = dashboardData.overview || {};

    // Format monthly recognition trends data for RecognitionChart
    const formattedTrendData = MONTHS.map((name, index) => {
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

    const recognitionHistoryData = Array.isArray(historyRes?.data) 
        ? historyRes.data 
        : (historyRes?.data?.result || historyRes?.result || []);
    const meta = historyRes?.meta || historyRes?.data?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };
    const totalPages = meta.totalPage || Math.max(1, Math.ceil((meta.total || 0) / (meta.limit || 10)));

    return (
        <div className="bg-gray-50 min-h-screen space-y-6">
            <h2 className="text-[28px] font-medium text-gray-900 mb-4">Recognition Analytics</h2>

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

            <div className="mb-5">
                <RecognitionByDeptChart data={formattedDeptData} />
            </div>

            {/* ২. চার্ট এবং ক্যাটাগরি */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Recognition Trends</h3>
                    <RecognitionChart data={formattedTrendData} />
                </div>
                <div className="bg-white p-6 rounded-2xl border shadow-sm border-gray">
                    <h3 className="font-bold text-gray-900 mb-4">Recognition by Category</h3>
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

            {/* ৩. লিস্ট টেবিল */}
            {isHistoryLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[250px] gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="text-sm text-gray-500 font-medium animate-pulse">Loading recognitions...</p>
                </div>
            ) : (
                <RecognitionTable 
                    data={recognitionHistoryData} 
                    title="Recognitions Lists"
                    searchTerm={searchTerm}
                    onSearchChange={(val: string) => setSearchTerm(val)}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p: number) => setCurrentPage(p)}
                />
            )}
        </div>
    );
}