"use client";
import { X, Building2, Users, Briefcase, Calendar, ShieldCheck } from "lucide-react";

export default function ViewOrganizationModal({ isOpen, onClose, org }: any) {
  if (!isOpen || !org) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium flex items-center gap-2">
            <Building2 className="text-indigo-600" />
            {org.name}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem icon={<Briefcase size={16} />} label="Industry" value={org.industry} />
            <InfoItem icon={<ShieldCheck size={16} />} label="Plan" value={org.plan} />
            <InfoItem icon={<Users size={16} />} label="Employees" value={org.employees} />
            <InfoItem icon={<Users size={16} />} label="Departments" value={org.departments} />
            <InfoItem icon={<Calendar size={16} />} label="Renewal Date" value={org.renewal} />
            <InfoItem icon={<ShieldCheck size={16} />} label="Status" value={org.status} />
          </div>
        </div>

        <button onClick={onClose} className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium transition-colors">
          Close
        </button>
      </div>
    </div>
  );
}

// ছোট হেল্পার কম্পোনেন্ট
function InfoItem({ icon, label, value }: any) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">{icon} {label}</p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}