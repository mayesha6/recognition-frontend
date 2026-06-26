"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
// import { SendRecognitionFormValues } from "../../validation/recognition.schema";
import { RecipientUser } from "@/types/recognition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SendRecognitionFormValues } from "../validation/recognition.schema";

// Dummy data for search (Will be replaced by API)
const DUMMY_USERS: RecipientUser[] = [
  { id: "1", name: "Saifur Rahman", email: "saifur@example.com", departmentId: "d1", departmentName: "Engineering" },
  { id: "2", name: "Sarah Ahmed", email: "sarah@example.com", departmentId: "d2", departmentName: "Sales" },
];

interface SelectUserProps {
  prefilledUser: RecipientUser | null;
  onContinue: () => void;
}

export default function SelectUser({ prefilledUser, onContinue }: SelectUserProps) {
  const { setValue, watch, trigger, formState: { errors } } = useFormContext<SendRecognitionFormValues>();
  
  // Local state to manage the selected user for UI display
  const [selectedUser, setSelectedUser] = useState<RecipientUser | null>(prefilledUser);
  const [searchTerm, setSearchTerm] = useState(prefilledUser?.name || "");

  // Simulated User Search & Select Logic
  const handleUserSearch = (value: string) => {
    setSearchTerm(value);
    
    // Simulating finding a user (In production, use RTK Query / Debounce search here)
    const foundUser = DUMMY_USERS.find(u => u.name.toLowerCase().includes(value.toLowerCase()));
    
    if (foundUser && value.length > 2) {
      setSelectedUser(foundUser);
      setValue("recipientId", foundUser.id, { shouldValidate: true });
      setValue("departmentId", foundUser.departmentId);
    } else {
      setSelectedUser(null);
      setValue("recipientId", "");
      setValue("departmentId", "");
    }
  };

  const handleNext = async () => {
    // Validate only Step 1 fields before proceeding
    const isValid = await trigger(["recipientId"]);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <div className="flex justify-center items-start mt-10">
      <div className="bg-white rounded-2xl border shadow-sm w-full max-w-lg p-8 relative">
        
        {/* Close Button (Optional, can be hooked to onClose if needed) */}
        <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Who would you like to recognize?</h2>
          <p className="text-gray-500 text-sm">Search and select a team member from your organization</p>
        </div>

        <div className="space-y-6">
          {/* Full Name / Search Field */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
            <Input
              id="fullName"
              placeholder="e.g. Saifur"
              value={searchTerm}
              onChange={(e) => handleUserSearch(e.target.value)}
              disabled={!!prefilledUser} // Lock if prefilled
              className={`h-12 ${!!prefilledUser ? 'bg-gray-50 text-gray-500' : ''}`}
            />
            {errors.recipientId && (
              <p className="text-red-500 text-sm mt-1">{errors.recipientId.message}</p>
            )}
          </div>

          {/* Email Address Field (Auto-filled & Disabled) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              value={selectedUser?.email || ""}
              readOnly
              className="h-12 bg-gray-50 text-gray-500"
            />
          </div>

          {/* Department Field */}
          <div className="space-y-2">
            <Label htmlFor="department" className="text-gray-700 font-medium">
              Select from Departments <span className="text-gray-400 font-normal">(Optional)</span>
            </Label>
            <Select 
              disabled={!!prefilledUser} 
              value={selectedUser?.departmentId || ""}
              onValueChange={(val: string) => setValue("departmentId", val)}
            >
              <SelectTrigger className={`h-12 ${!!prefilledUser ? 'bg-gray-50' : ''}`}>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="d1">Engineering</SelectItem>
                <SelectItem value="d2">Sales</SelectItem>
                <SelectItem value="d3">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Button */}
          <Button 
            onClick={handleNext} 
            className="w-full h-12 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg text-base font-medium mt-4"
          >
            Continue to Details
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}