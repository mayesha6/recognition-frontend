"use client";
import Pagination from "@/components/common/pagination";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function EmployeeTable({
    data, 
    onDelete, 
    onEdit,
    currentPage = 1,
    totalPages = 1,
    onPageChange
}: any) {
    return (
        <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-4">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Email</th>
                            <th className="px-6 py-4 font-medium">Department</th>
                            <th className="px-6 py-4 font-medium">Points</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((emp: any, i: any) => {
                            const initials = emp.initials || (emp.name ? emp.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2) : "U");
                            const isActive = emp.isActive === "ACTIVE" || emp.status === "ACTIVE" || emp.isActive === true;
                            const points = emp.points ?? emp.pointsBalance ?? emp.wallet?.pointsBalance ?? emp.wallet?.pointsAllocated ?? 0;

                            return (
                                <tr key={emp._id || emp.id || i} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                            {initials}
                                        </div>
                                        <span className="font-normal text-[14px] text-gray-900">{emp.name}</span>
                                    </td>
                                    <td className="font-normal text-[14px] px-6 py-4 text-gray-600">{emp.email}</td>
                                    <td className="font-normal text-[14px] px-6 py-4 text-gray-600">{emp.department || "N/A"}</td>
                                    <td className="font-normal text-[14px] px-6 py-4 text-gray-900 font-medium">{points}</td>
                                    <td className="font-normal text-[14px] px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                            isActive 
                                                ? "bg-green-50 text-green-600 border border-green-100" 
                                                : "bg-red-50 text-red-600 border border-red-100"
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`} />
                                            {isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-gray-500 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => onEdit(emp)} className="text-gray-400 hover:text-indigo-600" title="Edit">
                                                <Pencil size={18} />
                                            </button>
                                            <button onClick={() => onDelete(emp.id || emp._id)} className="text-gray-400 hover:text-red-600" title="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && onPageChange && (
                <div className="py-6 flex justify-end">
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