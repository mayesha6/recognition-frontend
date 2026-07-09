"use client";
import { X } from "lucide-react";

export default function TicketViewModal({ isOpen, onClose, ticket }: any) {
  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium">Ticket Details: {ticket.id}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div>
            <p className="text-gray-500">Ticket ID</p>
            <p className="font-medium">{ticket.id}</p>
          </div>
          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-medium">{ticket.category}</p>
          </div>
          <div>
            <p className="text-gray-500">Priority</p>
            <p className="font-medium">{ticket.priority}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-medium">{ticket.status}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-500 text-sm">Subject</p>
          <p className="font-medium text-sm mt-1">{ticket.subject}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Description</p>
          <div className="bg-gray-50 p-4 rounded-xl mt-1 text-sm text-gray-700 min-h-25">
            {ticket.description}
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-8 border border-gray-200 hover:bg-gray-50 py-3 rounded-lg text-sm font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}