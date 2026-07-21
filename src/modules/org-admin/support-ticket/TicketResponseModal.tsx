"use client";
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TicketResponseModal({ isOpen, onClose, ticket, onSend, isSubmitting = false }: any) {
    const [status, setStatus] = useState("Pending");
    const [priority, setPriority] = useState("High");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (ticket) {
            setStatus(ticket.status || "Pending");
            setPriority(ticket.priority || "High");
            setMessage("");
        }
    }, [ticket]);

    if (!isOpen || !ticket) return null;

    const ticketId = ticket.ticketId || ticket.id;
    const orgName = typeof ticket.organizationId === "object" ? ticket.organizationId?.name : (ticket.organization || "N/A");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSend({ ticketId, status, priority, message });
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">Response to {ticketId}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>

                {/* Ticket Details Box */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm space-y-2">
                    <p><span className="text-gray-500">Ticket ID:</span> <span className="font-medium">{ticketId}</span></p>
                    <p><span className="text-gray-500">Organization:</span> <span className="font-medium">{orgName}</span></p>
                    <p><span className="text-gray-500">Subject:</span> <span className="font-medium">{ticket.subject}</span></p>
                </div>

                {/* Initial Description */}
                <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Original Ticket Message:</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">{ticket.description}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Update Status</label>
                            <div className="relative">
                                <select 
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full appearance-none border border-gray-300 outline-0 rounded-lg px-3 py-2 text-sm bg-white pr-8 focus:border-indigo-500 cursor-pointer"
                                >
                                    <option value="Open">Open</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Escalated">Escalated</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Closed">Closed</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Priority</label>
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
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Response Textarea */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Response Message (Optional)</label>
                        <textarea 
                            rows={4} 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 outline-0 rounded-lg px-3 py-2 text-sm focus:border-indigo-500" 
                            placeholder="Type a helpful, professional reply..." 
                        />
                    </div>

                    <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full bg-gradient text-white hover:bg-indigo-700 py-6 text-base disabled:opacity-50 mt-4"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" /> Sending Response...
                            </span>
                        ) : (
                            "Send Response"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}