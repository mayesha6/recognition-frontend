"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Eye, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import SendRecognitionWizard from "@/modules/user/recognition/components/SendRecognitionWizard";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useGetRecognitionHistoryQuery, useDeleteRecognitionMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import Pagination from "@/components/common/pagination";

export default function ReceiveRecognitionPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal States
  const [viewRecognition, setViewRecognition] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Get current user profile
  const { data: userRes, isLoading: isProfileLoading } = useGetMeQuery(undefined);
  const currentUser = userRes?.data;

  // Get recognition history filtered by receiver email, page, limit, and search term
  const { data: historyRes, isLoading: isHistoryLoading, isError } = useGetRecognitionHistoryQuery(
    currentUser?.email
      ? { 
          receiverEmail: currentUser.email,
          page: currentPage,
          limit: 10,
          searchTerm: searchTerm || undefined
        }
      : undefined,
    { skip: !currentUser?.email }
  );

  // Delete Mutation
  const [deleteRecognition, { isLoading: isDeleting }] = useDeleteRecognitionMutation();

  const recognitions = historyRes?.data || [];
  const meta = historyRes?.meta || {};
  const totalPages = meta?.totalPage || 1;

  // Helper to format displayName from email (e.g. john.doe@company.com -> John Doe)
  const getDisplayNameFromEmail = (email: string) => {
    if (!email) return "User";
    const username = email.split("@")[0];
    return username
      .split(/[._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  // Flow 1: Top Button Clicked (Blank/Guest)
  const handleOpenGuestRecognition = () => {
    setSelectedUser(null);
    setIsWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRecognition(deleteId).unwrap();
      toast.success("Recognition deleted successfully");
      setDeleteId(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete recognition");
    }
  };

  // Filter recognitions based on search term (supports name, email, message, etc. instantly)
  const filteredRecognitions = recognitions.filter((rec: any) => {
    const term = searchTerm.toLowerCase();
    const displayName = (rec.senderName || getDisplayNameFromEmail(rec.senderEmail)).toLowerCase();
    return (
      displayName.includes(term) ||
      rec.senderEmail?.toLowerCase().includes(term) ||
      rec.message?.toLowerCase().includes(term)
    );
  });

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
      {/* Top Bar - রেসপনসিভ ফ্লেক্স */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Receive Recognition</h1>
        
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

      {/* Department Users Table - Wrapper added for responsiveness */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isProfileLoading || isHistoryLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading received recognitions...</p>
          </div>
        ) : isError ? (
          <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg border border-red-200">
            Failed to load received recognitions. Please try again.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-200">
              <thead className="border-b border-gray-200 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">SENDER</th>
                  <th className="px-6 py-4">EMAIL</th>
                  <th className="px-6 py-4">POINTS</th>
                  <th className="px-6 py-4">MESSAGE</th>
                  <th className="px-6 py-4 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecognitions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      No received recognitions found.
                    </td>
                  </tr>
                ) : (
                  filteredRecognitions.map((rec: any) => {
                    const displayName = rec.senderName || getDisplayNameFromEmail(rec.senderEmail);
                    return (
                      <tr key={rec._id} className="hover:bg-gray-50 align-middle">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                              {displayName.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900 truncate max-w-[150px]">{displayName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-gray-500">{rec.senderEmail}</td>
                        <td className="px-6 py-3 text-gray-500 font-bold">
                          <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs">
                            {rec.points} pts
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-500 max-w-[300px]">
                          <p className="line-clamp-2">{rec.message}</p>
                        </td>
                        <td className="px-6 py-3 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => setViewRecognition(rec)}
                              className="text-gray-400 hover:text-indigo-600 transition-colors"
                              title="View"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => setDeleteId(rec._id)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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

      {/* View Recognition Detail Modal */}
      {viewRecognition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-[4px] transition-opacity">
          {/* Card Container */}
          <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between p-8 min-h-[500px] text-white animate-in fade-in zoom-in-95 duration-200">
            
            {/* Background Image / Gradient */}
            {viewRecognition.image ? (
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${viewRecognition.image})` }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900" />
            )}
            
            {/* Dark overlay to ensure text contrast */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[440px] w-full">
              
              {/* Top Row: Brand & Close Button */}
              <div className="flex justify-between items-start w-full">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white mb-6">Greetely</h2>
                  <div className="space-y-0.5">
                    <p className="text-xs uppercase tracking-wider text-white/60 font-semibold">From:</p>
                    <p className="text-2xl font-black text-white leading-tight">
                      {viewRecognition.senderName || getDisplayNameFromEmail(viewRecognition.senderEmail)}
                    </p>
                    <p className="text-sm font-medium text-white/85">{viewRecognition.senderEmail}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setViewRecognition(null)}
                  className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors backdrop-blur-sm bg-white/10 border border-white/15"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Middle Row: Glassmorphism Message Box */}
              <div className="my-6 bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                <p className="text-white text-base leading-relaxed font-normal">
                  {viewRecognition.message}
                </p>
              </div>

              {/* Bottom Row: Points */}
              <div className="flex justify-end items-center w-full">
                <span className="text-2xl font-black tracking-tight text-white">
                  {viewRecognition.points} Pts
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] transition-opacity">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200 p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Delete Recognition</h2>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this received recognition? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                onClick={() => setDeleteId(null)}
                variant="outline"
                disabled={isDeleting}
                className="text-gray-700 border-gray-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}