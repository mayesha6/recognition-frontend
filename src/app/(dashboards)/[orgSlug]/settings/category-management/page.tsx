"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddCategoryModal from "@/modules/org-admin/settings/category/AddCategoryModal";
import CategoryTable from "@/modules/org-admin/settings/category/CategoryTable";
import EditCategoryModal from "@/modules/org-admin/settings/category/EditCategoryModal";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { Search, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import { toast } from "sonner";
import { formatErrorMessage } from "@/utils/formatError";

export default function CategoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; id: string | null; name: string }>({
        isOpen: false,
        id: null,
        name: "",
    });

    const { data: categoriesRes, isLoading, isError } = useGetCategoriesQuery();
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

    const categoriesList = categoriesRes?.data || (Array.isArray(categoriesRes) ? categoriesRes : []);

    const filteredCategories = categoriesList.filter((cat: any) =>
        cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (id: string, name: string) => {
        setDeleteModalState({
            isOpen: true,
            id,
            name,
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteModalState.id) return;
        try {
            await deleteCategory(deleteModalState.id).unwrap();
            toast.success("Category deleted successfully!");
            setDeleteModalState({ isOpen: false, id: null, name: "" });
        } catch (error: any) {
            toast.error(formatErrorMessage(error, "Failed to delete category"));
        }
    };

    const handleEdit = (category: any) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                    <h2 className="text-2xl font-light text-gray-900">Category Management</h2>
                    <p className="text-xs text-gray-400 mt-1">Manage categories and associated recognition images.</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 w-full sm:w-64 focus-within:border-gray-300">
                        <Search className="w-4 h-4 text-gray-400 shrink-0" />
                        <Input
                            placeholder="Search category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent h-9 text-sm outline-none shadow-none"
                        />
                    </div>
                    <Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap h-9 px-4 rounded-xl">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Category
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[250px] gap-2">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                    <p className="text-sm text-gray-500 font-medium">Loading categories...</p>
                </div>
            ) : isError ? (
                <div className="p-8 text-center text-red-500 border border-red-100 rounded-2xl bg-red-50/50 text-sm">
                    Failed to load categories. Please try refreshing the page.
                </div>
            ) : filteredCategories.length === 0 ? (
                <div className="p-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl text-sm">
                    {searchTerm ? `No categories matching "${searchTerm}"` : "No categories found. Click Add Category to create one."}
                </div>
            ) : (
                <CategoryTable
                    data={filteredCategories}
                    onDelete={handleDeleteClick}
                    onEdit={handleEdit}
                />
            )}

            <AddCategoryModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            <EditCategoryModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                categoryData={selectedCategory}
            />

            <DeleteConfirmationModal
                isOpen={deleteModalState.isOpen}
                onClose={() => setDeleteModalState({ isOpen: false, id: null, name: "" })}
                onConfirm={handleConfirmDelete}
                title="Delete Category"
                itemName={deleteModalState.name}
                isLoading={isDeleting}
            />
        </div>
    );
}