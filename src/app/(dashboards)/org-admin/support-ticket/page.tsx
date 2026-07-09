"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import TicketTable from "@/modules/org-admin/support-ticket/TicketTable";

const ticketData = [
  { id: "#TI12", category: "Billing Information", subject: "SSO redirect loop", description: "SSO redirect loop, fix urgently...", priority: "High", status: "Resolved", date: "Apr 12, 2026" },
  { id: "#TI13", category: "Billing Information", subject: "Increase monthly limit", description: "Need to increase point limit...", priority: "Urgent", status: "Pending", date: "Mar 02, 2026" },
];

export default function SupportPage() {
  const [tickets] = useState(ticketData);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Support Ticket</h1>
        <Button className="bg-gradient hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4" /> Open New Ticket
        </Button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light">Tickets History</h2>
        </div>

        <TicketTable tickets={tickets} />
      </div>
    </div>
  );
}