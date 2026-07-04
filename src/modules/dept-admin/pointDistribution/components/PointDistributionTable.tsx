"use client";
import { Pencil, Trash2 } from "lucide-react"; // আইকনগুলো ইম্পোর্ট করুন

export default function PointDistributionTable({ data, onDelete, onEdit }: any) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">Department</th>
            <th className="px-6 py-4 font-medium">Point</th>
            <th className="px-6 py-4 font-medium">Distribute Date</th>
            <th className="px-6 py-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row: any) => (
            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 text-gray-900 font-[400px]">{row.name}</td>
              <td className="px-6 py-4 text-gray-900 font-[400px]">{row.email}</td>
              <td className="px-6 py-4 text-gray-600 font-[400px]">{row.department}</td>
              <td className="px-6 py-4 text-gray-600 font-[400px]">{row.point} Pts</td>
              <td className="px-6 py-4 text-gray-600 font-[400px]">{row.date}</td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-3">
                  <button onClick={() => onEdit(row)} className="text-gray-400 hover:text-indigo-600">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => onDelete(row.id)} className="text-gray-400 hover:text-red-600">
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