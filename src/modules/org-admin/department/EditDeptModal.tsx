"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditDepartmentModal({
  isOpen,
  onClose,
  departmentData,
  onSave,
}: any) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (departmentData) {
      setName(departmentData.name || "");
    }
  }, [departmentData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-light text-xl">
            Edit Department
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Department Name</label>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm border-gray-200 outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900" 
              placeholder="Enter department name"
            />
          </div>
        </div>

        <button
          onClick={() => onSave({ ...departmentData, name })}
          className="w-full mt-6 bg-gradient text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Update Information
        </button>
      </div>
    </div>
  );
}