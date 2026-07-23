"use client";

import { useGetMeQuery } from "@/redux/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ShieldAlert, LogOut, ArrowUpRight } from "lucide-react";
import { RootState } from "@/redux/store";

export default function SubscriptionGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth?.token) || Cookies.get("accessToken");
  
  const { data: profileData, isLoading } = useGetMeQuery(undefined, { skip: !token });
  const user = profileData?.data;

  // Check if user is Org Admin and subscription is not active or trialing
  const isOrgAdmin = user?.role === "ORGANIZATION_ADMIN";
  const isSubscriptionInactive =
    isOrgAdmin &&
    user?.subscriptionStatus !== "ACTIVE" &&
    user?.subscriptionStatus !== "TRIAL";

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/login");
  };

  const handleUpgrade = () => {
    // Redirect to the main landing page pricing section
    window.location.href = "https://greetely.com";
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-2">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        <p className="text-sm text-gray-500 font-medium animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  if (isSubscriptionInactive) {
    return (
      <div className="fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
          {/* Warning Icon with premium animation */}
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-6 ring-8 ring-rose-50/50">
            <ShieldAlert size={32} className="animate-bounce" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Subscription Inactive</h2>
          
          <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-[280px]">
            Organization subscription is not active. Please upgrade your plan to access the dashboard.
          </p>

          <div className="w-full space-y-3">
            <button
              onClick={handleUpgrade}
              className="w-full bg-gradient hover:opacity-95 text-white py-3.5 rounded-xl font-medium text-sm transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Upgrade Plan
              <ArrowUpRight size={16} />
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3.5 rounded-xl font-medium text-sm transition-all border border-gray-200 flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
