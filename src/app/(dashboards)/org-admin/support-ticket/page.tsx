"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import TicketTable from "@/modules/org-admin/support-ticket/TicketTable";
import { Input } from "@/components/ui/input";
import AddTicketModal from "@/modules/org-admin/support-ticket/AddTicketModal";
import TicketResponseModal from "@/modules/org-admin/support-ticket/TicketResponseModal";
import TicketViewModal from "@/modules/org-admin/support-ticket/TicketViewModal";

const ticketData = [
    { id: "#TI12", category: "Billing Information", subject: "SSO redirect loop", description: "SSO redirect loop, fix urgently...", priority: "High", status: "Resolved", date: "Apr 12, 2026" },
    { id: "#TI13", category: "Billing Information", subject: "Increase monthly limit", description: "Need to increase point limit...", priority: "Urgent", status: "Pending", date: "Mar 02, 2026" },
];

export default function SupportPage() {
    const [tickets] = useState(ticketData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [viewingTicket, setViewingTicket] = useState(null);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this?")) {
            // await deleteEmployee(id);
        }
    };

    const handleEdit = (ticket: any) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    // const handleResponse = (ticket: any) => {
    //     setSelectedTicket(ticket);
    //     setIsModalOpen(true);
    // };

    const handleView = (ticket: any) => {
        setViewingTicket(ticket);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-[28px] font-medium">Support Ticket</h2>
                <div className="flex items-center justify-end gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                    </div>
                    <Button onClick={() => setIsTicketModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        Open New Ticket
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-light">Tickets History</h2>
                </div>

                <TicketTable
                    tickets={tickets}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onView={handleView}
                />

                <AddTicketModal
                    isOpen={isTicketModalOpen}
                    onClose={() => setIsTicketModalOpen(false)}
                    onSave={(data: any) => {
                        console.log("Saving new ticket:", data);
                        setIsTicketModalOpen(false);
                    }}
                />

                {/* <TicketResponseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    ticket={selectedTicket}
                    onSend={() => {
                        console.log("Response sent!");
                        setIsModalOpen(false);
                    }}
                /> */}

                <TicketViewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    ticket={viewingTicket}
                    onSend={() => {
                        console.log("Response sent!");
                        setIsModalOpen(false);
                    }}
                />

                {/* <EditTicketModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    userData={selectedUser}
                    type="employee"
                    onSave={(data: any) => {
                        console.log("Saving new point:", data);
                        setIsModalOpen(false);
                    }}
                /> */}
            </div>
        </div>
    );
}