"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import ImageManagerModal from "./CategoryImageManagerModal";

export default function CategoryTable({ data, onDelete, onEdit }: any) {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const activeCategory = data?.find(
        (category: any) => (category._id || category.id) === selectedCategoryId
    );

    return (
        <div className="overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider border-b border-gray">
                    <tr>
                        <th className="px-6 py-4 font-medium w-1/4">Category Name</th>
                        <th className="px-6 py-4 font-medium w-1/3">Description / Context</th>
                        <th className="px-6 py-4 font-medium w-1/4">Category Images</th>
                        <th className="px-6 py-4 font-medium text-end">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((category: any) => (
                        <tr key={category._id || category.id} className="hover:bg-gray-50/50 border-b border-gray transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-600">{category.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={category.description || "No description"}>
                                {category.description || "—"}
                            </td>
                            <td className="px-6 py-4 text-sm text-indigo-600 font-medium cursor-pointer"
                                onClick={() => setSelectedCategoryId(category._id || category.id)}>
                                {category.name}'s Images ({category.images?.length || 0})
                            </td>
                            <td className="px-6 py-4 text-gray-500 text-end">
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => onEdit(category)} className="text-gray-400 hover:text-indigo-600">
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => onDelete(category._id || category.id, category.name)} className="text-gray-400 hover:text-red-600">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ImageManagerModal
                isOpen={!!selectedCategoryId}
                categoryData={activeCategory}
                onClose={() => setSelectedCategoryId(null)}
            />
        </div>
    );
}