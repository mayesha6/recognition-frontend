"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddTicketModal({ isOpen, onClose, onSave }: any) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-xl border border-gray">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-light">Need Assistance?</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Subject */}
                    <div className="col-span-1">
                        <label className="text-sm text-gray-500 mb-1 block">Subject</label>
                        <input className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" placeholder="Brief summary of the issue" />
                    </div>

                    {/* Priority */}
                    <div className="col-span-1">
                        <label className="text-sm text-gray-500 mb-1 block">Priority</label>
                        <div className="relative">
                            <select className="w-full appearance-none border border-gray outline-0 rounded-lg px-3 py-2 text-sm bg-white pr-8">
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                            {/* অ্যারো আইকন */}
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="col-span-1">
                        <label className="text-sm text-gray-500 mb-1 block">Category</label>
                        <div className="relative">
                            <select className="w-full appearance-none border border-gray outline-0 rounded-lg px-3 py-2 text-sm bg-white pr-8">
                                <option>Account</option>
                                <option>Billing</option>
                                <option>Technical</option>
                            </select>
                            {/* অ্যারো আইকন */}
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Reference */}
                    <div className="col-span-1">
                        <label className="text-sm text-gray-500 mb-1 block">Reference</label>
                        <input className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" placeholder="e.g. TCK-2041" />
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="text-sm text-gray-500 mb-1 block">Description</label>
                        <textarea
                            rows={4}
                            className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm"
                            placeholder="Type a helpful, professional reply..."
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    onClick={onSave}
                    className="w-full mt-6 bg-gradient text-white hover:bg-indigo-700 py-6 text-base"
                >
                    Submit Support Request
                </Button>
            </div>
        </div>
    );
}