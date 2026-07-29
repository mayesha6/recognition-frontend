"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import TicketTable from "@/modules/org-admin/support-ticket/TicketTable";
import AddTicketModal from "@/modules/org-admin/support-ticket/AddTicketModal";
import TicketResponseModal from "@/modules/org-admin/support-ticket/TicketResponseModal";
import TicketViewModal from "@/modules/org-admin/support-ticket/TicketViewModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import Pagination from "@/components/common/pagination";
import {
  useGetTicketsQuery,
  useCreateTicketMutation,
  useRespondToTicketMutation,
  useDeleteTicketMutation,
} from "@/redux/api/supportApi";
import { toast } from "sonner";
import { formatErrorMessage } from "@/utils/formatError";

export default function SupportPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const queryParams: Record<string, any> = {
        page: currentPage,
        limit: 10,
    };
    if (searchTerm.trim()) queryParams.search = searchTerm.trim();

    const { data: ticketsRes, isLoading, isFetching } = useGetTicketsQuery(queryParams);
    const [createTicket, { isLoading: isCreating }] = useCreateTicketMutation();
    const [respondToTicket, { isLoading: isResponding }] = useRespondToTicketMutation();
    const [deleteTicket, { isLoading: isDeleting }] = useDeleteTicketMutation();

    const tickets = ticketsRes?.data || [];
    const meta = ticketsRes?.meta || {};
    const totalPages = meta?.totalPage || 1;

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleCreateTicket = async (data: { category: string; subject: string; description: string; priority?: string }) => {
        try {
            await createTicket(data).unwrap();
            toast.success("Support ticket created successfully!");
            setIsAddModalOpen(false);
        } catch (error: any) {
            toast.error(formatErrorMessage(error, "Failed to create support ticket"));
        }
    };

    const handleRespondTicket = async (data: { ticketId: string; message?: string; status?: string; priority?: string }) => {
        try {
            await respondToTicket(data).unwrap();
            toast.success("Ticket updated successfully!");
            setIsResponseModalOpen(false);
        } catch (error: any) {
            toast.error(formatErrorMessage(error, "Failed to respond to ticket"));
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeletingId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingId) return;
        try {
            await deleteTicket(deletingId).unwrap();
            toast.success("Ticket deleted successfully!");
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            toast.error(formatErrorMessage(error, "Failed to delete ticket"));
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-[28px] font-medium">Support Ticket</h2>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input 
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="border-none bg-transparent focus-visible:ring-0 w-full" 
                        />
                    </div>
                    <Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient text-white whitespace-nowrap">
                        <Plus className="w-4 h-4 mr-2" /> Open New Ticket
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-light mb-6">Tickets History</h2>
                <TicketTable
                    tickets={tickets}
                    isLoading={isLoading || isFetching}
                    deletingId={deletingId}
                    onDelete={handleDeleteClick}
                    onView={(t: any) => { setSelectedTicket(t); setIsViewModalOpen(true); }}
                    onResponse={(t: any) => { setSelectedTicket(t); setIsResponseModalOpen(true); }}
                />

                {totalPages > 1 && (
                    <div className="py-6 flex justify-end">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(p) => setCurrentPage(p)}
                        />
                    </div>
                )}
            </div>

            <AddTicketModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleCreateTicket}
                isSubmitting={isCreating}
            />
            
            <TicketResponseModal 
                isOpen={isResponseModalOpen} 
                onClose={() => setIsResponseModalOpen(false)} 
                ticket={selectedTicket} 
                onSend={handleRespondTicket}
                isSubmitting={isResponding}
            />

            <TicketViewModal 
                isOpen={isViewModalOpen} 
                onClose={() => setIsViewModalOpen(false)} 
                ticket={selectedTicket} 
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDeletingId(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Delete Support Ticket"
                itemName={deletingId || undefined}
                description="Are you sure you want to delete this ticket? This action is permanent and cannot be undone."
                isLoading={isDeleting}
            />
        </div>
    );
}