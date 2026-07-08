"use client";

import Pagination from "@/components/common/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddAdminModal from "@/modules/org-admin/settings/admin/AddAdminModal";
import AdminAccessTable from "@/modules/org-admin/settings/admin/AdminAccessTable";
import EditAdminModal from "@/modules/org-admin/settings/admin/EditAdminModal";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminAccessPage() {
        const [currentPage, setCurrentPage] = useState(1);
    
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
        const [selectedAdmin, setSelectedAdmin] = useState(null);
    
        const handleDelete = async (id: string) => {
            if (confirm("Are you sure you want to delete this?")) {
                // await deleteEmployee(id);
            }
        };
    
        const handleEdit = (admin: any) => {
            setSelectedAdmin(admin);
            setIsModalOpen(true);
        };
    // ডাটা API থেকে ফেচ করার জন্য এখানে useEffect বা useQuery থাকবে
    const admins = [
        { id: 1, name: "Robert Fox", email: "dolores.chambers@example.com", phone: "(808) 555-0111", department: "Marketing" },
        { id: 2, name: "John Doe", email: "john.doe@example.com", phone: "(808) 555-0112", department: "Sales" },
        // ...
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
                <h2 className="text-2xl font-light">Department Admin Management</h2>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                    </div>
                    <Button onClick={() => setIsAddAdminModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        Add Admin
                    </Button>
                </div>
            </div>

            <AdminAccessTable
                data={admins}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />


            {/* <div className="py-6 flex justify-end">
                <Pagination
                    currentPage={currentPage}
                    totalPages={16}
                    onPageChange={(p) => setCurrentPage(p)}
                />
            </div> */}

            <AddAdminModal
                isOpen={isAddAdminModalOpen}
                onClose={() => setIsAddAdminModalOpen(false)}
                onSave={(data: any) => {
                    console.log("Saving new admin:", data);
                    setIsAddAdminModalOpen(false);
                }}
            />

            <EditAdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                adminData={selectedAdmin}
                onSave={(data: any) => {
                    console.log("Saving updated admin:", data);
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}