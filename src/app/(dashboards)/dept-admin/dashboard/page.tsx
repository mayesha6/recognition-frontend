"use client";

import RecognitionChart from "@/modules/dept-admin/recognition/RecognitionChart";
import RecognitionMix from "@/modules/dept-admin/dashboard/RecognitionMix";
import TopPerformers from "@/modules/dept-admin/dashboard/PerformerList";
import RecentActivity from "@/modules/dept-admin/dashboard/RecentRecognition";
import dynamic from "next/dynamic";
import AddEmployeeModal from "@/modules/dept-admin/user/AddEmployeeModal";
import StatCard from "@/modules/user/rewards/components/StatCard";

const EditPointModal = dynamic(
    () => import("@/modules/dept-admin/pointDistribution/components/EditPointModal").then(m => m.EditPointModal),
    { ssr: false }
);
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { Coins, Plus, Search, Trophy, User, Users, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import EmployeeTable from "@/modules/dept-admin/user/EmployeeTable";
import {
  useGetDepartmentUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/api/userApi";
import { useGetOrgDashboardQuery } from "@/redux/api/orgAdminApi";
import { useSetUserPointsMutation } from "@/redux/api/walletApi";
import { toast } from "sonner";

const dashboardData = {
    stats: { total: 100, sent: 21054, received: 4680, points: "284.5K", engagement: 91, topPerformer: "Saifur" },
    users: [],
    performers: [],
    activities: []
};

export default function DepartmentAdminDashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    // States for delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<any>(null);

    // Debounce search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch dashboard overview & tables
    const { data: dashboardRes } = useGetOrgDashboardQuery();

    const { data: usersRes, isLoading, refetch } = useGetDepartmentUsersQuery({
        page: currentPage,
        limit: 10,
        searchTerm: debouncedSearch || undefined,
    });

    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [setUserPoints] = useSetUserPointsMutation();

    const usersList = usersRes?.data || [];
    const meta = usersRes?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };
    const totalPages = meta.totalPage;

    const handleDeleteClick = (id: string) => {
        const usr = usersList.find((u: any) => (u._id || u.id) === id);
        if (!usr) return;
        setUserToDelete(usr);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;
        const id = userToDelete._id || userToDelete.id;
        try {
            await deleteUser(id).unwrap();
            setIsDeleteModalOpen(false);
            toast.success("Employee deleted successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to delete user");
        }
    };

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = async (data: any) => {
        try {
            const name = `${data.firstName || ""} ${data.lastName || ""}`.trim() || data.name;
            await createUser({
                name,
                email: data.email,
                department: data.department || "Engineering",
                password: data.password || "DefaultPassword123!",
            }).unwrap();

            const initialPoints = Number(data.points);
            if (initialPoints > 0) {
                await setUserPoints({
                    email: data.email,
                    points: initialPoints
                }).unwrap();
            }

            setIsAddEmployeeModalOpen(false);
            toast.success("Employee created successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to create user");
        }
    };

    const handleEditSave = async (data: any) => {
        if (!selectedUser) return;
        const id = selectedUser._id || selectedUser.id;
        try {
            await updateUser({ id, ...data }).unwrap();
            setIsModalOpen(false);
            toast.success("Employee details updated successfully");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to update user");
        }
    };

    const overview = dashboardRes?.data?.overview || {
        totalEmployees: 0,
        activeEmployees: 0,
        recognitionsSent: 0,
        pointsInCirculation: 0,
    };
    const topPerformers = dashboardRes?.data?.topPerformers || [];
    const recentActivities = dashboardRes?.data?.recentActivities || [];
    const recognitionByCategory = dashboardRes?.data?.recognitionByCategory || [];

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trendChartData = months.map((monthName, index) => {
        const trendItem = (dashboardRes?.data?.recognitionTrends || []).find((t: any) => t._id === index + 1);
        return {
            name: monthName,
            value: trendItem ? trendItem.total : 0
        };
    });

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <h2 className="text-[28px] font-medium mb-6">Department Overview</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                <StatCard
                    title="Total Employees"
                    count={overview.totalEmployees}
                    icon={<User className="w-5 h-5 text-orange-500" />}
                    iconBgColor="bg-[#FFAA00]/10"
                />
                <StatCard
                    title="Recognitions Sent"
                    count={overview.recognitionsSent}
                    icon={<Trophy className="w-5 h-5 text-amber-500" />}
                    iconBgColor="bg-amber-500/10"
                />
                <StatCard
                    title="Points Distributed"
                    count={overview.pointsInCirculation}
                    icon={<Coins className="w-5 h-5 text-green-500" />}
                    iconBgColor="bg-[#00AC5F]/10"
                />
                <StatCard
                    title="Top Performer"
                    count={topPerformers[0]?.name || "N/A"}
                    icon={<Trophy className="w-5 h-5 text-indigo-500" />}
                    iconBgColor="bg-indigo-500/10"
                />
            </div>

            {/* ২. চার্ট এবং কুইক অ্যাকশন */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                <div className="xl:col-span-2 bg-white p-6 rounded-2xl border shadow-sm border-gray">
                    <h3 className="font-bold mb-4 text-gray-900">Employee Engagement</h3>
                    <RecognitionChart data={trendChartData} />
                </div>
                
                {/* Quick Actions Panel */}
                <div className="bg-white p-6 rounded-2xl border border-gray shadow-sm flex flex-col justify-between">
                    <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4 h-full">
                        <button 
                            onClick={() => setIsAddEmployeeModalOpen(true)}
                            type="button"
                            className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-2xl hover:bg-indigo-50/30 hover:border-indigo-100 transition-all text-center gap-2 group cursor-pointer"
                        >
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Plus size={18} />
                            </div>
                            <span className="text-xs font-semibold text-gray-700">Add Employee</span>
                        </button>
                        <a 
                            href="/dept-admin/recognition"
                            className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-2xl hover:bg-indigo-50/30 hover:border-indigo-100 transition-all text-center gap-2 group cursor-pointer"
                        >
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Trophy size={18} />
                            </div>
                            <span className="text-xs font-semibold text-gray-700">Send Recognition</span>
                        </a>
                        <a 
                            href="/dept-admin/point-distribution"
                            className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-2xl hover:bg-indigo-50/30 hover:border-indigo-100 transition-all text-center gap-2 group cursor-pointer"
                        >
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Coins size={18} />
                            </div>
                            <span className="text-xs font-semibold text-gray-700">Distribute Points</span>
                        </a>
                        <a 
                            href="/dept-admin/settings"
                            className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-2xl hover:bg-indigo-50/30 hover:border-indigo-100 transition-all text-center gap-2 group cursor-pointer"
                        >
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Settings size={18} />
                            </div>
                            <span className="text-xs font-semibold text-gray-700">Settings</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm border-gray my-6 ">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <h2 className="text-xl font-medium">Employee Management</h2>
                    <div className="flex items-center justify-end gap-4 w-full sm:w-auto">
                        <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                            <Search className="w-4 h-4 text-gray-400" />
                            <Input 
                                placeholder="Search..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" 
                            />
                        </div>
                        <Button onClick={() => setIsAddEmployeeModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                            <Plus className="w-4 h-4" />
                            Add Employee
                        </Button>
                    </div>
                </div>

                {/* Tables & Modals */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p className="text-sm text-gray-500 font-medium animate-pulse">Loading employees...</p>
                    </div>
                ) : (
                    <EmployeeTable
                        data={usersList}
                        onDelete={handleDeleteClick}
                        onEdit={handleEdit}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(p: number) => setCurrentPage(p)}
                    />
                )}

                {/* Modals */}
                {isAddEmployeeModalOpen && (
                    <AddEmployeeModal 
                        isOpen={isAddEmployeeModalOpen} 
                        onClose={() => setIsAddEmployeeModalOpen(false)} 
                        onSave={handleSaveUser}
                    />
                )}

                {isModalOpen && (
                    <EditPointModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        userData={selectedUser}
                        type="employee"
                        onSave={handleEditSave}
                    />
                )}

                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    title="Delete User"
                    itemName={userToDelete?.name}
                    description={`Are you sure you want to delete user "${userToDelete?.name}" (${userToDelete?.email})? This action is permanent and cannot be undone.`}
                    isLoading={isDeleting}
                />
            </div>

            {/* ৪. বটম সেকশন: চার্ট, পারফর্মার, অ্যাক্টিভিটি */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RecognitionMix categoryMix={recognitionByCategory} />
                <TopPerformers performers={topPerformers} />
                <RecentActivity activities={recentActivities} />
            </div>
        </div>
    );
}