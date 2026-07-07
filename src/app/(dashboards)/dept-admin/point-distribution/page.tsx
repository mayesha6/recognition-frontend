"use client";
import Pagination from "@/components/common/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditPointModal from "@/modules/dept-admin/pointDistribution/components/EditPointModal";
import PointDistributionTable from "@/modules/dept-admin/pointDistribution/components/PointDistributionTable";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
// import { useGetPointsQuery, useDeletePointMutation } from "@/redux/api/pointApi";
export const mockPoints = [
    { id: 1, name: "Saifur Rahman", email: "saifur@example.com", department: "Engineering", point: 500, date: "June 20, 2026" },
    { id: 2, name: "Aysha Onu", email: "Aysha@example.com", department: "English", point: 600, date: "June 21, 2026" },
    { id: 3, name: "Mira Kapadia", email: "Mira@example.com", department: "Mathematics", point: 550, date: "June 22, 2026" },
    { id: 4, name: "Jasper Liu", email: "Jasper@example.com", department: "Physics", point: 650, date: "June 23, 2026" },
    { id: 5, name: "Leila Ahmed", email: "Leila@example.com", department: "History", point: 700, date: "June 24, 2026" },
    { id: 6, name: "Omar Farooq", email: "Omar@example.com", department: "Chemistry", point: 800, date: "June 25, 2026" },
    { id: 7, name: "Zara Khan", email: "Zara@example.com", department: "Biology", point: 750, date: "June 26, 2026" },
    { id: 8, name: "Ravi Singh", email: "Ravi@example.com", department: "Computer Science", point: 900, date: "June 27, 2026" },
    { id: 9, name: "Khalid Malik", email: "Khalid@example.com", department: "Political Science", point: 800, date: "July 2, 2026" },
];
export default function PointDistributionPage() {
    const [currentPage, setCurrentPage] = useState(1);
    // const { data } = useGetPointsQuery({ page });
    // const [deletePoint] = useDeletePointMutation();

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this distribution?")) {
            // await deletePoint(id);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="">
            {/* হেডার */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
                <h2 className="text-[28px] font-medium">Point Distribution</h2>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                    </div>
                    <Button className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                        <Plus className="w-4 h-4 mr-2" />
                        Distribute Point
                    </Button>
                </div>
            </div>



            <div>
                {/* আপনার টেবিল যেখানে onEdit কল হবে */}
                <PointDistributionTable
                    data={mockPoints}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />

                {/* মডাল */}
                <EditPointModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    userData={selectedUser}
                    type="point"
                    onSave={(data: any) => {
                        console.log("Saving new point:", data);
                        setIsModalOpen(false);
                    }}
                />

            </div>

            <div className="py-6 flex justify-end">
                <Pagination
                    currentPage={currentPage}
                    totalPages={16}
                    onPageChange={(p) => setCurrentPage(p)}
                />
            </div>
        </div>
    );
}