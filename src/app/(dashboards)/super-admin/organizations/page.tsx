"use client";

import { Input } from "@/components/ui/input";
import OrganizationTable from "@/modules/super-admin/organization/OrganizationTable";
import ViewOrganizationModal from "@/modules/super-admin/organization/ViewOrganizationModal";
import DeleteConfirmationModal from "@/modules/super-admin/organization/DeleteConfirmationModal";
import SuspendConfirmationModal from "@/modules/super-admin/organization/SuspendConfirmationModal";
import Pagination from "@/components/common/pagination";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetDepartmentUsersQuery } from "@/redux/api/userApi";
import { 
  useDeleteOrganizationMutation, 
  useUpdateOrganizationStatusMutation 
} from "@/redux/api/superAdminApi";

export default function OrganizationManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);

  // States for delete and suspend modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [selectedOrgForAction, setSelectedOrgForAction] = useState<any>(null);

  // Debounce search term to prevent overloading the server on quick typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to page 1 on new search
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // API query hook for fetching organizations
  const { data: orgsRes, isLoading, refetch } = useGetDepartmentUsersQuery({
    accountType: "ORGANIZATION",
    page: currentPage,
    limit: 10,
    searchTerm: debouncedSearch || undefined,
  });

  const organizations = orgsRes?.data || [];
  const meta = orgsRes?.meta || { total: 0, limit: 10, page: 1, totalPage: 1 };
  const totalPages = meta.totalPage;

  const [deleteOrganization] = useDeleteOrganizationMutation();
  const [updateOrganizationStatus] = useUpdateOrganizationStatusMutation();

  const handleSuspendClick = (id: string) => {
    const org = organizations.find((o: any) => o.id === id);
    if (!org) return;
    setSelectedOrgForAction(org);
    setIsSuspendModalOpen(true);
  };

  const handleSuspendConfirm = async () => {
    if (!selectedOrgForAction) return;
    const id = selectedOrgForAction.id;
    const nextStatus = selectedOrgForAction.isActive === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      await updateOrganizationStatus({ id, isActive: nextStatus }).unwrap();
      setIsSuspendModalOpen(false);
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Failed to update status");
    }
  };

  const handleDeleteClick = (id: string) => {
    const org = organizations.find((o: any) => o.id === id);
    if (!org) return;
    setSelectedOrgForAction(org);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedOrgForAction) return;
    const id = selectedOrgForAction.id;
    try {
      await deleteOrganization(id).unwrap();
      setIsDeleteModalOpen(false);
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || "Failed to delete organization");
    }
  };

  const handleView = (org: any) => {
    setSelectedOrg(org);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-[28px] font-medium text-gray-900">Organization Management</h2>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64 border border-gray-200">
            <Search className="w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" 
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-sm text-gray-500 font-medium animate-pulse">Loading organizations...</p>
        </div>
      ) : (
        <>
          <OrganizationTable
            orgs={organizations}
            onView={handleView}
            onSuspend={handleSuspendClick}
            onDelete={handleDeleteClick}
          />

          {totalPages > 1 && (
            <div className="flex justify-end mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </>
      )}

      <ViewOrganizationModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        org={selectedOrg}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        orgName={selectedOrgForAction?.name || ""}
      />

      <SuspendConfirmationModal
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        onConfirm={handleSuspendConfirm}
        orgName={selectedOrgForAction?.name || ""}
        isActive={selectedOrgForAction?.isActive === "ACTIVE"}
      />
    </div>
  );
}