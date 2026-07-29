"use client";

import Pagination from "@/components/common/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddAdminModal from "@/modules/org-admin/settings/admin/AddAdminModal";
import AdminAccessTable from "@/modules/org-admin/settings/admin/AdminAccessTable";
import EditAdminModal from "@/modules/org-admin/settings/admin/EditAdminModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { Search, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import {
  useGetDepartmentUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/api/userApi";
import { toast } from "sonner";

export default function AdminAccessPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    // Debounce search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch department admins
    const { data: adminsRes, isLoading, refetch } = useGetDepartmentUsersQuery({
        role: "DEPARTMENT_ADMIN",
        page: currentPage,
        limit: 10,
        searchTerm: debouncedSearch || undefined,
    });

    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const adminsList = adminsRes?.data || [];
    const meta = adminsRes?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };
    const totalPages = meta.totalPage;

    const handleDelete = (admin: any) => {
        setSelectedAdmin(admin);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        const id = (selectedAdmin as any)?._id || (selectedAdmin as any)?.id;
        if (!id) return;
        try {
            await deleteUser(id).unwrap();
            toast.success("Department admin deleted successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to delete admin");
        } finally {
            setIsDeleteModalOpen(false);
            setSelectedAdmin(null);
        }
    };

    const handleEdit = (admin: any) => {
        setSelectedAdmin(admin);
        setIsModalOpen(true);
    };

    const handleCreateAdmin = async (data: any) => {
        try {
            await createUser({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password || "DefaultPassword123!",
                role: "DEPARTMENT_ADMIN",
            }).unwrap();
            setIsAddAdminModalOpen(false);
            toast.success("Department admin created successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to create admin");
        }
    };

    const handleEditSave = async (data: any) => {
        const id = data._id || data.id;
        try {
            await updateUser({
                id,
                name: data.name,
                phone: data.phone,
            }).unwrap();
            setIsModalOpen(false);
            toast.success("Department admin updated successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to update admin");
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
                <h2 className="text-2xl font-light text-gray-900">Department Admin Management</h2>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input 
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent text-gray-900" 
                        />
                    </div>
                    <Button onClick={() => setIsAddAdminModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        Add Admin
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[250px] gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="text-sm text-gray-500 font-medium animate-pulse">Loading admins...</p>
                </div>
            ) : (
                <AdminAccessTable
                    data={adminsList}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            )}

            {totalPages > 1 && (
                <div className="py-6 flex justify-end">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(p) => setCurrentPage(p)}
                    />
                </div>
            )}

            <AddAdminModal
                isOpen={isAddAdminModalOpen}
                onClose={() => setIsAddAdminModalOpen(false)}
                onSave={handleCreateAdmin}
            />

            <EditAdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                adminData={selectedAdmin}
                onSave={handleEditSave}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedAdmin(null);
                }}
                onConfirm={handleConfirmDelete}
                itemName={(selectedAdmin as any)?.name}
                title="Delete Department Admin"
            />
        </div>
    );
}