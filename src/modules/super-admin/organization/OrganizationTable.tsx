"use client";
import { Eye, Trash2, Ban } from "lucide-react";

export default function OrganizationTable({ orgs, onView, onSuspend, onDelete }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium">Organization</th>
            <th className="px-6 py-4 font-medium">Industry</th>
            <th className="px-6 py-4 font-medium">Plan</th>
            <th className="px-6 py-4 font-medium">Employees</th>
            <th className="px-6 py-4 font-medium">Departments</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Renewal</th>
            <th className="px-6 py-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orgs.map((org: any) => (
            <tr key={org.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{org.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{org.industry}</td>
              <td className="px-6 py-4"><span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium">{org.plan}</span></td>
              <td className="px-6 py-4 text-sm text-gray-600">{org.employees}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{org.departments}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(org.status)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {org.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{org.renewal}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center items-center gap-3">
                  <button onClick={() => onView(org)} className="text-gray-400 hover:text-indigo-600 transition-colors" title="View"><Eye size={18} /></button>
                  <button onClick={() => onSuspend(org.id)} className="text-gray-400 hover:text-amber-600 transition-colors" title="Suspend"><Ban size={18} /></button>
                  <button onClick={() => onDelete(org.id)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// স্ট্যাটাস স্টাইল হেল্পার
function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case 'active': return 'bg-emerald-50 text-emerald-600';
    case 'trial': return 'bg-amber-50 text-amber-600';
    case 'expired': return 'bg-red-50 text-red-600';
    default: return 'bg-gray-50 text-gray-600';
  }
}