"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import DepartmentTable from "@/modules/org-admin/department/DepartmentTable";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/common/pagination";
import AddEmployeeModal from "@/modules/dept-admin/user/AddEmployeeModal";
import EditPointModal from "@/modules/dept-admin/pointDistribution/components/EditPointModal";
import AddDepartmentModal from "@/modules/org-admin/department/AddDeptModal";
import EditDepartmentModal from "@/modules/org-admin/department/EditDeptModal";

export const departments = [
    {
        id: "DEPT-001",
        name: "Engineering",
        admin: "Cody Fisher",
        adminEmail: "Cody@Fisher.com",
        employees: 320,
        recognitions: 320
    },
    {
        id: "DEPT-002",
        name: "Marketing",
        admin: "Leslie Alexander",
        adminEmail: "Leslie@Alexander.com",
        employees: 180,
        recognitions: 180,
    },
    {
        id: "DEPT-003",
        name: "Sales",
        admin: "Theresa Webb",
        adminEmail: "Theresa@Webb.com",
        employees: 210,
        recognitions: 210,
    },
    {
        id: "DEPT-004",
        name: "Human Resources",
        admin: "Jordan Smith",
        adminEmail: "Jordan@Smith.com",
        employees: 250,
        recognitions: 250,
    },
    {
        id: "DEPT-005",
        name: "Finance",
        admin: "Morgan Lee",
        adminEmail: "Morgan@Lee.com",
        employees: 300,
        recognitions: 300,
    },
    {
        id: "DEPT-006",
        name: "Operations",
        admin: "Jamie Chen",
        adminEmail: "Jamie@Chen.com",
        employees: 400,
        recognitions: 400,
    },
    {
        id: "DEPT-007",
        name: "Product",
        admin: "Pat Morgan",
        adminEmail: "Pat@Morgan.com",
        employees: 450,
        recognitions: 450,
    },
    {
        id: "DEPT-008",
        name: "Design",
        admin: "Riley Adams",   
        adminEmail: "Riley@Adams.com",
        employees: 230,
        recognitions: 230,
    },
    {
        id: "DEPT-009",
        name: "Customer Support",
        admin: "Kendall Brown",
        adminEmail: "Kendall@Brown.com",
        employees: 350,
        recognitions: 350,
    },
    {
        id: "DEPT-010",
        name: "Legal",
        admin: "Taylor Green",
        adminEmail: "Taylor@Green.com",
        employees: 290,
        recognitions: 290,
    }
];
export default function DepartmentManagementPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this?")) {
            // await deleteEmployee(id);
        }
    };

    const handleEdit = (department: any) => {
        setSelectedDepartment(department);
        setIsModalOpen(true);
    };
    // API থেকে ডাটা ফেচ করার জন্য এখানে useEffect বা useQuery ব্যবহার করবেন
    return (
        <div className="">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6">
                <h2 className="text-[28px] font-medium">Departments Management</h2>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                    </div>
                    <Button onClick={() => setIsAddDepartmentModalOpen(true)} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
                        <Plus className="w-4 h-4" />
                        Add Department
                    </Button>
                </div>
            </div>
            {/* ১. স্ট্যাট কার্ডস */}


            {/* ২. সার্চ এবং বাটন */}
            {/* <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input placeholder="Search department..." className="border rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none" />
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="w-4 h-4 mr-2" /> Add Department
                </Button>
            </div> */}

            {/* ৩. টেবিল */}
            <DepartmentTable
                data={departments}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />

            <div className="py-6 flex justify-end">
                <Pagination
                    currentPage={currentPage}
                    totalPages={16}
                    onPageChange={(p) => setCurrentPage(p)}
                />
            </div>

            <AddDepartmentModal
                isOpen={isAddDepartmentModalOpen}
                onClose={() => setIsAddDepartmentModalOpen(false)}
                onSave={(data: any) => {
                    console.log("Saving new department:", data);
                    setIsAddDepartmentModalOpen(false);
                }}
            />

            <EditDepartmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                departmentData={selectedDepartment}
                onSave={(data: any) => {
                    console.log("Saving updated department:", data);
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}