"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddToneModal from "@/modules/org-admin/settings/tone/AddToneModal";
import EditToneModal from "@/modules/org-admin/settings/tone/EditToneModal";
import ToneTable from "@/modules/org-admin/settings/tone/ToneTable";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminAccessPage() {
        // const [currentPage, setCurrentPage] = useState(1);
    
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isAddToneModalOpen, setIsAddToneModalOpen] = useState(false);
        const [selectedTone, setSelectedTone] = useState(null);
    
        const handleDelete = async (id: string) => {
            if (confirm("Are you sure you want to delete this?")) {
                // await deleteEmployee(id);
            }
        };
    
        const handleEdit = (tone: any) => {
            setSelectedTone(tone);
            setIsModalOpen(true);
        };
    // ডাটা API থেকে ফেচ করার জন্য এখানে useEffect বা useQuery থাকবে
    const tones = [
        { id: 1, name: "Tone 1" },
        { id: 2, name: "Tone 2" },
        // ...
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
                <h2 className="text-2xl font-light">Tone Management</h2>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                    </div>
                    <Button onClick={() => setIsAddToneModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        Add Tone
                    </Button>
                </div>
            </div>

            <ToneTable
                data={tones}
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

            <AddToneModal
                isOpen={isAddToneModalOpen}
                onClose={() => setIsAddToneModalOpen(false)}
                onSave={(data: any) => {
                    console.log("Saving new tone:", data);
                    setIsAddToneModalOpen(false);
                }}
            />

            <EditToneModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                toneData={selectedTone}
                onSave={(data: any) => {
                    console.log("Saving updated tone:", data);
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}