"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddRewardModal({ isOpen, onClose, onSave }: any) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">Add New Reward</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Redeem Name */}
                    <div className="col-span-2">
                        <label className="text-xs text-gray-500 mb-1 block">Redeem Name</label>
                        <input className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" placeholder="Amazon Gift Card" />
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs text-gray-500 mb-1 block">Points Required</label>
                        <input className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" placeholder="2,500" />
                    </div>

                    {/* Category */}
                    {/* <div>
            <label className="text-xs text-gray-500 mb-1 block">Category</label>
            <select className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm bg-white">
              <option>Gift Card</option>
            </select>
          </div> */}

                    {/* Points Required */}


                    {/* Stock */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Stock</label>
                        <input className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" placeholder="50" />
                    </div>

                    {/* Status */}
                    {/* <div>
                        <label className="text-xs text-gray-500 mb-1 block">Status</label>
                        <select className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm bg-white">
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div> */}
                    <div className="">
                        <label className="text-xs text-gray-500 mb-1 block">Status</label>
                        <div className="relative w-full">

                            <select
                                className="text-sm w-full appearance-none border border-gray outline-none rounded-lg px-3 py-2 pr-10 bg-white"
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>

                            {/* কাস্টম অ্যারো আইকন */}
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>


                    {/* Description */}
                    <div className="col-span-2">
                        <label className="text-xs text-gray-500 mb-1 block">Description</label>
                        <textarea
                            rows={4}
                            className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm"
                            placeholder="Short description shown to redeemers..."
                        />
                    </div>
                </div>

                <Button onClick={onSave} className="w-full mt-4 bg-gradient hover:bg-indigo-700 py-6 text-white text-base">
                    Create Reward
                </Button>
            </div>
        </div>
    );
}