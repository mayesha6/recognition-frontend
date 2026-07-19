"use client";
import { Eye, Trash2, Ban, CheckCircle } from "lucide-react";

export default function OrganizationTable({ orgs, onView, onSuspend, onDelete }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium">Organization</th>
            <th className="px-6 py-4 font-medium">Plan</th>
            <th className="px-6 py-4 font-medium">Employees</th>
            <th className="px-6 py-4 font-medium">Departments</th>
            <th className="px-6 py-4 font-medium">Approval</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Renewal</th>
            <th className="px-6 py-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orgs.map((org: any) => (
            <tr key={org._id || org.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{org.name}</td>
              <td className="px-6 py-4"><span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium">{org.plan}</span></td>
              <td className="px-6 py-4 text-sm text-gray-600">{org.employees}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{org.departments}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(org.status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    org.status.toLowerCase() === 'approved' || org.status.toLowerCase() === 'active' ? 'bg-green-500' : 
                    org.status.toLowerCase() === 'rejected' || org.status.toLowerCase() === 'expired' ? 'bg-red-500' : 
                    'bg-yellow-500'
                  }`} />
                  {org.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  org.isActive === "ACTIVE" 
                    ? "bg-green-50 text-green-700 border border-green-100" 
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${org.isActive === "ACTIVE" ? "bg-green-500" : "bg-red-500"}`} />
                  {org.isActive === "ACTIVE" ? "Active" : "Suspended"}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{org.renewal}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center items-center gap-3">
                  <button onClick={() => onView(org)} className="text-gray-400 hover:text-indigo-600 transition-colors" title="View"><Eye size={18} /></button>
                  <button 
                    onClick={() => onSuspend(org._id || org.id)} 
                    className="text-gray-400 transition-colors" 
                    title={org.isActive === "ACTIVE" ? "Suspend" : "Activate"}
                  >
                    {org.isActive === "ACTIVE" ? (
                      <Ban size={18} className="hover:text-amber-600" />
                    ) : (
                      <CheckCircle size={18} className="hover:text-green-600" />
                    )}
                  </button>
                  <button onClick={() => onDelete(org._id || org.id)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={18} /></button>
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
    case 'approved':
    case 'active':
      return 'bg-green-50 text-green-700 border border-green-100';
    case 'rejected':
    case 'expired':
      return 'bg-red-50 text-red-700 border border-red-100';
    case 'pending':
    case 'trial':
      return 'bg-yellow-50 text-yellow-700 border border-yellow-100';
    default:
      return 'bg-gray-50 text-gray-600 border border-gray-100';
  }
}