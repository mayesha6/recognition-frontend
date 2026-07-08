"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function AdminAccessTable({ data, onDelete, onEdit }: any) {
    return (
        <div className=" overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider border-b border-gray">
                    <tr>
                        <th className="px-6 py-4 font-medium">SL</th>
                        <th className="px-6 py-4 font-medium">Name</th>
                        <th className="px-6 py-4 font-medium">Email</th>
                        <th className="px-6 py-4 font-medium">Phone</th>
                        <th className="px-6 py-4 font-medium">Assigned Department</th>
                        <th className="px-6 py-4 font-medium text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((admin: any, index: number) => (
                        <tr key={admin.id} className="hover:bg-gray-50/50 border-b border-gray transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{admin.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{admin.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{admin.phone}</td>
                            <td className="px-6 py-4 text-sm">{admin.department}</td>
                            <td className="px-6 py-4 text-gray-500 text-center">
                                <div className="flex justify-center gap-3">
                                    <button onClick={() => onEdit(admin)} className="text-gray-400 hover:text-indigo-600">
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => onDelete(admin.id)} className="text-gray-400 hover:text-red-600">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}