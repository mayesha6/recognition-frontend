"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function ToneTable({ data, onDelete, onEdit }: any) {
    return (
        <div className=" overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider border-b border-gray">
                    <tr>
                        <th className="px-6 py-4 font-medium">Name</th>
                        <th className="px-6 py-4 font-medium text-end">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((tone: any) => (
                        <tr key={tone._id || tone.id} className="hover:bg-gray-50/50 border-b border-gray transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-600">{tone.name}</td>
                            <td className="px-6 py-4 text-gray-500 text-end">
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => onEdit(tone)} className="text-gray-400 hover:text-indigo-600">
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => onDelete(tone._id || tone.id, tone.name)} className="text-gray-400 hover:text-red-600">
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