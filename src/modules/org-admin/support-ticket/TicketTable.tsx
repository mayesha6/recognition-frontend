"use client";
import { Badge } from "./Badge";
import { Eye, Pencil, Trash2, Loader2 } from "lucide-react";

const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

export default function TicketTable({ 
    tickets = [], 
    onDelete, 
    onView, 
    onResponse,
    isLoading = false,
    deletingId
}: any) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[700px]">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium">Ticket ID</th>
                        <th className="px-6 py-4 font-medium">Organization</th>
                        <th className="px-6 py-4 font-medium">Subject</th>
                        <th className="px-6 py-4 font-medium">Description</th>
                        <th className="px-6 py-4 font-medium">Priority</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Created Date</th>
                        <th className="px-6 py-4 font-medium text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, idx) => (
                            <tr key={idx} className="animate-pulse">
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                                <td className="px-6 py-4 text-center"><div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div></td>
                            </tr>
                        ))
                    ) : tickets.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                No support tickets found.
                            </td>
                        </tr>
                    ) : (
                        tickets.map((ticket: any) => {
                            const ticketId = ticket.ticketId || ticket.id;
                            const orgName = typeof ticket.organizationId === "object"
                                ? ticket.organizationId?.name
                                : (ticket.organization || "N/A");
                            const isDeleting = deletingId === ticketId;

                            return (
                                <tr key={ticket._id || ticketId} className="hover:bg-gray-50/50 transition-colors whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm font-medium text-indigo-600">{ticketId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{orgName}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.subject}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-[200px]" title={ticket.description}>
                                        {ticket.description}
                                    </td>
                                    <td className="px-6 py-4"><Badge>{ticket.priority || "Medium"}</Badge></td>
                                    <td className="px-6 py-4"><Badge>{ticket.status || "Open"}</Badge></td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(ticket.createdAt || ticket.date)}</td>
                                    <td className="px-6 py-4 text-gray-500 text-center">
                                        <div className="flex justify-center gap-3 items-center">
                                            {onResponse && (
                                                <button 
                                                    onClick={() => onResponse(ticket)} 
                                                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                                                    title="Respond / Update Status"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => onView(ticket)} 
                                                className="text-gray-400 hover:text-green-600 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button 
                                                disabled={isDeleting}
                                                onClick={() => onDelete(ticketId)} 
                                                className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                                                title="Delete Ticket"
                                            >
                                                {isDeleting ? <Loader2 size={18} className="animate-spin text-red-500" /> : <Trash2 size={18} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}