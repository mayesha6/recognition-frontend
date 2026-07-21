"use client";
import { X } from "lucide-react";

export default function TicketViewModal({ isOpen, onClose, ticket }: any) {
  if (!isOpen || !ticket) return null;

  const ticketId = ticket.ticketId || ticket.id;
  const responses = ticket.responses || [];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">Ticket Details: {ticketId}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div>
            <p className="text-gray-500">Ticket ID</p>
            <p className="font-medium text-indigo-600">{ticketId}</p>
          </div>
          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-medium">{ticket.category || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500">Priority</p>
            <p className="font-medium">{ticket.priority || "Medium"}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-medium">{ticket.status || "Open"}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-500 text-sm">Subject</p>
          <p className="font-medium text-sm mt-1">{ticket.subject}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Description</p>
          <div className="bg-gray-50 p-4 rounded-xl mt-1 text-sm text-gray-700 min-h-[80px]">
            {ticket.description}
          </div>
        </div>

        {responses.length > 0 && (
          <div className="mt-6">
            <p className="text-gray-700 text-sm font-medium mb-3">Responses ({responses.length})</p>
            <div className="space-y-3">
              {responses.map((resp: any, idx: number) => (
                <div key={idx} className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl text-sm">
                  <p className="text-gray-800">{resp.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {resp.createdAt ? new Date(resp.createdAt).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recently"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="w-full mt-8 border border-gray-200 hover:bg-gray-50 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}