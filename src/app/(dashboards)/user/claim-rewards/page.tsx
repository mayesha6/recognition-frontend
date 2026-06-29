"use client";
import { useState } from "react";
import { CheckIcon, ClockIcon, Search, XIcon } from "lucide-react";
import StatCard from "@/modules/user/rewards/components/StatCard";
import StatusBadge from "@/modules/user/rewards/components/StatusBadge";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/common/pagination";
// import { useGetClaimsQuery } from "@/redux/api/claimApi"; 

export default function ClaimListPage() {
    const [currentPage, setCurrentPage] = useState(1);
    // const { data } = useGetClaimsQuery({ page: currentPage });

    // ডামি ডেটা (API থেকে আসার পর এটি সরিয়ে ফেলবেন)
    const claims = [
        { id: "CLM-2041", user: "Saifur Rahman", dept: "Acme Corp", reward: "Amazon Gift Card", points: 2500, date: "Apr 12, 2026", status: "Approved" },
        { id: "CLM-2042", user: "Saifur Rahman", dept: "Acme Corp", reward: "Amazon Gift Card", points: 2500, date: "Apr 12, 2026", status: "Rejected" },
        { id: "CLM-2043", user: "Saifur Rahman", dept: "Acme Corp", reward: "Amazon Gift Card", points: 2500, date: "Apr 12, 2026", status: "Pending" },
        // ...
    ];

    return (
        <div className="p-8 bg-gray-50/50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Claim List</h1>

            {/* স্ট্যাটাস কার্ডস */}
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

            {/* টেবিল সেকশন */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between">
                    <h2 className="text-lg font-bold">Claim Queue</h2>
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                    </div>
                </div>

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
                        {claims.map((row: any) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{row.id}</td>
                                <td className="px-6 py-4">{row.user}</td>
                                <td className="px-6 py-4">{row.dept}</td>
                                <td className="px-6 py-4">{row.reward}</td>
                                <td className="px-6 py-4">{row.points}</td>
                                <td className="px-6 py-4">{row.date}</td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={row.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
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