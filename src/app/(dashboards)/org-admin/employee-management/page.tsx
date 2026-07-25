"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditPointModal from "@/modules/dept-admin/pointDistribution/components/EditPointModal";
import AddEmployeeModal from "@/modules/dept-admin/user/AddEmployeeModal";
import EmployeeTable from "@/modules/dept-admin/user/EmployeeTable";
import StatCard from "@/modules/user/rewards/components/StatCard";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { Plus, Search, Users, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetDepartmentUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/api/userApi";
import { useGetDepartmentsQuery } from "@/redux/api/departmentApi";
import { useSetUserPointsMutation } from "@/redux/api/walletApi";

export default function EmployeeManagementPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

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
        role: selectedRole || undefined,
        department: selectedDept || undefined,
    });

    const { data: deptRes } = useGetDepartmentsQuery();
    const departments = deptRes?.data || [];

    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [setUserPoints] = useSetUserPointsMutation();

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
                department: data.department,
                password: data.password || "DefaultPassword123!",
            }).unwrap();

            const initialPoints = Number(data.points);
            if (initialPoints > 0) {
                await setUserPoints({
                    email: data.email,
                    points: initialPoints
                }).unwrap();
            }

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
            await updateUser({ id, name: data.name, email: data.email, department: data.department, status: data.status }).unwrap();
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

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                {/* Left: Filters */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    {/* Department Filter */}
                    <div className="relative min-w-[160px]">
                        <select
                            value={selectedDept}
                            onChange={(e) => {
                                setSelectedDept(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm outline-none focus:border-indigo-500 text-gray-700 shadow-sm cursor-pointer h-10"
                        >
                            <option value="">All Departments</option>
                            {departments.map((dept: any) => (
                                <option key={dept._id || dept.id} value={dept.name}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <ChevronDown size={16} />
                        </div>
                    </div>

                    {/* Role Filter */}
                    <div className="relative min-w-[140px]">
                        <select
                            value={selectedRole}
                            onChange={(e) => {
                                setSelectedRole(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm outline-none focus:border-indigo-500 text-gray-700 shadow-sm cursor-pointer h-10"
                        >
                            <option value="">All Roles</option>
                            <option value="DEPARTMENT_ADMIN">Dept Admin</option>
                            <option value="USER">User (Employee)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>

                {/* Right: Search & Add */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                    <div className="flex items-center bg-gray-100 rounded-xl px-3 w-full sm:w-64 border border-gray-200 h-10 shadow-sm">
                        <Search className="w-4 h-4 text-gray-400 ml-1" />
                        <Input 
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent text-gray-900" 
                        />
                    </div>
                    <Button onClick={() => setIsAddEmployeeModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap rounded-xl h-10 py-0 flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Employee
                    </Button>                   
                </div>
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
                    departments={departments}
                />
            )}

            {isModalOpen && (
                <EditPointModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    userData={selectedUser}
                    type="employee"
                    onSave={handleEditSave}
                    departments={departments}
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