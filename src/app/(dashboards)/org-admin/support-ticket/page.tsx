"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import TicketTable from "@/modules/org-admin/support-ticket/TicketTable";

// আপাতত ডামি ডাটা, API থেকে ডাটা আসার পর এখানে ম্যাপ হবে
const ticketData = [
  { id: "#TI12", category: "Billing Information", subject: "SSO redirect loop", description: "SSO redirect loop, fix urgently...", priority: "High", status: "Resolved", date: "Apr 12, 2026" },
  { id: "#TI13", category: "Billing Information", subject: "Increase monthly limit", description: "Need to increase point limit...", priority: "Urgent", status: "Pending", date: "Mar 02, 2026" },
];

export default function SupportPage() {
  const [tickets] = useState(ticketData);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Support Ticket</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Open New Ticket
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Tickets History</h2>
          
          {/* Search Bar */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              placeholder="Search..." 
              className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500" 
            />
          </div>
        </div>

        {/* Ticket Table */}
        <TicketTable tickets={tickets} />
      </div>
    </div>
  );
}