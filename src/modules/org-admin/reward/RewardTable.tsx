"use client";
import { MoreHorizontal } from "lucide-react";

export default function RewardTable({ rewards }: any) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider">
          <tr>
            {["Reward", "Category", "Points", "Stock", "Status", "Action"].map((h) => (
              <th key={h} className="px-6 py-4 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rewards.map((item: any, i: number) => (
            <tr key={i} className="hover:bg-gray-50/50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.points}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.stock}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                  • {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-400"><MoreHorizontal size={18} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}