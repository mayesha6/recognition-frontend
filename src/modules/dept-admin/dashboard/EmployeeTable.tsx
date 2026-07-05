"use client";
import { Pencil, Trash2 } from "lucide-react";

export default function EmployeeTable({data, onDelete, onEdit }: any) {
    return (
        <div>
            <div className="overflow-hidden">
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
                        {data.map((emp:any, i:any) => (
                            <tr key={i} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                                        {emp.initials}
                                    </div>
                                    <span className="font-normal text-[14px] text-gray-900">{emp.name}</span>
                                </td>
                                <td className="font-normal text-[14px] px-6 py-4 text-gray-600">{emp.email}</td>
                                <td className="font-normal text-[14px] px-6 py-4 text-gray-600">{emp.department}</td>
                                <td className="font-normal text-[14px] px-6 py-4">{emp.points}</td>
                                <td className="font-normal text-[14px] px-6 py-4">
                                    <span className="bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-full text-xs font-medium">
                                        ● Active
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-gray-500 text-center">
                                    <div className="flex justify-center gap-3">
                                        <button onClick={() => onEdit(emp)} className="text-gray-400 hover:text-indigo-600">
                                            <Pencil size={18} />
                                        </button>
                                        <button onClick={() => onDelete(emp.id)} className="text-gray-400 hover:text-red-600">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}