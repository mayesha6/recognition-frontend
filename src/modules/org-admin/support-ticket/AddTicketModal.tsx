"use client";
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddTicketModal({ isOpen, onClose, onSave, isSubmitting = false }: any) {
    const [subject, setSubject] = useState("");
    const [priority, setPriority] = useState("High");
    const [category, setCategory] = useState("Technical Support");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isOpen) {
            setSubject("");
            setPriority("High");
            setCategory("Technical Support");
            setDescription("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !description.trim()) return;
        onSave({ subject, priority, category, description });
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-light">Need Assistance?</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Subject */}
                        <div className="col-span-1">
                            <label className="text-sm text-gray-500 mb-1 block">Subject</label>
                            <input 
                                required
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full border border-gray-300 outline-0 rounded-lg px-3 py-2 text-sm focus:border-indigo-500" 
                                placeholder="Brief summary of the issue" 
                            />
                        </div>

                        {/* Priority */}
                        <div className="col-span-1">
                            <label className="text-sm text-gray-500 mb-1 block">Priority</label>
                            <div className="relative">
                                <select 
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full appearance-none border border-gray-300 outline-0 rounded-lg px-3 py-2 text-sm bg-white pr-8 focus:border-indigo-500 cursor-pointer"
                                >
                                    <option value="High">High</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="col-span-2 sm:col-span-1">
                            <label className="text-sm text-gray-500 mb-1 block">Category</label>
                            <div className="relative">
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full appearance-none border border-gray-300 outline-0 rounded-lg px-3 py-2 text-sm bg-white pr-8 focus:border-indigo-500 cursor-pointer"
                                >
                                    <option value="Technical Support">Technical Support</option>
                                    <option value="Account">Account</option>
                                    <option value="Billing">Billing</option>
                                    <option value="General">General</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                            <label className="text-sm text-gray-500 mb-1 block">Description</label>
                            <textarea
                                required
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border border-gray-300 outline-0 rounded-lg px-3 py-2 text-sm focus:border-indigo-500"
                                placeholder="Describe your issue in detail..."
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-6 bg-gradient text-white hover:bg-indigo-700 py-6 text-base disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                            </span>
                        ) : (
                            "Submit Support Request"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}