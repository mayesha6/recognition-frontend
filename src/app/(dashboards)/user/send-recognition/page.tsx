"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
// import SendRecognitionWizard from "@/modules/recognition/components/SendRecognitionWizard";
import { RecipientUser } from "@/types/recognition";
import SendRecognitionWizard from "@/modules/user/recognition/components/SendRecognitionWizard";

// Dummy data representing users in the logged-in user's department
const departmentUsers: RecipientUser[] = [
  { id: "1", name: "Saifur Rahman", email: "saifur@example.com", departmentId: "d1", departmentName: "Engineering" },
  { id: "2", name: "Ralph Edwards", email: "ralph@example.com", departmentId: "d1", departmentName: "Engineering" },
];

export default function SendRecognitionPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RecipientUser | null>(null);

  // Flow 1: Top Button Clicked (Blank/Guest)
  const handleOpenGuestRecognition = () => {
    setSelectedUser(null);
    setIsWizardOpen(true);
  };

  // Flow 2: Table Row Button Clicked (Prefilled)
  const handleOpenUserRecognition = (user: RecipientUser) => {
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
    <div className="flex flex-col gap-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Send Recognition</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search department..." className="w-64 pl-9" />
          </div>
          {/* Top Button: Guest/Blank Recognition */}
          <Button onClick={handleOpenGuestRecognition} className="bg-indigo-500 hover:bg-indigo-600">
            <Plus className="w-4 h-4 mr-2" />
            Send Recognition
          </Button>
        </div>
      </div>

      {/* Department Users Table */}
      <div className="bg-white rounded-lg border-gray border px-6 py-2">
        <table className="w-full text-sm text-left">
          <thead className=" border-b border-b-gray text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">RECIPIENT</th>
              <th className="px-6 py-4">EMAIL</th>
              <th className="px-6 py-4">DEPARTMENT</th>
              <th className="px-6 py-4">TONE</th>
              <th className="px-6 py-4">CATEGORY</th>
              <th className="px-6 py-4 ">RECOGNITION VALUE</th>
              <th className="px-6 py-4 ">POINTS</th>
              <th className="px-6 py-4 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="  divide-y divide-gray">
            {departmentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-2 text-gray-500">{user.email}</td>
                <td className="px-6 py-2 text-gray-500">{user.departmentName}</td>
                <td className="px-6 py-2 text-gray-500">{user.tone}</td>
                <td className="px-6 py-2 text-gray-500">{user.category}</td>
                <td className="px-6 py-2 text-gray-500">{user.recognitionValue}</td>
                <td className="px-6 py-2 text-gray-500">{user.points}</td>
                <td className="px-6 py-2 text-right">
                  {/* Row Button: Prefilled Recognition */}
                  <Button
                    onClick={() => handleOpenUserRecognition(user)}
                    variant="outline"
                    className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                  >
                    Send Recognition
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}