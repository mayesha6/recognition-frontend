"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, X, AlertTriangle } from "lucide-react";
import DepartmentTable from "@/modules/org-admin/department/DepartmentTable";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/common/pagination";
import AddDepartmentModal from "@/modules/org-admin/department/AddDeptModal";
import EditDepartmentModal from "@/modules/org-admin/department/EditDeptModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "@/redux/api/departmentApi";

export default function DepartmentManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  // States for custom delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<any>(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: deptsRes, isLoading, refetch } = useGetDepartmentsQuery();
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment, { isLoading: isDeleting }] = useDeleteDepartmentMutation();

  const rawDepartments = deptsRes?.data || deptsRes || []; // handle data wrapper

  // Filter departments locally based on search
  const filteredDepartments = Array.isArray(rawDepartments) 
    ? rawDepartments.filter((dept: any) =>
        dept.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : [];

  // Client-side pagination
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredDepartments.length / itemsPerPage));
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteClick = (id: string) => {
    const dept = rawDepartments.find((d: any) => (d.id || d._id) === id);
    if (!dept) return;
    setDepartmentToDelete(dept);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!departmentToDelete) return;
    const targetId = departmentToDelete.id || departmentToDelete._id;
    try {
      await deleteDepartment(targetId).unwrap();
      setIsDeleteModalOpen(false);
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Failed to delete department");
    }
  };

  const handleEditClick = (department: any) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };

  const handleCreateSave = async (data: any) => {
    try {
      await createDepartment({ name: data.name }).unwrap();
      setIsAddDepartmentModalOpen(false);
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Failed to create department");
    }
  };

  const handleEditSave = async (data: any) => {
    if (!selectedDepartment) return;
    const targetId = selectedDepartment.id || selectedDepartment._id;
    try {
      await updateDepartment({ id: targetId, name: data.name }).unwrap();
      setIsEditModalOpen(false);
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Failed to update department");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
        <h2 className="text-[28px] font-medium text-gray-900 font-bold">Departments Management</h2>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64 border border-gray-200">
            <Search className="w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" 
            />
          </div>
          <Button onClick={() => setIsAddDepartmentModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
            <Plus className="w-4 h-4 mr-1" />
            Add Department
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-sm text-gray-500 font-medium animate-pulse">Loading departments...</p>
        </div>
      ) : (
        <>
          <DepartmentTable
            data={paginatedDepartments}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
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
        </>
      )}

      {/* Add Department Modal */}
      {isAddDepartmentModalOpen && (
        <AddDepartmentModal
          isOpen={isAddDepartmentModalOpen}
          onClose={() => setIsAddDepartmentModalOpen(false)}
          onSave={handleCreateSave}
        />
      )}

      {/* Edit Department Modal */}
      {isEditModalOpen && (
        <EditDepartmentModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          departmentData={selectedDepartment}
          onSave={handleEditSave}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Department"
        itemName={departmentToDelete?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}