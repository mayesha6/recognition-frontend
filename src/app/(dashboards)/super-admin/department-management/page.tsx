"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, X, AlertTriangle } from "lucide-react";
import DepartmentTable from "@/modules/org-admin/department/DepartmentTable";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/common/pagination";
import AddDepartmentModal from "@/modules/org-admin/department/AddDeptModal";
import EditDepartmentModal from "@/modules/org-admin/department/EditDeptModal";
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
  const [deleteDepartment] = useDeleteDepartmentMutation();

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
    const dept = rawDepartments.find((d: any) => d.id === id);
    if (!dept) return;
    setDepartmentToDelete(dept);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!departmentToDelete) return;
    try {
      await deleteDepartment(departmentToDelete.id).unwrap();
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
    try {
      await updateDepartment({ id: selectedDepartment.id, name: data.name }).unwrap();
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

      {/* Custom Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-rose-600 font-semibold">
                <AlertTriangle className="w-5 h-5" />
                <span>Delete Department</span>
              </div>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete department <span className="font-semibold text-gray-900">"{departmentToDelete?.name}"</span>? This action is permanent.
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