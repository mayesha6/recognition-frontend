"use client";

import ChangePassword from "@/modules/user/setting/components/ChangePassword";
import ContactInfo from "@/modules/user/setting/components/ContactInfo";
import GeneralSettings from "@/modules/user/setting/components/GeneralSettings";
import DangerZone from "@/modules/user/setting/components/DangerZone";
import { useGetMeQuery } from "@/redux/api/authApi";

export default function SettingsPage() {
  const { data: userRes, isLoading } = useGetMeQuery(undefined);
  const user = userRes?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading settings...</p>
      </div>
    );
  }

  const userData = {
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || (user?.role === "SUPER_ADMIN" ? "Super Admin" : "System Admin"),
    organization: user?.role === "SUPER_ADMIN" ? "Greetely System" : (user?.organizationId?.name || (typeof user?.organizationId === "string" ? user?.organizationId : "Greetely")),
    profilePicture: user?.picture || "",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        <GeneralSettings user={userData} />
        <ContactInfo user={userData} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChangePassword />
        <DangerZone />
      </div>
    </div>
  );
}