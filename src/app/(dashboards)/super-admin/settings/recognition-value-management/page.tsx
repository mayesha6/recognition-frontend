"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddValueModal from "@/modules/org-admin/settings/recognition-value/AddValueModal";
import EditValueModal from "@/modules/org-admin/settings/recognition-value/EditValueModal";
import ValueTable from "@/modules/org-admin/settings/recognition-value/ValueTable";
import AddToneModal from "@/modules/org-admin/settings/tone/AddToneModal";
import EditToneModal from "@/modules/org-admin/settings/tone/EditToneModal";
import ToneTable from "@/modules/org-admin/settings/tone/ToneTable";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

export default function ValuePage() {
        // const [currentPage, setCurrentPage] = useState(1);
    
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isAddValueModalOpen, setIsAddValueModalOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState(null);
    
        const handleDelete = async (id: string) => {
            if (confirm("Are you sure you want to delete this?")) {
                // await deleteEmployee(id);
            }
        };
    
        const handleEdit = (value: any) => {
            setSelectedValue(value);
            setIsModalOpen(true);
        };
    // ডাটা API থেকে ফেচ করার জন্য এখানে useEffect বা useQuery থাকবে
    const values = [
        { id: 1, name: "Value 1" },
        { id: 2, name: "Value 2" },
        // ...
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
                <h2 className="text-2xl font-light">Recognition Value Management</h2>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                    </div>
                    <Button onClick={() => setIsAddValueModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        Add Recognition Value
                    </Button>
                </div>
            </div>

            <ValueTable
                data={values}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />


            {/* <div className="py-6 flex justify-end">
                <Pagination
                    currentPage={currentPage}
                    totalPages={16}
                    onPageChange={(p) => setCurrentPage(p)}
                />
            </div> */}

            <AddValueModal
                isOpen={isAddValueModalOpen}
                onClose={() => setIsAddValueModalOpen(false)}
                onSave={(data: any) => {
                    console.log("Saving new value:", data);
                    setIsAddValueModalOpen(false);
                }}
            />

            <EditValueModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                valueData={selectedValue}
                onSave={(data: any) => {
                    console.log("Saving updated value:", data);
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}