"use client";
import { X } from "lucide-react";

export default function EditDepartmentModal({
  isOpen,
  onClose,
  departmentData,
  onSave,
}: any) {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 backdrop-blur-[1.5px] bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-light text-xl">
            Department Information
          </h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Department Name</label>
            <input value={departmentData?.name} className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 border-gray text-gray-400 text-[14px]" />
          </div>
          <div>
            <label className="text-sm text-gray-500">Admin Email</label>
            <input value={departmentData?.adminEmail} className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 border-gray text-gray-400 text-[14px]" />
          </div>     
        </div>

        <button
          onClick={() => onSave({ ...departmentData })}
          className="w-full mt-6 bg-gradient text-white py-3 rounded-lg font-bold hover:opacity-90"
        >
          Update Information
        </button>
      </div>
    </div>
  );
}