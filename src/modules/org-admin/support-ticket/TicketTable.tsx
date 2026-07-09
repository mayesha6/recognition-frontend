"use client";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "./Badge";

export default function TicketTable({ tickets }: any) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4 font-medium">Ticket ID</th>
            <th className="px-6 py-4 font-medium">Category</th>
            <th className="px-6 py-4 font-medium">Subject</th>
            <th className="px-6 py-4 font-medium">Description</th>
            <th className="px-6 py-4 font-medium">Priority</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Created Date</th>
            <th className="px-6 py-4 font-medium text-end">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tickets.map((ticket: any) => (
            <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-indigo-600">{ticket.id}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{ticket.category}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.subject}</td>
              <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-[200px]">{ticket.description}</td>
              <td className="px-6 py-4"><Badge>{ticket.priority}</Badge></td>
              <td className="px-6 py-4"><Badge>{ticket.status}</Badge></td>
              <td className="px-6 py-4 text-sm text-gray-500">{ticket.date}</td>
              <td className="px-6 py-4 text-end text-gray-400 cursor-pointer"><MoreHorizontal size={18} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}