"use client";
import { MoreHorizontal } from "lucide-react";

export default function EmployeeTable({ data }: { data: any[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Recognitions</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Engagement</th>
            <th className="px-6 py-4">Last Active</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((emp, i) => (
            <tr key={i} className="hover:bg-gray-50/50">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                  {emp.initials}
                </div>
                <span className="font-medium text-gray-900">{emp.name}</span>
              </td>
              <td className="px-6 py-4 text-gray-600">{emp.email}</td>
              <td className="px-6 py-4 text-gray-600">{emp.department}</td>
              <td className="px-6 py-4">{emp.recognitions}</td>
              <td className="px-6 py-4">
                <span className="bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-full text-xs font-medium">
                  ● Active
                </span>
              </td>
              <td className="px-6 py-4"><EngagementBar value={emp.engagement} /></td>
              <td className="px-6 py-4 text-gray-500">{emp.lastActive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}