"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import DepartmentTable from "@/modules/org-admin/department/DepartmentTable";
import { Input } from "@/components/ui/input";
import AddDepartmentModal from "@/modules/org-admin/department/AddDeptModal";
import EditDepartmentModal from "@/modules/org-admin/department/EditDeptModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "@/redux/api/departmentApi";
import { toast } from "sonner";

export default function DepartmentManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

    // States for delete confirmation
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deptToDelete, setDeptToDelete] = useState<any>(null);

    // Debounce search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Query departments
    const { data: departmentsRes, isLoading, refetch } = useGetDepartmentsQuery({
        searchTerm: debouncedSearch || undefined,
    });

    const [createDepartment] = useCreateDepartmentMutation();
    const [updateDepartment] = useUpdateDepartmentMutation();
    const [deleteDepartment, { isLoading: isDeleting }] = useDeleteDepartmentMutation();

    const departmentsList = departmentsRes?.data || [];

    const handleDeleteClick = (id: string) => {
        const dept = departmentsList.find((d: any) => (d._id || d.id) === id);
        if (!dept) return;
        setDeptToDelete(dept);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deptToDelete) return;
        const id = deptToDelete._id || deptToDelete.id;
        try {
            await deleteDepartment(id).unwrap();
            setIsDeleteModalOpen(false);
            toast.success("Department deleted successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to delete department");
        }
    };

    const handleEdit = (department: any) => {
        setSelectedDepartment(department);
        setIsModalOpen(true);
    };

    const handleSaveDept = async (data: any) => {
        try {
            await createDepartment({ name: data.name }).unwrap();
            setIsAddDepartmentModalOpen(false);
            toast.success("Department created successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to create department");
        }
    };

    const handleEditSave = async (data: any) => {
        if (!selectedDepartment) return;
        const id = selectedDepartment._id || selectedDepartment.id;
        try {
            await updateDepartment({ id, name: data.name }).unwrap();
            setIsModalOpen(false);
            toast.success("Department updated successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to update department");
        }
    };

    return (
        <div className="">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
                <h2 className="text-[28px] font-medium text-gray-900">Departments Management</h2>

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
                    <Button onClick={() => setIsAddDepartmentModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                        <Plus className="w-4 h-4" />
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
                <DepartmentTable
                    data={departmentsList}
                    onDelete={handleDeleteClick}
                    onEdit={handleEdit}
                />
            )}

            <AddDepartmentModal
                isOpen={isAddDepartmentModalOpen}
                onClose={() => setIsAddDepartmentModalOpen(false)}
                onSave={handleSaveDept}
            />

            <EditDepartmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                departmentData={selectedDepartment}
                onSave={handleEditSave}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Department"
                itemName={deptToDelete?.name}
                description={`Are you sure you want to delete department "${deptToDelete?.name}"? All associations to this department will be removed.`}
                isLoading={isDeleting}
            />
        </div>
    );
}