"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
// import SendRecognitionWizard from "@/modules/recognition/components/SendRecognitionWizard";
import { RecipientUser, SenderUser } from "@/types/recognition";
import SendRecognitionWizard from "@/modules/user/recognition/components/SendRecognitionWizard";

// Dummy data representing users in the logged-in user's department
const departmentUsers: SenderUser[] = [
  { id: "1", name: "Saifur Rahman", email: "saifur@example.com", departmentId: "d1", departmentName: "Engineering", points: 50, tone: "Tone", recognitionValue: 10, category: "Category", message: "Great job on the project!" },
  { id: "2", name: "Ralph Edwards", email: "ralph@example.com", departmentId: "d1", departmentName: "Engineering", points: 50, tone: "Tone", recognitionValue: 10, category: "Category", message: "Great job on the project!" },
];

export default function ReceiveRecognitionPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SenderUser | null>(null);

  // Flow 1: Top Button Clicked (Blank/Guest)
  const handleOpenGuestRecognition = () => {
    setSelectedUser(null);
    setIsWizardOpen(true);
  };

  // Flow 2: Table Row Button Clicked (Prefilled)
//   const handleOpenUserRecognition = (user: SenderUser) => {
//     setSelectedUser(user);
//     setIsWizardOpen(true);
//   };

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
      {/* Top Bar - রেসপনসিভ ফ্লেক্স */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Receive Recognition</h1>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400" />
            <Input placeholder="Search..." className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-transparent" />
          </div>
          <Button onClick={handleOpenGuestRecognition} className="bg-gradient hover:opacity-90 text-white whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            Receive Recognition
          </Button>
        </div>
      </div>

      {/* Department Users Table - Wrapper added for responsiveness */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-200">
            <thead className="border-b border-gray-200 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">RECIPIENT</th>
                <th className="px-6 py-4">EMAIL</th>
                <th className="px-6 py-4">DEPARTMENT</th>
                <th className="px-6 py-4">POINTS</th>
                <th className="px-6 py-4">TONE</th>
                <th className="px-6 py-4">RECOGNITION VALUE</th>
                <th className="px-6 py-4">CATEGORY</th>
                <th className="px-6 py-4">MESSAGE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {departmentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 align-middle">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-gray-500">{user.email}</td>
                  <td className="px-6 py-3 text-gray-500">{user.departmentName}</td>
                  <td className="px-6 py-3 text-gray-500">{user.points}</td>
                  <td className="px-6 py-3 text-gray-500">{user.tone}</td>
                  <td className="px-6 py-3 text-gray-500">{user.recognitionValue}</td>
                  <td className="px-6 py-3 text-gray-500">{user.category}</td>
                  <td className="px-6 py-3 text-gray-500">{user.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}  