"use client";
import { useEffect, useState } from "react";
import { Calendar, Coins, Trophy, Activity } from "lucide-react";
import { CategoryBar } from "@/modules/dept-admin/recognition/CategoryBar";
import StatCard from "@/modules/user/rewards/components/StatCard";
import RecognitionTable from "@/modules/dept-admin/recognition/RecognitionTable";
import RecognitionChart from "@/modules/dept-admin/recognition/RecognitionChart";
import RecognitionByDeptChart from "@/modules/org-admin/recognition/RecognitionByDeptChart";
import { useGetSuperAdminDashboardQuery } from "@/redux/api/superAdminApi";
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

    const { data: dashRes, isLoading: isDashLoading } = useGetSuperAdminDashboardQuery();
    const { data: historyRes, isLoading: isHistoryLoading } = useGetRecognitionHistoryQuery({
        page: currentPage,
        limit: 10,
        searchTerm: debouncedSearch || undefined,
    });

    const dashData = dashRes?.data || {};
    const overview = dashData.overview || {};
    const charts = dashData.charts || {};

    const rawPerformance = charts.platformPerformance || [];
    const trendData = MONTHS.map((monthName, idx) => {
        const monthNum = idx + 1;
        const found = rawPerformance.find((p: any) => p._id === monthNum);
        return {
            name: monthName,
            value: found ? found.total : 0,
        };
    });

    const recognitionHistoryData = Array.isArray(historyRes?.data) 
        ? historyRes.data 
        : (historyRes?.data?.result || historyRes?.result || []);
    const meta = historyRes?.meta || historyRes?.data?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };
    const totalPages = meta.totalPage || Math.max(1, Math.ceil((meta.total || 0) / (meta.limit || 10)));

    // Calculate total points distributed from history
    const totalPointsDistributed = recognitionHistoryData.reduce((acc: number, item: any) => acc + (item.points || 0), 0);

    return (
        <div className="bg-gray-50 min-h-screen space-y-6">
            <h2 className="text-[28px] font-medium text-gray-900 font-bold mb-4">Recognition Analytics</h2>

            {/* ১. স্ট্যাটস কার্ডস */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-5">
                <StatCard
                    title="Total Recognitions"
                    count={overview.totalRecognitions || 0}
                    icon={<Trophy className="w-5 h-5 text-orange-500" />}
                    iconBgColor="bg-[#FFAA00]/10"
                />

                <StatCard
                    title="Recognition This Month"
                    count={trendData[new Date().getMonth()]?.value || 0}
                    icon={<Calendar className="w-5 h-5 text-green-500" />}
                    iconBgColor="bg-[#00AC5F]/10"
                />

                <StatCard
                    title="Points Distributed"
                    count={totalPointsDistributed}
                    icon={<Coins className="w-5 h-5 text-purple-500" />}
                    iconBgColor="bg-purple-50"
                />

                <StatCard
                    title="Active Programs"
                    count={overview.totalOrganizations || 0}
                    icon={<Activity className="w-5 h-5 text-blue-500" />}
                    iconBgColor="bg-blue-50"
                />
            </div>

            <div className="mb-5">
                <RecognitionByDeptChart />
            </div>

            {/* ২. চার্ট এবং ক্যাটাগরি */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Recognition Trends</h3>
                    <RecognitionChart data={trendData} />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h3 className="font-bold text-gray-900 mb-4">Recognition by Category</h3>
                    <CategoryBar label="Team Collaboration" percentage={85} color="#6366f1" />
                    <CategoryBar label="Peer Recognition" percentage={72} color="#ec4899" />
                    <CategoryBar label="Innovation" percentage={65} color="#3b82f6" />
                    <CategoryBar label="Milestone" percentage={45} color="#10b981" />
                    <CategoryBar label="Appreciation" percentage={50} color="#f59e0b" />
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