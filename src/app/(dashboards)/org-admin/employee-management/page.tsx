"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditPointModal from "@/modules/dept-admin/pointDistribution/components/EditPointModal";
import AddEmployeeModal from "@/modules/dept-admin/user/AddEmployeeModal";
import EmployeeTable from "@/modules/dept-admin/user/EmployeeTable";
import StatCard from "@/modules/user/rewards/components/StatCard";
import { Plus, Search, User, Users } from "lucide-react";
import { useState } from "react";

const employees = [
    { initials: "SR", name: "Saifur Rahman", email: "saifur@example.com", department: "Engineering", points: 1002, engagement: 92, lastActive: "9 min ago" },
    { initials: "SR", name: "Saifur Rahman", email: "saifur@example.com", department: "Engineering", points: 1002, engagement: 92, lastActive: "9 min ago" },
];

export default function EmployeeManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this?")) {
            // await deleteEmployee(id);
        }
    };

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="">
            <div className="mb-6">
                <h2 className="text-[28px] font-medium">Employee Management</h2>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                <StatCard
                    title="Total Employees"
                    count={5}
                    icon={<Users className="w-5 h-5 text-orange-500" />}
                    iconBgColor="bg-[#FFAA00]/10"
                />
                <StatCard
                    title="Active Employees"
                    count={3}
                    icon={<Users className="w-5 h-5 text-green-500" />}
                    iconBgColor="bg-[#00AC5F]/10"
                />
            </div>

            {/* Search & Add Button */}
            <div className="flex items-center justify-end mb-4 gap-4 w-full sm:w-auto">
                <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                </div>
                {/* বাটনটি মোডালের বাইরে রাখা হয়েছে */}
                <Button onClick={() => setIsAddEmployeeModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                    <Plus className="w-4 h-4" />
                    Add Employee
                </Button>                   
            </div>

            {/* Tables & Modals */}
            <EmployeeTable
                data={employees}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            {/* মোডালগুলো পেজের নিচে রাখা হয়েছে */}
            <AddEmployeeModal 
                isOpen={isAddEmployeeModalOpen} 
                onClose={() => setIsAddEmployeeModalOpen(false)} 
                onSave={(data: any) => {
                    console.log("Saving new employee:", data);
                    setIsAddEmployeeModalOpen(false);
                }}
            />

            <EditPointModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                userData={selectedUser}
                type="employee"
                onSave={(data: any) => {
                    console.log("Saving new point:", data);
                    setIsModalOpen(false);
                }}
            />


        </div>
    );
}