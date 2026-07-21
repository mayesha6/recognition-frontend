"use client";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import ActionMenu from "./ActionMenu";

const StatusBadge = ({ status }: { status: string }) => {
    const s = (status || "").toLowerCase();
    let styles = "bg-yellow-100 text-yellow-700";
    if (s === "approved" || s === "resolved") {
        styles = "bg-green-100 text-green-700";
    } else if (s === "rejected") {
        styles = "bg-red-100 text-red-700";
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles}`}>
            ● {status}
        </span>
    );
};

interface RewardClaimTableProps {
    data: any[];
    isLoading?: boolean;
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
    statusFilter?: string;
    onStatusFilterChange?: (value: string) => void;
    onStatusChange?: (id: string, status: "Approved" | "Rejected") => void;
    updatingId?: string | null;
}

export default function RewardClaimTable({
    data = [],
    isLoading = false,
    searchTerm: externalSearch,
    onSearchChange,
    statusFilter: externalStatusFilter,
    onStatusFilterChange,
    onStatusChange,
    updatingId,
}: RewardClaimTableProps) {
    const [localFilter, setLocalFilter] = useState("all");
    const [localSearch, setLocalSearch] = useState("");

    const isControlledSearch = externalSearch !== undefined && onSearchChange !== undefined;
    const isControlledFilter = externalStatusFilter !== undefined && onStatusFilterChange !== undefined;

    const currentSearch = isControlledSearch ? externalSearch : localSearch;
    const currentFilter = isControlledFilter ? externalStatusFilter : localFilter;

    // Filter locally only if not controlled externally
    const displayData = isControlledFilter || isControlledSearch
        ? data
        : data.filter(item => {
            const matchesFilter = currentFilter === "all" || item.status?.toLowerCase() === currentFilter.toLowerCase();
            const userName = typeof item.user === "object" ? item.user?.name : item.user;
            const rewardName = typeof item.reward === "object" ? item.reward?.name : item.reward;
            const matchesSearch = !currentSearch ||
                item.claimId?.toLowerCase().includes(currentSearch.toLowerCase()) ||
                userName?.toLowerCase().includes(currentSearch.toLowerCase()) ||
                rewardName?.toLowerCase().includes(currentSearch.toLowerCase()) ||
                item.department?.toLowerCase().includes(currentSearch.toLowerCase());
            return matchesFilter && matchesSearch;
        });

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
                <h3 className="text-2xl font-light">Claim Queue</h3>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search..."
                            value={currentSearch}
                            onChange={(e) => {
                                if (isControlledSearch) {
                                    onSearchChange(e.target.value);
                                } else {
                                    setLocalSearch(e.target.value);
                                }
                            }}
                            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent"
                        />
                    </div>
                    <div className="relative inline-block">
                        <select
                            className="appearance-none border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer text-sm"
                            value={currentFilter}
                            onChange={(e) => {
                                if (isControlledFilter) {
                                    onStatusFilterChange(e.target.value);
                                } else {
                                    setLocalFilter(e.target.value);
                                }
                            }}
                        >
                            <option value="all">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[700px] text-left border-collapse">
                    <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-4 font-medium">Claim ID</th>
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Department</th>
                            <th className="px-6 py-4 font-medium">Reward</th>
                            <th className="px-6 py-4 font-medium">Points</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, idx) => (
                                <tr key={idx} className="animate-pulse">
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                    <td className="px-6 py-4 text-center"><div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div></td>
                                </tr>
                            ))
                        ) : displayData.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                    No reward claims found.
                                </td>
                            </tr>
                        ) : (
                            displayData.map((row: any) => {
                                const userName = typeof row.user === "object" ? row.user?.name : row.user;
                                const rewardName = typeof row.reward === "object" ? row.reward?.name : row.reward;
                                const id = row._id || row.claimId;

                                return (
                                    <tr key={row._id || row.claimId} className="hover:bg-gray-50/50 whitespace-nowrap text-sm">
                                        <td className="px-6 py-4 font-medium text-gray-900">{row.claimId}</td>
                                        <td className="px-6 py-4 text-gray-700">{userName || "N/A"}</td>
                                        <td className="px-6 py-4 text-gray-700">{row.department || "N/A"}</td>
                                        <td className="px-6 py-4 text-gray-700">{rewardName || "N/A"}</td>
                                        <td className="px-6 py-4 text-gray-700">{row.points ?? 0} pts</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={row.status || "Pending"} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <ActionMenu
                                                currentStatus={row.status}
                                                isUpdating={updatingId === id}
                                                onStatusChange={(status) => {
                                                    if (onStatusChange && id) {
                                                        onStatusChange(id, status);
                                                    }
                                                }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}