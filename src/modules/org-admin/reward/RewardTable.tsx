"use client";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export default function RewardTable({ rewards, onEdit, onDelete }: any) {
    return (
        <div className=" overflow-hidden ">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider border-b border-gray">
                    <tr>
                        {["Reward", "Category", "Points", "Stock", "Status", "Action"].map((h, index, array) => (
                            <th
                                key={h}
                                className={`px-6 py-4 font-medium ${index === array.length - 1 ? "text-center" : "text-left"}`}
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray">
                    {rewards.map((item: any, i: number) => (
                        <tr key={i} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4  font-medium text-gray-900">{item.name}</td>
                            <td className="px-6 py-4  text-gray-600">{item.description}</td>
                            <td className="px-6 py-4 text-gray-600">{item.points}</td>
                            <td className="px-6 py-4 text-gray-600">{item.stock}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                                    • {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-center">
                                <div className="flex justify-center gap-3">
                                    <button onClick={() => onEdit(item)} className="text-gray-400 hover:text-indigo-600">
                                        <Pencil size={18} />
                                    </button>

                                    <button onClick={() => onDelete(item.id)} className="text-gray-400 hover:text-red-600">
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