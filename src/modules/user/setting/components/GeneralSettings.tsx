"use client"; 

import Image from "next/image";
import { useRef } from "react";
import { useUpdateMyProfileMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import { formatErrorMessage } from "@/utils/formatError";

export default function GeneralSettings({ user }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append("files", file);

      try {
        await updateProfile(formData).unwrap();
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        console.error("Failed to upload profile picture:", error);
        toast.error(formatErrorMessage(error, "Failed to upload profile picture. Please try again."));
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
      <h3 className="font-light text-2xl mb-4">General Settings</h3>
      <div className="flex items-center gap-6">
        <div className="relative w-57.5 h-57.5 overflow-hidden rounded-xl bg-gray-100 border border-gray-200">
          <Image
            src={user?.profilePicture || "/default-avatar.png"}
            alt="Profile Photo"
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-avatar.png";
            }}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 backdrop-blur-[1px]">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div> 
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={handleButtonClick}
            disabled={isLoading}
            className="px-4 py-2 border border-gray rounded-lg hover:bg-gray-50 text-sm font-medium transition-all disabled:opacity-50"
          >
            {isLoading ? "Uploading..." : "Change Photo"}
          </button>
          <p className="text-xs text-gray-400 mt-2">JPEG, PNG, WEBP · max 2MB</p>
        </div>
      </div>
    </div>
  );
}