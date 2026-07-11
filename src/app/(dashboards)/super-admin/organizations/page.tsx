"use client";
import { Input } from "@/components/ui/input";
import OrganizationTable from "@/modules/super-admin/organization/OrganizationTable";
import ViewOrganizationModal from "@/modules/super-admin/organization/ViewOrganizationModal";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrganizationManagement() {
    //   const [organizations, setOrganizations] = useState([]);

    const organizations = [
        {
            "id": "1",
            "name": "Acme Corporation",
            "industry": "Technology",
            "plan": "Enterprise",
            "employees": 320,
            "departments": 18,
            "status": "Active",
            "renewal": "Apr 12, 2026"
        },
        {
            "id": "2",
            "name": "Northwind Logistics",
            "industry": "Logistics",
            "plan": "Premium",
            "employees": 180,
            "departments": 12,
            "status": "Trial",
            "renewal": "Mar 02, 2026"
        },
        {
            "id": "3",
            "name": "Sterling Health",
            "industry": "Healthcare",
            "plan": "Professional",
            "employees": 210,
            "departments": 8,
            "status": "Expired",
            "renewal": "Mar 02, 2026"
        },
        {
            "id": "4",
            "name": "Acme Corporation",
            "industry": "Technology",
            "plan": "Free",
            "employees": 320,
            "departments": 18,
            "status": "Active",
            "renewal": "Apr 12, 2026"
        },
        {
            "id": "5",
            "name": "Sterling Health",
            "industry": "Healthcare",
            "plan": "Professional",
            "employees": 210,
            "departments": 8,
            "status": "Expired",
            "renewal": "Mar 02, 2026"
        }
    ]

    //   useEffect(() => {
    //     // API থেকে ডাটা নিয়ে আসা
    //     fetch("/api/organizations")
    //       .then((res) => res.json())
    //       .then((data) => setOrganizations(data));
    //   }, []);

    const handleSuspend = (id: string) => {
        console.log("Suspending organization:", id);
        // Suspended API logic here
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this organization?")) {
            console.log("Deleting organization:", id);
            // Delete API logic here
        }
    };
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState(null);

    const handleView = (org: any) => {
        setSelectedOrg(org);
        setIsViewModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-[28px] font-medium">Organization Management</h2>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
                    </div>

                </div>
            </div>

            <OrganizationTable
                orgs={organizations}
                onView={(org: any) => console.log("Viewing:", org)}
                onSuspend={handleSuspend}
                onDelete={handleDelete}
            />
            <ViewOrganizationModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                org={selectedOrg}
            />
        </div>
    );
}