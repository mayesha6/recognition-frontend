"use client";
import { useState } from "react";
import { CheckIcon, ClockIcon, Search, XIcon } from "lucide-react";
import StatCard from "@/modules/user/rewards/components/StatCard";
import StatusBadge from "@/modules/user/rewards/components/StatusBadge";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/common/pagination";
import { useGetMyClaimsQuery } from "@/redux/api/rewardApi";

const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

export default function ClaimListPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const { data: claimsRes, isLoading } = useGetMyClaimsQuery({ page: currentPage, limit: 10 });

    const claims = claimsRes?.data || [];
    const meta = claimsRes?.meta || {};
    const totalPages = meta?.totalPage || 1;

    // Filter claims locally by search term if user searches
    const filteredClaims = claims.filter((row: any) => {
        const rewardName = row.reward?.name || "";
        const claimId = row.claimId || "";
        const matchSearch = 
            rewardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            claimId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchSearch;
    });

    // Calculate stats dynamically from current page or fallback to 0
    const pendingCount = claims.filter((c: any) => c.status?.toUpperCase() === "PENDING").length;
    const approvedCount = claims.filter((c: any) => c.status?.toUpperCase() === "APPROVED").length;
    const rejectedCount = claims.filter((c: any) => c.status?.toUpperCase() === "REJECTED").length;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium">Loading claims...</p>
            </div>
        );
    }

    return (
        <div className=" bg-gray-50/50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Claim List</h1>

            {/* স্ট্যাটাস কার্ডস */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                <StatCard
                    title="Pending Claims"
                    count={pendingCount}
                    icon={<ClockIcon className="w-5 h-5 text-orange-500" />}
                    iconBgColor="bg-[#FFAA00]/10"
                />

                <StatCard
                    title="Approved"
                    count={approvedCount}
                    icon={<CheckIcon className="w-5 h-5 text-green-500" />}
                    iconBgColor="bg-[#00AC5F]/10"
                />

                <StatCard
                    title="Rejected"
                    count={rejectedCount}
                    icon={<XIcon className="w-5 h-5 text-red-500" />}
                    iconBgColor="bg-[#FF0000]/10"
                />
            </div>

            {/* টেবিল সেকশন */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <h2 className="text-lg font-bold">Claim Queue</h2>
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input 
                            placeholder="Search reward or ID..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" 
                        />
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    {filteredClaims.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No claims found.</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Claim ID</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Department</th>
                                    <th className="px-6 py-4">Reward</th>
                                    <th className="px-6 py-4">Points</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredClaims.map((row: any) => (
                                    <tr key={row._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{row.claimId}</td>
                                        <td className="px-6 py-4">{row.user?.name || "N/A"}</td>
                                        <td className="px-6 py-4">{row.department || "N/A"}</td>
                                        <td className="px-6 py-4">{row.reward?.name || "N/A"}</td>
                                        <td className="px-6 py-4">{row.points}</td>
                                        <td className="px-6 py-4">{formatDate(row.createdAt)}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={row.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {totalPages > 1 && (
                <div className="py-6 flex justify-end">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(p) => setCurrentPage(p)}
                    />
                </div>
            )}
        </div>
    );
}