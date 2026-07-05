"use client";

import RecognitionChart from "@/modules/dept-admin/recognition/RecognitionChart";
// import StatCards from "@/components/dashboard/StatCards";
// import RecognitionChart from "@/components/dashboard/RecognitionChart";
// import ActionButtons from "@/components/dashboard/ActionButtons";
// import UserManagementTable from "@/components/dashboard/UserManagementTable";
// import RecognitionMix from "@/components/dashboard/RecognitionMix";
// import TopPerformers from "@/components/dashboard/TopPerformers";
// import RecentActivity from "@/components/dashboard/RecentActivity";
import { trendData } from "../recognition/page";
import RecognitionMix from "@/modules/dept-admin/dashboard/RecognitionMix";
import TopPerformers from "@/modules/dept-admin/dashboard/PerformerList";
import RecentActivity from "@/modules/dept-admin/dashboard/RecentRecognition";
import EditPointModal from "@/modules/dept-admin/pointDistribution/components/EditPointModal";
import AddEmployeeModal from "@/modules/dept-admin/user/AddEmployeeModal";
import StatCard from "@/modules/user/rewards/components/StatCard";
import { Coins, Plus, Search, Trophy, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EmployeeTable from "@/modules/dept-admin/dashboard/EmployeeTable";

// মক ডাটা (এটি API থেকে আসবে)
const dashboardData = {
    stats: { total: 100, sent: 21054, received: 4680, points: "284.5K", engagement: 91, topPerformer: "Saifur" },
    users: [/* ... */],
    performers: [/* ... */],
    activities: [/* ... */]
};
const employees = [
    { initials: "SR", name: "Saifur Rahman", email: "saifur@example.com", department: "Engineering", points: 1002, engagement: 92, lastActive: "9 min ago" },
    { initials: "SR", name: "Saifur Rahman", email: "saifur@example.com", department: "Engineering", points: 1002, engagement: 92, lastActive: "9 min ago" },
];
export default function DepartmentAdminDashboard() {
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
        <div className="bg-gray-50/50 min-h-screen">
            <h2 className="text-[28px] font-medium mb-6">Department Overview</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                <StatCard
                    title="Total Employees"
                    count={5}
                    icon={<User className="w-5 h-5 text-orange-500" />}
                    iconBgColor="bg-[#FFAA00]/10"
                />
                <StatCard
                    title="Distributed Points"
                    count={3}
                    icon={<Coins className="w-5 h-5 text-green-500" />}
                    iconBgColor="bg-[#00AC5F]/10"
                />
                <StatCard
                    title="Top Performer"
                    count={3}
                    icon={<Trophy className="w-5 h-5 text-green-500" />}
                    iconBgColor="bg-[#00AC5F]/10"
                />
            </div>

            {/* ২. চার্ট এবং কুইক অ্যাকশন */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="col-span-2 bg-white p-6 rounded-2xl border shadow-sm border-gray">
                    <h3 className="font-bold mb-4">Employee Engagement</h3>
                    <RecognitionChart data={trendData} />
                </div>

            </div>


            <div className="bg-white p-6 rounded-2xl border shadow-sm border-gray my-6 ">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <h2 className="text-xl font-medium">Employee Management</h2>
                    <div className="flex items-center justify-end gap-4 w-full sm:w-auto">
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

            {/* ৪. বটম সেকশন: চার্ট, পারফর্মার, অ্যাক্টিভিটি */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RecognitionMix />
                <TopPerformers performers={dashboardData.performers} />
                <RecentActivity activities={dashboardData.activities} />
            </div>
        </div>
    );
}