"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function AddDepartmentModal({ isOpen, onClose, onSave }: any) {
    const [formData, setFormData] = useState({
        name: "", adminEmail: "", 
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-light text-xl">Create New Department</h3>
                    <button onClick={onClose} className="text-gray-400"><X size={20} /></button>
                </div>

                <div className="">

                    <label className="text-sm text-gray-500">Department Name</label>
                    <input className="w-full border rounded-lg px-3 py-2 mt-1 text-sm border-gray outline-0 focus:ring-1 focus:ring-indigo-500" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                </div>

                <div className="mt-4 space-y-4">
                    <div>
                        <label className="text-sm text-gray-500">Admin Email Address</label>
                        <input className="w-full border rounded-lg px-3 py-2 mt-1 text-sm border-gray outline-0 focus:ring-1 focus:ring-indigo-500" onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })} />
                    </div>
                    
                </div>

                <button
                    onClick={() => onSave(formData)}
                    className="w-full mt-8 bg-gradient font-normal text-[16px] text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                    Add Department
                </button>
            </div>
        </div>
    );
}