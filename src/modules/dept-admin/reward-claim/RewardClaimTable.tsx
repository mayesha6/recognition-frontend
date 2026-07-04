"use client";
import { useState } from "react";

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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-xl font-bold">Claim Queue</h3>
        <select className="border rounded-lg px-4 py-2" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase">
          <tr>
            <th className="px-6 py-4">Claim ID</th>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Reward</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredData.map((row: any) => (
            <tr key={row.claimId} className="hover:bg-gray-50/50">
              <td className="px-6 py-4">{row.claimId}</td>
              <td className="px-6 py-4">{row.user}</td>
              <td className="px-6 py-4">{row.department}</td>
              <td className="px-6 py-4">{row.reward}</td>
              <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}