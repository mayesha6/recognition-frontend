"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react"; // useState এবং useEffect ইমপোর্ট করুন

export default function EditAdminModal({
  isOpen,
  onClose,
  adminData,
  onSave,
}: any) {
  // লোকাল স্টেট তৈরি করুন
  const [formData, setFormData] = useState(adminData);

  // যখনই adminData প্রপ পরিবর্তন হবে, লোকাল স্টেট আপডেট হবে
  useEffect(() => {
    setFormData(adminData);
  }, [adminData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-light text-xl">Admin Information</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Admin Name</label>
            <input 
              value={formData?.name || ""} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm border-gray outline-0 focus:ring-1 focus:ring-indigo-500" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Admin Email</label>
            <input 
              disabled 
              defaultValue={formData?.email} 
              className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 text-sm text-gray-400 cursor-not-allowed outline-none" 
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input 
              value={formData?.phone || ""} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              className="w-full border rounded-lg px-3 py-2 mt-1 text-sm border-gray outline-0 focus:ring-1 focus:ring-indigo-500" 
            />
          </div>    
        </div>

        <button
          onClick={() => onSave(formData)} 
          className="w-full mt-6 bg-gradient text-white py-3 rounded-lg font-bold hover:opacity-90"
        >
          Update Information
        </button>
      </div>
    </div>
  );
}