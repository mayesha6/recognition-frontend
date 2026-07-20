"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditPointModal from "@/modules/dept-admin/pointDistribution/components/EditPointModal";
import AddEmployeeModal from "@/modules/dept-admin/user/AddEmployeeModal";
import EmployeeTable from "@/modules/dept-admin/user/EmployeeTable";
import StatCard from "@/modules/user/rewards/components/StatCard";
import Pagination from "@/components/common/pagination";
import { Plus, Search, Users, AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
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

  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
  const [deleteUser] = useDeleteUserMutation();

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
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Failed to delete user");
    }
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
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
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Failed to create user");
    }
  };

  const handleEditSave = async (data: any) => {
    if (!selectedUser) return;
    const id = selectedUser._id || selectedUser.id;
    try {
      await updateUser({ id, ...data }).unwrap();
      setIsEditModalOpen(false);
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Failed to update user");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[28px] font-medium text-gray-900 font-bold">User Management</h2>
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
        <div className="w-full sm:w-auto flex items-center gap-4 ml-auto">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64 border border-gray-200">
            <Search className="w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" 
            />
          </div>
          {/* <Button onClick={() => setIsAddEmployeeModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
            <Plus className="w-4 h-4 mr-1" />
            Add User
          </Button> */}
        </div>
      </div>

      {/* Table & Loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-sm text-gray-500 font-medium animate-pulse">Loading users...</p>
        </div>
      ) : (
        <>
          <EmployeeTable
            data={usersList}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p: number) => setCurrentPage(p)}
          />
        </>
      )}

      {/* Add Employee Modal */}
      {isAddEmployeeModalOpen && (
        <AddEmployeeModal 
          isOpen={isAddEmployeeModalOpen} 
          onClose={() => setIsAddEmployeeModalOpen(false)} 
          onSave={handleSaveUser}
        />
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <EditPointModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          userData={selectedUser}
          type="employee"
          onSave={handleEditSave}
        />
      )}

      {/* Custom Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-rose-600 font-semibold">
                <AlertTriangle className="w-5 h-5" />
                <span>Delete User</span>
              </div>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete user <span className="font-semibold text-gray-900">"{userToDelete?.name}"</span> ({userToDelete?.email})? This action is permanent.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}