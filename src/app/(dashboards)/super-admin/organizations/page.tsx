"use client";
import OrganizationTable from "@/modules/super-admin/organization/OrganizationTable";
import { useEffect, useState } from "react";

export default function OrganizationManagement() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // API থেকে ডাটা নিয়ে আসা
    fetch("/api/organizations")
      .then((res) => res.json())
      .then((data) => setOrganizations(data));
  }, []);

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

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organization Management</h1>
        <input placeholder="Search department..." className="border rounded-lg px-4 py-2 text-sm w-64 outline-none" />
      </div>

      <OrganizationTable 
        orgs={organizations}
        onView={(org: any) => console.log("Viewing:", org)}
        onSuspend={handleSuspend}
        onDelete={handleDelete}
      />
    </div>
  );
}