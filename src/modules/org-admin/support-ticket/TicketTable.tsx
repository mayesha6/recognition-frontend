"use client";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "./Badge";

export default function TicketTable({ tickets, onDelete, onView }: any) {
    return (
        <div className="overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 font-medium">Ticket ID</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium">Subject</th>
                        <th className="px-6 py-4 font-medium">Description</th>
                        <th className="px-6 py-4 font-medium">Priority</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Created Date</th>
                        <th className="px-6 py-4 font-medium text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {tickets.map((ticket: any) => (
                        <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-indigo-600">{ticket.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{ticket.category}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.subject}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-50">{ticket.description}</td>
                            <td className="px-6 py-4"><Badge>{ticket.priority}</Badge></td>
                            <td className="px-6 py-4"><Badge>{ticket.status}</Badge></td>
                            <td className="px-6 py-4 text-sm text-gray-500">{ticket.date}</td>
                            <td className="px-6 py-4 text-gray-500 text-center">
                                <div className="flex justify-center gap-3">
                                    {/* <button onClick={() => onEdit(ticket)} className="text-gray-400 hover:text-indigo-600">
                                        <Pencil size={18} />
                                    </button> */}
                                    <button onClick={() => onView(ticket)} className="text-gray-400 hover:text-green-600">
                                        <Eye size={18} />
                                    </button>
                                    <button onClick={() => onDelete(ticket.id)} className="text-gray-400 hover:text-red-600">
                                        <Trash2 size={18} />
                                    </button>
                                    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// onClick={() => onDelete(admin.id)} 

// onClick={() => onEdit(admin)}