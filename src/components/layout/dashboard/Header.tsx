"use client";
import { Search, Bell, Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Link from "next/link";

import { useSelector } from "react-redux"; // useSelector এর জন্য
import { RootState } from "@/redux/store"; // তোমার স্টোর টাইপের জন্য
import { useGetMeQuery } from "@/redux/api/authApi"; // RTK Query এর জন্য
import Cookies from "js-cookie"; // Cookies লাইব্রেরির জন্য

export default function Header() {
  const token = useSelector((state: RootState) => state.auth?.token);
  const { data: profileData } = useGetMeQuery(undefined, { skip: !token });
  
  const user = profileData?.data;
  const tokenKeep = Cookies.get("accessToken");
  const isAuthenticated = !!tokenKeep && !!user;

  console.log("Header - User Data:", user);
  console.log("Header - isAuthenticated Data:", isAuthenticated);
  // Role labeling logic
  const getRoleLabel = (role?: string) => {
    if (role === "SUPER_ADMIN") return "Super Admin";
    if (role === "ADMIN") return "Administrator";
    return "User";
  };
  return (
    <header className="h-auto md:h-20 bg-white border-b border-b-gray flex  items-center justify-between px-4 md:px-8 py-3 gap-4">
      {/* লোগো সেকশন */}
      <div className="flex items-center gap-2">
        {/* মোবাইল মেনু বাটন (Sidebar কন্ট্রোলের জন্য) */}
        {/* <Menu className="w-6 h-6 lg:hidden cursor-pointer" /> */}
        {/* <Image 
          src={logo} 
          alt="Greetely Logo" 
          width={112} 
          height={56} 
          priority 
          className="w-24 md:w-28"
        /> */}
        <Link href="http://localhost:3041/" className="flex items-center gap-2 shrink-0">
            <Image
              src={logo} 
              alt="Greetely Logo"
              width={500}
              height={500}
              className="w-32 h-12 object-contain"
            />
          </Link>
      </div>

      {/* সার্চবার এবং প্রোফাইল */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* সার্চবার - মোবাইল এবং ডেস্কটপে সাইজ পরিবর্তন */}
        {/* <div className="flex flex-1 md:w-96 h-10 items-center border rounded-[10px] border-gradient px-3 gap-2">
          <Search className="text-gray-400 w-4 h-4" />
          <input 
            className="w-full focus:outline-none text-sm" 
            placeholder="Search..." 
          />
        </div> */}
        
        {/* <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-500 cursor-pointer shrink-0" /> */}
        
        {/* প্রোফাইল - শুধুমাত্র ডেস্কটপে টেক্সট দেখাবে */}
        <div className="flex items-center gap-6">
        <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-orange-500 transition-colors" />
        
        <div className="h-8 w-px bg-gray-200"></div> {/* Divider */}

        {isAuthenticated && user && (
          <div className="flex items-center gap-3">
            {/* প্রোফাইল ইমেজ */}
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center border border-gray-200 overflow-hidden">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-orange-600 font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* ইউজার তথ্য */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">{user.name}</span>
              <span className="text-xs text-gray-500">{getRoleLabel(user.role)}</span>
            </div>
            
            <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />
          </div>
        )}
      </div>
      </div>
    </header>
  );
}