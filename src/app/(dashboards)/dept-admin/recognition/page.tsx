"use client";

import { useEffect, useState } from "react";
import { Coins, Trophy, Users } from "lucide-react";
import { CategoryBar } from "@/modules/dept-admin/recognition/CategoryBar";
import StatCard from "@/modules/user/rewards/components/StatCard";
import RecognitionTable from "@/modules/dept-admin/recognition/RecognitionTable";
import RecognitionChart from "@/modules/dept-admin/recognition/RecognitionChart";
import { useGetOrgDashboardQuery } from "@/redux/api/orgAdminApi";
import { useGetRecognitionHistoryQuery } from "@/redux/api/userApi";

export default function RecognitionAnalyticsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch dashboard overview, trends & category mixes
    const { data: dashboardRes } = useGetOrgDashboardQuery();

    // Fetch paginated recognition history
    const { data: recRes, isLoading } = useGetRecognitionHistoryQuery({
        page: currentPage,
        limit: 10,
        searchTerm: debouncedSearch || undefined,
    });

    const overview = dashboardRes?.data?.overview || {
        recognitionsSent: 0,
        pointsInCirculation: 0,
        totalEmployees: 0,
    };

    const recognitionByCategory = dashboardRes?.data?.recognitionByCategory || [];
    const totalCategoryCount = recognitionByCategory.reduce((sum: number, c: any) => sum + (c.count || 0), 0);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trendChartData = months.map((monthName, index) => {
        const trendItem = (dashboardRes?.data?.recognitionTrends || []).find((t: any) => t._id === index + 1);
        return {
            name: monthName,
            value: trendItem ? trendItem.total : 0
        };
    });

    const recognitionList = recRes?.data || [];
    const meta = recRes?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };
    const totalPages = meta.totalPage;

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <h2 className="text-[28px] font-medium mb-4 text-gray-900">Recognition Analytics</h2>

            {/* ১. স্ট্যাটস কার্ডস */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                <StatCard
                    title="Total Recognitions"
                    count={overview.recognitionsSent}
                    icon={<Trophy className="w-5 h-5 text-orange-500" />}
                    iconBgColor="bg-[#FFAA00]/10"
                />

                <StatCard
                    title="Points Distributed"
                    count={overview.pointsInCirculation}
                    icon={<Coins className="w-5 h-5 text-green-500" />}
                    iconBgColor="bg-[#00AC5F]/10"
                />

                <StatCard
                    title="Total Employees"
                    count={overview.totalEmployees}
                    icon={<Users className="w-5 h-5 text-indigo-500" />}
                    iconBgColor="bg-indigo-500/10"
                />
            </div>

            {/* ২. চার্ট এবং ক্যাটাগরি */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-gray shadow-sm">
                    <h3 className="font-bold mb-4 text-gray-900">Recognition Trends</h3>
                    <RecognitionChart data={trendChartData} />
                </div>
                <div className="bg-white p-6 rounded-2xl border shadow-sm border-gray flex flex-col">
                    <h3 className="font-bold mb-4 text-gray-900">Recognition by Category</h3>
                    {recognitionByCategory.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-sm text-gray-400 font-medium py-16">
                            No recognition category data yet.
                        </div>
                    ) : (
                        <div className="space-y-4 overflow-y-auto max-h-[250px] pr-1">
                            {recognitionByCategory.map((c: any, index: number) => {
                                const percentage = totalCategoryCount > 0 ? Math.round((c.count / totalCategoryCount) * 100) : 0;
                                const colors = ["#6366f1", "#ec4899", "#3b82f6", "#ef4444", "#f59e0b", "#10b981"];
                                return (
                                    <CategoryBar 
                                        key={c.category || index} 
                                        label={c.category || "General"} 
                                        percentage={percentage} 
                                        color={colors[index % colors.length]} 
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* ৩. লিস্ট টেবিল */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[250px] gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="text-sm text-gray-500 font-medium animate-pulse">Loading recognitions...</p>
                </div>
            ) : (
                <RecognitionTable 
                    data={recognitionList}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p: number) => setCurrentPage(p)}
                />
            )}
        </div>
    );
}