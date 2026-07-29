"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddValueModal from "@/modules/org-admin/settings/recognition-value/AddValueModal";
import EditValueModal from "@/modules/org-admin/settings/recognition-value/EditValueModal";
import ValueTable from "@/modules/org-admin/settings/recognition-value/ValueTable";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";

import {
    useDeleteRecognitionValueMutation,
    useGetRecognitionValuesQuery,
} from "@/redux/api/recognitionValueApi";

import { formatErrorMessage } from "@/utils/formatError";
import { Loader2, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function RecognitionValuePage() {
    const [searchTerm, setSearchTerm] = useState("");

    const [isEditModalOpen, setIsEditModalOpen] =
        useState(false);

    const [isAddModalOpen, setIsAddModalOpen] =
        useState(false);

    const [selectedValue, setSelectedValue] =
        useState<any>(null);

    const [deleteModalState, setDeleteModalState] =
        useState<{
            isOpen: boolean;
            id: string | null;
            name: string;
        }>({
            isOpen: false,
            id: null,
            name: "",
        });

    const {
        data: recognitionValuesRes,
        isLoading,
        isError,
    } = useGetRecognitionValuesQuery();

    const [deleteRecognitionValue, { isLoading: isDeleting }] =
        useDeleteRecognitionValueMutation();

    const valuesList =
        recognitionValuesRes?.data ||
        (Array.isArray(recognitionValuesRes)
            ? recognitionValuesRes
            : []);

    const filteredValues = valuesList.filter((value: any) =>
        value.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const handleEdit = (value: any) => {
        setSelectedValue(value);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (
        id: string,
        name: string
    ) => {
        setDeleteModalState({
            isOpen: true,
            id,
            name,
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteModalState.id) return;

        try {
            await deleteRecognitionValue(
                deleteModalState.id
            ).unwrap();

            toast.success(
                "Recognition value deleted successfully!"
            );

            setDeleteModalState({
                isOpen: false,
                id: null,
                name: "",
            });
        } catch (error: any) {
            toast.error(
                formatErrorMessage(
                    error,
                    "Failed to delete recognition value"
                )
            );
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-100">

                <div>
                    <h2 className="text-2xl font-light text-gray-900">
                        Recognition Value Management
                    </h2>

                    <p className="text-xs text-gray-400 mt-1">
                        Manage recognition values for your organization.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">

                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 w-full sm:w-64 focus-within:border-gray-300">
                        <Search className="w-4 h-4 text-gray-400 shrink-0" />

                        <Input
                            placeholder="Search recognition value..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            className="w-full border-none bg-transparent h-9 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>

                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-gradient hover:opacity-90 text-white whitespace-nowrap h-9 px-4 rounded-xl"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Recognition Value
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[250px] gap-2">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />

                    <p className="text-sm text-gray-500 font-medium">
                        Loading recognition values...
                    </p>
                </div>
            ) : isError ? (
                <div className="p-8 text-center text-red-500 border border-red-100 rounded-2xl bg-red-50/50 text-sm">
                    Failed to load recognition values.
                    Please refresh the page.
                </div>
            ) : filteredValues.length === 0 ? (
                <div className="p-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl text-sm">
                    {searchTerm
                        ? `No recognition values matching "${searchTerm}"`
                        : "No recognition values found. Click Add Recognition Value to create one."}
                </div>
            ) : (
                <ValueTable
                    data={filteredValues}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
            )}

            <AddValueModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            <EditValueModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                valueData={selectedValue}
            />

            <DeleteConfirmationModal
                isOpen={deleteModalState.isOpen}
                onClose={() =>
                    setDeleteModalState({
                        isOpen: false,
                        id: null,
                        name: "",
                    })
                }
                onConfirm={handleConfirmDelete}
                title="Delete Recognition Value"
                itemName={deleteModalState.name}
                isLoading={isDeleting}
            />
        </div>
    );
}