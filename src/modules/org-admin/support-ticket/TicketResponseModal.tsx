"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TicketResponseModal({ isOpen, onClose, ticket, onSend }: any) {
    if (!isOpen || !ticket) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">Response to {ticket.id}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>

                {/* Ticket Details Box */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm space-y-2">
                    <p><span className="text-gray-500">Ticket ID:</span> {ticket.id}</p>
                    <p><span className="text-gray-500">Organization:</span> {ticket.org}</p>
                    <p><span className="text-gray-500">Subject:</span> {ticket.subject}</p>
                </div>

                {/* Support Response Text */}
                <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Support Response:</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{ticket.description}</p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Update Status</label>
                        <div className="relative">
                            <select className="w-full appearance-none border border-gray outline-0 rounded-lg px-3 py-2 text-sm bg-white pr-8">
                                <option>Open</option>
                                <option>Pending</option>
                                <option>Resolved</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Priority</label>
                        <div className="relative">
                            <select className="w-full appearance-none border border-gray outline-0 rounded-lg px-3 py-2 text-sm bg-white pr-8">
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Response Textarea */}
                <div className="mb-6">
                    <label className="text-xs text-gray-500 mb-1 block">Response</label>
                    <textarea rows={4} className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" placeholder="Type a helpful, professional reply..." />
                </div>

                <Button onClick={onSend} className="w-full bg-gradient text-white hover:bg-indigo-700 py-6 text-base">
                    Send Response
                </Button>
            </div>
        </div>
    );
}