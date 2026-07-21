"use client";

import { useState } from "react";
import Pagination from "@/components/common/pagination";
import RewardClaimTable from "@/modules/dept-admin/reward-claim/RewardClaimTable";
import StatCard from "@/modules/user/rewards/components/StatCard";
import { CheckIcon, ClockIcon, XIcon } from "lucide-react";
import { useGetMyClaimsQuery, useUpdateClaimStatusMutation } from "@/redux/api/rewardApi";
import { toast } from "sonner";
import { formatErrorMessage } from "@/utils/formatError";

export default function RewardClaimPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const queryParams: Record<string, any> = {
        page: currentPage,
        limit: 10,
    };
    if (statusFilter !== "all") queryParams.status = statusFilter;
    if (searchTerm.trim()) queryParams.search = searchTerm.trim();

    const { data: claimsRes, isLoading, isFetching } = useGetMyClaimsQuery(queryParams);
    const [updateClaimStatus] = useUpdateClaimStatusMutation();

    const claims = claimsRes?.data || [];
    const meta = claimsRes?.meta || {};
    const totalPages = meta?.totalPage || 1;

    const pendingCount = meta?.pendingCount ?? claims.filter((c: any) => c.status?.toLowerCase() === "pending").length;
    const approvedCount = meta?.approvedCount ?? claims.filter((c: any) => c.status?.toLowerCase() === "approved").length;
    const rejectedCount = meta?.rejectedCount ?? claims.filter((c: any) => c.status?.toLowerCase() === "rejected").length;

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handleStatusChange = async (id: string, newStatus: "Approved" | "Rejected") => {
        try {
            setUpdatingId(id);
            await updateClaimStatus({ id, status: newStatus }).unwrap();
            toast.success(`Claim successfully ${newStatus.toLowerCase()}!`);
        } catch (error: any) {
            toast.error(formatErrorMessage(error, `Failed to update claim status to ${newStatus}`));
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div>
            <h2 className="text-[28px] font-medium mb-4">Rewards & Redeem</h2>
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

            <RewardClaimTable 
                data={claims} 
                isLoading={isLoading || isFetching}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                statusFilter={statusFilter}
                onStatusFilterChange={handleStatusFilterChange}
                onStatusChange={handleStatusChange}
                updatingId={updatingId}
            />

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