"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditPointModal from "@/modules/dept-admin/pointDistribution/components/EditPointModal";
import AddEmployeeModal from "@/modules/dept-admin/user/AddEmployeeModal";
import EmployeeTable from "@/modules/dept-admin/user/EmployeeTable";
import StatCard from "@/modules/user/rewards/components/StatCard";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { Plus, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetDepartmentUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/api/userApi";

export default function EmployeeManagementPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    // States for delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);

    // Debounce search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const { data: usersRes, isLoading, refetch } = useGetDepartmentUsersQuery({
        page: currentPage,
        limit: 10,
        searchTerm: debouncedSearch || undefined,
    });

    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    const usersList = usersRes?.data || [];
    const meta = usersRes?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };
    const totalPages = meta.totalPage;

    const activeEmployeesCount = usersList.filter(
        (u: any) => u.isActive === "ACTIVE" || u.status === "ACTIVE" || u.isActive === true
    ).length;

    const handleDeleteClick = (id: string) => {
        const usr = usersList.find((u: any) => (u._id || u.id) === id);
        if (!usr) return;
        setUserToDelete(usr);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;
        const id = userToDelete._id || userToDelete.id;
        try {
            await deleteUser(id).unwrap();
            setIsDeleteModalOpen(false);
            toast.success("Employee deleted successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to delete user");
        }
    };

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = async (data: any) => {
        try {
            const name = `${data.firstName || ""} ${data.lastName || ""}`.trim() || data.name;
            await createUser({
                name,
                email: data.email,
                department: data.department || "Engineering",
                password: "DefaultPassword123!",
            }).unwrap();
            setIsAddEmployeeModalOpen(false);
            toast.success("Employee created successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to create user");
        }
    };

    const handleEditSave = async (data: any) => {
        if (!selectedUser) return;
        const id = selectedUser._id || selectedUser.id;
        try {
            await updateUser({ id, ...data }).unwrap();
            setIsModalOpen(false);
            toast.success("Employee details updated successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to update user");
        }
    };

    return (
        <div className="">
            <div className="mb-6">
                <h2 className="text-[28px] font-medium">Employee Management</h2>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                <StatCard
                    title="Total Employees"
                    count={meta.total || usersList.length}
                    icon={<Users className="w-5 h-5 text-orange-500" />}
                    iconBgColor="bg-[#FFAA00]/10"
                />
                <StatCard
                    title="Active Employees"
                    count={activeEmployeesCount}
                    icon={<Users className="w-5 h-5 text-green-500" />}
                    iconBgColor="bg-[#00AC5F]/10"
                />
            </div>

            {/* Search & Add Button */}
            <div className="flex items-center justify-end mb-4 gap-4 w-full sm:w-auto">
                <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input 
                        placeholder="Search..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" 
                    />
                </div>
                <Button onClick={() => setIsAddEmployeeModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                    <Plus className="w-4 h-4" />
                    Add Employee
                </Button>                   
            </div>

            {/* Tables & Modals */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="text-sm text-gray-500 font-medium animate-pulse">Loading employees...</p>
                </div>
            ) : (
                <EmployeeTable
                    data={usersList}
                    onDelete={handleDeleteClick}
                    onEdit={handleEdit}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p: number) => setCurrentPage(p)}
                />
            )}

            {/* Modals */}
            {isAddEmployeeModalOpen && (
                <AddEmployeeModal 
                    isOpen={isAddEmployeeModalOpen} 
                    onClose={() => setIsAddEmployeeModalOpen(false)} 
                    onSave={handleSaveUser}
                />
            )}

            {isModalOpen && (
                <EditPointModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    userData={selectedUser}
                    type="employee"
                    onSave={handleEditSave}
                />
            )}

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete User"
                itemName={userToDelete?.name}
                description={`Are you sure you want to delete user "${userToDelete?.name}" (${userToDelete?.email})? This action is permanent and cannot be undone.`}
                isLoading={isDeleting}
            />
        </div>
    );
}