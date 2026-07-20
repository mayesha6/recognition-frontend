"use client";

import Pagination from "@/components/common/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const StatusBadge = ({ status }: { status: string }) => {
    // আপনার ডিজাইনের সাথে মিল রেখে কালার কোড
    const styles = "bg-green-50 text-green-600 border border-green-100";
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
            {status}
        </span>
    );
};

export default function RecognitionTable({
    data = [],
    title = "Recognitions Lists",
    searchTerm = "",
    onSearchChange,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
}: any) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
                <h3 className="text-2xl font-light text-gray-900">{title}</h3>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64 border border-gray-200">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input 
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" 
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-medium">Sender</th>
                            <th className="px-6 py-4 font-medium">Recipient</th>
                            <th className="px-6 py-4 font-medium">Department</th>
                            <th className="px-6 py-4 font-medium">Points</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row: any, index: number) => {
                            const sender = row.senderName || row.sender || row.senderEmail || "N/A";
                            const recipient = row.recipientName || row.recipient || row.recipient_name || row.receiverEmail || "N/A";
                            const department = row.department || "N/A";
                            const points = row.points ?? 0;
                            const dateStr = row.date || (row.createdAt ? new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "N/A");
                            const statusStr = row.status === "SENT" ? "Delivered" : row.status || "Delivered";

                            return (
                                <tr key={row._id || index} className="hover:bg-gray-50/50 transition-colors text-sm text-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900">{sender}</td>
                                    <td className="px-6 py-4">{recipient}</td>
                                    <td className="px-6 py-4">{department}</td>
                                    <td className="px-6 py-4 font-semibold text-indigo-600">{points}</td>
                                    <td className="px-6 py-4">{dateStr}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={statusStr} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && onPageChange && (
                <div className="py-6 flex justify-end pe-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
}