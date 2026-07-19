"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RecipientUser } from "@/types/recognition";
import SendRecognitionWizard from "@/modules/user/recognition/components/SendRecognitionWizard";
import { useGetDepartmentUsersQuery } from "@/redux/api/userApi";
import Pagination from "@/components/common/pagination";

export default function SendRecognitionPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RecipientUser | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetDepartmentUsersQuery({
    searchTerm: searchTerm,
    page: currentPage,
    limit: 10
  });

  const users = data?.data || [];
  const meta = data?.meta || {};
  const totalPages = meta?.totalPage || 1;

  // Flow 1: Top Button Clicked (Blank/Guest)
  const handleOpenGuestRecognition = () => {
    setSelectedUser(null);
    setIsWizardOpen(true);
  };

  // Flow 2: Table Row Button Clicked (Prefilled)
  const handleOpenUserRecognition = (user: any) => {
    setSelectedUser(user);
    setIsWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
    setSelectedUser(null);
  };

  // If wizard is open, hide the table and show the wizard
  if (isWizardOpen) {
    return (
      <SendRecognitionWizard
        prefilledUser={selectedUser}
        onClose={handleCloseWizard}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Send Recognition</h1>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on new search
              }}
              className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent"
            />
          </div>
          <Button onClick={handleOpenGuestRecognition} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            Send Recognition
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading users...</p>
          </div>
        ) : isError ? (
          <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg border border-red-200">
            Error: Could not load users. Please try again.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-200">
              <thead className="border-b border-gray-200 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">RECIPIENT</th>
                  <th className="px-6 py-4">EMAIL</th>
                  <th className="px-6 py-4">DEPARTMENT</th>
                  <th className="px-6 py-4">POINTS</th>
                  <th className="px-6 py-4 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      No users found in your department.
                    </td>
                  </tr>
                ) : (
                  users.map((user: any) => (
                    <tr key={user._id} className="hover:bg-gray-50 align-middle">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                            {user.name?.charAt(0) || "U"}
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-gray-500">{user.email}</td>
                      <td className="px-6 py-3 text-gray-500">{user.department}</td> 
                      <td className="px-6 py-3 text-gray-500">{user.wallet?.pointsBalance || 0}</td> 
                      <td className="px-6 py-3 text-center">
                        <Button
                          onClick={() => handleOpenUserRecognition(user)}
                          variant="outline"
                          className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                        >
                          Send
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="py-2 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      )}
    </div>
  );
}