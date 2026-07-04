"use client";

import Pagination from "@/components/common/pagination";
import RewardClaimTable from "@/modules/dept-admin/reward-claim/RewardClaimTable";
import StatCard from "@/modules/user/rewards/components/StatCard";
import { CheckIcon, ClockIcon, XIcon } from "lucide-react";
import { useState } from "react";


const mockClaims = [
    { claimId: "CLM-2041", user: "Saifur Rahman", department: "Engineering", reward: "Amazon Gift Card $25", status: "Resolved" },
    { claimId: "CLM-2042", user: "Rahman", department: "Sterling Health", reward: "Yoga Mat", status: "Pending" },
    { claimId: "CLM-2043", user: "Jessica Liu", department: "Tech Innovations", reward: "Wireless Charger", status: "Rejected" },
];
const claims = [
    { id: "CLM-2041", user: "Saifur Rahman", dept: "Acme Corp", reward: "Amazon Gift Card", points: 2500, date: "Apr 12, 2026", status: "Approved" },
    { id: "CLM-2042", user: "Saifur Rahman", dept: "Acme Corp", reward: "Amazon Gift Card", points: 2500, date: "Apr 12, 2026", status: "Rejected" },
    { id: "CLM-2043", user: "Saifur Rahman", dept: "Acme Corp", reward: "Amazon Gift Card", points: 2500, date: "Apr 12, 2026", status: "Pending" },
    // ...
];

export default function RewardClaimPage() {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div className="">
            <h2 className="text-[28px] font-medium mb-4">Rewards & Redeem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                <StatCard
                    title="Pending Claims"
                    count={5}
                    icon={<ClockIcon className="w-5 h-5 text-orange-500" />}
                    iconBgColor="bg-[#FFAA00]/10"
                />

                <StatCard
                    title="Approved"
                    count={3}
                    icon={<CheckIcon className="w-5 h-5 text-green-500" />}
                    iconBgColor="bg-[#00AC5F]/10"
                />

                <StatCard
                    title="Rejected"
                    count={3}
                    // trend="+11.2%"
                    icon={<XIcon className="w-5 h-5 text-red-500" />}
                    iconBgColor="bg-[#FF0000]/10"
                />
            </div>

            {/* স্ট্যাটস কার্ডস (আগের বানানো StatCard কম্পোনেন্ট এখানে বসাবেন) */}

            <RewardClaimTable data={mockClaims} />

            <div className="py-6 flex justify-end">
                <Pagination
                    currentPage={currentPage}
                    totalPages={16}
                    onPageChange={(p) => setCurrentPage(p)}
                />
            </div>
        </div>
    );
}