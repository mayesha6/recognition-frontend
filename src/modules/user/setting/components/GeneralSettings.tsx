"use client"; 

import Image from "next/image";

export default function GeneralSettings({ user }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-light text-2xl mb-4">General Settings</h3>
      <div className="flex items-center gap-6">
        <div className="relative w-57.5 h-57.5 overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={user?.profilePicture || "/default-avatar.png"}
            alt="Profile Photo"
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-avatar.png";
            }}
          />
        </div> 
        <div>
          <button className="px-4 py-2 border border-gray rounded-lg hover:bg-gray-50 text-sm">
            Change Photo
          </button>
          <p className="text-xs text-gray-400 mt-2">JPEG, PNG, WEBP · max 2MB</p>
        </div>
      </div>
    </div>
  );
}