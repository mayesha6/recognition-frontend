"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import ActionMenu from "./ActionMenu";

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        pending: "bg-yellow-100 text-yellow-700",
        resolved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700"
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status.toLowerCase() as keyof typeof styles]}`}>
            ● {status}
        </span>
    );
};

export default function RewardClaimTable({ data }: { data: any[] }) {
    const [filter, setFilter] = useState("all");

    const filteredData = filter === "all" ? data : data.filter(item => item.status.toLowerCase() === filter);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ">

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
                <h3 className="text-2xl font-light">Claim Queue</h3>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                    </div>
                    <div className="relative inline-block">
                        <select
                            className="appearance-none border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                            <option value="rejected">Rejected</option>
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
                <table className="w-full min-w-200 text-left border-collapse">
                    <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-4 font-medium">Claim ID</th>
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Department</th>
                            <th className="px-6 py-4 font-medium">Reward</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredData.map((row: any) => (
                            <tr key={row.claimId} className="hover:bg-gray-50/50 whitespace-nowrap">
                                <td className="px-6 py-4">{row.claimId}</td>
                                <td className="px-6 py-4">{row.user}</td>
                                <td className="px-6 py-4">{row.department}</td>
                                <td className="px-6 py-4">{row.reward}</td>
                                <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                                <td className="px-6 py-4 text-center cursor-pointer">
                                    <ActionMenu
                                    onStatusChange={(status: any) => {
                                        // এখানে আপনার API কল হবে (Update Status API)
                                        console.log(`Claim ${row.claimId} status changed to:`, status);
                                    }}
                                /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}