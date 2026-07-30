"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditUserModal from "../../user-management/EditUserModal";
import UserTable from "../../user-management/UserTable";
import StatCard from "@/modules/user/rewards/components/StatCard";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { ArrowLeft, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import {
  useGetDepartmentUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserBySlugQuery,
} from "@/redux/api/userApi";
import { useGetDepartmentsQuery } from "@/redux/api/departmentApi";

export default function OrganizationUsersPage() {
  const router = useRouter();
  const params = useParams();
  const orgSlug = params?.orgSlug as string;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

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

  // Fetch organization details by slug
  const { data: orgRes, isLoading: isOrgLoading } = useGetUserBySlugQuery(orgSlug, { skip: !orgSlug });
  const org = orgRes?.data;
  const orgId = org?._id || org?.id;
  const orgName = org?.name || "Organization";

  // Fetch users of this organization
  const { data: usersRes, isLoading: isUsersLoading, refetch } = useGetDepartmentUsersQuery({
    role: roleFilter === "ALL" ? undefined : roleFilter,
    organizationId: orgId,
    page: currentPage,
    limit: 10,
    searchTerm: debouncedSearch || undefined,
  }, { skip: !orgId });

  // Fetch departments of this organization for edit modal
  const { data: deptsRes } = useGetDepartmentsQuery({ organizationId: orgId }, { skip: !orgId });
  const departmentsList = deptsRes?.data || deptsRes || [];

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
      toast.success("User deleted successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to delete user");
    }
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async (data: any) => {
    if (!selectedUser) return;
    const id = selectedUser._id || selectedUser.id;
    try {
      await updateUser({
        id,
        name: data.name,
        email: data.email,
        role: data.role,
        department: data.department,
        isActive: data.status ? "ACTIVE" : "INACTIVE",
      }).unwrap();

      setIsEditModalOpen(false);
      toast.success("User updated successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to update user");
    }
  };

  const isLoading = isOrgLoading || isUsersLoading;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/super-admin/organizations")}
          className="rounded-full border-gray-200 hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </Button>
        <div>
          <h2 className="text-[28px] font-medium text-gray-900 font-bold">
            User Management - <span className="text-indigo-600">{orgName}</span>
          </h2>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
        <StatCard
          title="Total Users"
          count={meta.total || usersList.length}
          icon={<Users className="w-5 h-5 text-orange-500" />}
          iconBgColor="bg-[#FFAA00]/10"
        />
        <StatCard
          title="Active Users"
          count={activeEmployeesCount}
          icon={<Users className="w-5 h-5 text-green-500" />}
          iconBgColor="bg-[#00AC5F]/10"
        />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
        <div className="w-full sm:w-auto flex flex-wrap items-center gap-4 ml-auto">
          {/* Search Box */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64 border border-gray-200">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent"
            />
          </div>

          {/* Role Filter */}
          <div className="relative w-full sm:w-44">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none border border-gray-200 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer text-sm bg-white"
            >
              <option value="ALL">All Roles</option>
              <option value="USER">User (Employee)</option>
              <option value="DEPARTMENT_ADMIN">Department Admin</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table & Loading */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-sm text-gray-500 font-medium animate-pulse">Loading users...</p>
        </div>
      ) : usersList.length === 0 ? (
        <div className="p-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl text-sm bg-white shadow-sm">
          {searchTerm ? `No users matching "${searchTerm}"` : "No users found."}
        </div>
      ) : (
        <>
          <UserTable
            data={usersList}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p: number) => setCurrentPage(p)}
          />
        </>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          userData={selectedUser}
          onSave={handleEditSave}
          departments={departmentsList}
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
