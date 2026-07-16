"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditRewardModal({ isOpen, onClose, rewardData, onSave }: any) {
  if (!isOpen || !rewardData) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">Reward Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Redeem Name */}
          <div className="col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Redeem Name</label>
            <input 
                defaultValue={rewardData.name}
                className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" 
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Category</label>
            <div className="relative">
                <select defaultValue={rewardData.category} className="w-full appearance-none border border-gray outline-0 rounded-lg px-3 py-2 text-sm bg-white pr-8">
                    <option>Gift Card</option>
                    <option>Electronics</option>
                    <option>Fitness</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
          </div>

          {/* Points Required */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Points Required</label>
            <input defaultValue={rewardData.points} className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" />
          </div>

          {/* Stock */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Stock</label>
            <input defaultValue={rewardData.stock} className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" />
          </div>

          {/* Status */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Status</label>
            <div className="relative">
                <select defaultValue={rewardData.status} className="w-full appearance-none border border-gray outline-0 rounded-lg px-3 py-2 text-sm bg-white pr-8">
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Description</label>
            <textarea 
              rows={4} 
              defaultValue={rewardData.description}
              className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" 
            />
          </div>
        </div>

        <Button onClick={onSave} className="w-full mt-4 bg-gradient text-white hover:bg-indigo-700 py-6 text-base">
          Save Changes
        </Button>
      </div>
    </div>
  );
}