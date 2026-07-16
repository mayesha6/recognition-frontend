"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
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

// Cleaned up dummy users. Using react-hook-form to manage form state directly.

interface SelectUserProps {
  prefilledUser: any;
  onContinue: () => void;
  onClose: () => void;
}

export default function SelectUser({ prefilledUser, onContinue }: SelectUserProps) {
  const { setValue, watch, trigger, formState: { errors } } = useFormContext<SendRecognitionFormValues>();
  
  const getNormalizedDepartment = (user: any) => {
    if (!user) return "";
    const dept = user?.departmentId || user?.department?.name || user?.departmentName || user?.department || "";
    if (typeof dept !== "string") return "";
    return dept.trim();
  };

  useEffect(() => {
    if (prefilledUser) {
      const recipientId = prefilledUser?._id || prefilledUser?.id || "";
      const departmentId = getNormalizedDepartment(prefilledUser);
      setValue("recipientId", recipientId, { shouldValidate: true });
      setValue("departmentId", departmentId);
      setValue("recipientName", prefilledUser?.name || "");
      setValue("department", departmentId);
      setValue("receiverEmail", prefilledUser?.email || "");
    } else {
      // Guest Recognition flow: prefill recipientId as "guest" and department as "Guest"
      setValue("recipientId", "guest", { shouldValidate: true });
      setValue("departmentId", "Guest");
      setValue("department", "Guest");
    }
  }, [prefilledUser, setValue]);

  const recipientName = watch("recipientName") || "";
  const receiverEmail = watch("receiverEmail") || "";
  const department = watch("department") || "Guest";

  const handleNext = async () => {
    // Validate Step 1 fields before proceeding
    const isValid = await trigger(["recipientId", "recipientName", "receiverEmail"]);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <div className="flex justify-center items-start mt-10">
      <div className="bg-white rounded-2xl border border-gradient shadow-sm w-full max-w-lg p-8 relative">
        
        {/* Close Button (Optional, can be hooked to onClose if needed) */}
        {/* <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button> */}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Who would you like to recognize?</h2>
          <p className="text-gray-500 text-sm">Search and select a team member or fill guest details</p>
        </div>

        <div className="space-y-6">
          {/* Full Name / Search Field */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
            <Input
              id="fullName"
              placeholder="e.g. Saifur"
              value={recipientName}
              onChange={(e) => setValue("recipientName", e.target.value, { shouldValidate: true })}
              disabled={!!prefilledUser} // Lock if prefilled
              className="h-12 border border-gray focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.recipientName && (
              <p className="text-red-500 text-sm mt-1">{errors.recipientName.message}</p>
            )}
          </div>

          {/* Email Address Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              value={receiverEmail}
              onChange={(e) => setValue("receiverEmail", e.target.value, { shouldValidate: true })}
              disabled={!!prefilledUser} // Lock if prefilled
              className="h-12 border border-gray focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.receiverEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.receiverEmail.message}</p>
            )}
          </div>

          {/* Department Field */}
          <div className="space-y-2">
            <Label htmlFor="department" className="text-gray-700 font-medium">
              Select from Departments <span className="text-gray-400 font-normal">(Optional)</span>
            </Label>
            <Select 
              disabled={true} 
              value={department}
            >
              <SelectTrigger className="h-12 border border-gray focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={department}>{department}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Button */}
          <Button 
            onClick={handleNext} 
            className="w-full h-12 bg-gradient hover:bg-[#7C3AED] text-white rounded-lg text-base font-medium mt-4"
          >
            Continue to Details
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}