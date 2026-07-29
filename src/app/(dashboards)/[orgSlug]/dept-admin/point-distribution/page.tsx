"use client";

import Pagination from "@/components/common/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import PointDistributionTable from "@/modules/dept-admin/pointDistribution/components/PointDistributionTable";
import { Plus, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useGetDepartmentUsersQuery } from "@/redux/api/userApi";
import { useGetWalletQuery, useDistributePointsMutation, useSetUserPointsMutation } from "@/redux/api/walletApi";
import { toast } from "sonner";

const EditPointModal = dynamic(
    () => import("@/modules/dept-admin/pointDistribution/components/EditPointModal").then(m => m.EditPointModal),
    { ssr: false }
);

export default function PointDistributionPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch logged in admin details
    const { data: profileRes } = useGetMeQuery(undefined);
    const userId = profileRes?.data?._id;
    const adminDept = profileRes?.data?.department || "";

    // Fetch admin wallet (budget balance)
    const { data: walletRes } = useGetWalletQuery(userId, { skip: !userId });
    const pointsBalance = walletRes?.data?.pointsBalance ?? 0;

    // Fetch paginated department employees
    const { data: usersRes, isLoading } = useGetDepartmentUsersQuery({
        page: currentPage,
        limit: 10,
        searchTerm: debouncedSearch || undefined,
    });

    const [distributePoints, { isLoading: isDistributing }] = useDistributePointsMutation();
    const [setUserPoints, { isLoading: isSettingUser }] = useSetUserPointsMutation();

    const usersList = (usersRes?.data || []).map((user: any) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        point: user.wallet?.pointsBalance || 0,
        date: user.createdAt 
            ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
            : "N/A",
        ...user
    }));

    const meta = usersRes?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };
    const totalPages = meta.totalPage;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
    const [deptPoints, setDeptPoints] = useState("");

    const handleEdit = (user: any) => {
        setSelectedUser({
            ...user,
            point: 0 // Reset editable points to input field to 0 for adding points
        });
        setIsModalOpen(true);
    };

    const handleSaveIndividualPoints = async (data: any) => {
        const addedPoints = Number(data.point);
        if (!addedPoints || addedPoints <= 0) {
            toast.error("Please enter a valid points amount (> 0).");
            return;
        }

        try {
            await setUserPoints({
                email: data.email,
                points: addedPoints
            }).unwrap();
            setIsModalOpen(false);
            toast.success(`Successfully allocated ${addedPoints} points to ${data.name}!`);
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to allocate points");
        }
    };

    const handleDistributeDeptPoints = async () => {
        const pointsNum = Number(deptPoints);
        if (!pointsNum || pointsNum <= 0) {
            toast.error("Please enter a valid point amount (> 0).");
            return;
        }
        try {
            await distributePoints({
                department: adminDept,
                points: pointsNum
            }).unwrap();
            setIsDeptModalOpen(false);
            setDeptPoints("");
            toast.success(`Successfully distributed ${pointsNum} points to all employees in ${adminDept}!`);
        } catch (err: any) {
            toast.error(err?.data?.message || err?.message || "Failed to distribute points");
        }
    };

    const handleDelete = () => {
        toast.error("Resetting points balance must be requested from the Organization Admin.");
    };

    return (
        <div className="bg-gray-50/50 min-h-screen">
            {/* হেডার */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div>
                    <h2 className="text-[28px] font-medium text-gray-900">Point Distribution</h2>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        Available Budget: 
                        <span className="font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs">
                            {pointsBalance} Pts
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-white rounded-lg px-3 w-full sm:w-64 border border-gray-200">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input 
                            placeholder="Search employees..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent animate-none" 
                        />
                    </div>
                    <Button 
                        onClick={() => setIsDeptModalOpen(true)}
                        className="bg-gradient hover:opacity-90 text-white whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Distribute Point
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="text-sm text-gray-500 font-medium animate-pulse">Loading employees...</p>
                </div>
            ) : (
                <div>
                    <PointDistributionTable
                        data={usersList}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </div>
            )}

            {totalPages > 1 && !isLoading && (
                <div className="py-6 flex justify-end">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(p) => setCurrentPage(p)}
                    />
                </div>
            )}

            {/* Individual Point Allocation Modal */}
            <EditPointModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userData={selectedUser}
                type="point"
                onSave={handleSaveIndividualPoints}
            />

            {/* Department Distribution Modal */}
            {isDeptModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-light text-xl text-gray-900">Distribute Points to Department</h3>
                            <button onClick={() => setIsDeptModalOpen(false)} className="text-gray-400">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Department</label>
                                <input 
                                    disabled 
                                    value={adminDept || "Loading..."} 
                                    className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 border-gray text-gray-400 text-[14px]" 
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-500">Points per Employee</label>
                                <input 
                                    type="number"
                                    placeholder="Enter points..." 
                                    value={deptPoints}
                                    onChange={(e) => setDeptPoints(e.target.value)}
                                    className="w-full border border-indigo-500 rounded-lg px-3 py-2 mt-1 focus:outline-none text-sm text-gray-900" 
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleDistributeDeptPoints}
                            disabled={isDistributing}
                            className="w-full mt-6 bg-gradient text-white py-3 rounded-lg font-bold hover:opacity-90 flex items-center justify-center gap-2"
                        >
                            {isDistributing ? "Distributing..." : "Confirm Distribution"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}