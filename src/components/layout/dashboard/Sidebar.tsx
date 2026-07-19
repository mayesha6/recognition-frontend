

// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LayoutDashboard, Send, Inbox, Target, Gift, Settings, BaggageClaim, LogOut } from "lucide-react";

// export default function Sidebar() {
//   const pathname = usePathname();

//   const navItems = [
//     { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
//     { name: "Send", href: "/user/send-recognition", icon: Send },
//     { name: "Inbox", href: "/user/received-recognition", icon: Inbox },
//     // { name: "Points", href: "/user/my-points", icon: Target },
//     { name: "Rewards", href: "/user/rewards", icon: Gift },
//     { name: "Claim List", href: "/user/claim-rewards", icon: BaggageClaim },
//     { name: "Settings", href: "/user/settings", icon: Settings },
//   ];

//   return (
//     <>
//       {/* ডেস্কটপ সাইডবার (w-64) */}
//       <aside className="hidden lg:flex w-64 bg-white border-r border-r-gray h-full flex-col pt-6">
//         <nav className="flex-1 px-4 space-y-1">
//   {navItems.map((item) => {
//     const isActive = pathname === item.href;

//     return (
//       <Link 
//         key={item.name} 
//         href={item.href}
//         className={`flex items-center gap-3 px-4 py-3 border-l-4 transition-all duration-200 
//           ${isActive 
//             ? "border-l-black bg-gray-50 text-black shadow-custom-card rounded-[10px]" // Active স্টাইল
//             : "border-l-transparent text-gray-600 hover:border-l-transparent hover:bg-gray-50 hover:rounded-[10px] hover:shadow-custom-card" // Hover স্টাইল
//           }`}
//       >
//         <item.icon className={`w-5 h-5 ${isActive ? "text-black" : "text-gray-600"}`} /> 
//         {item.name}
//       </Link>
//     );
//   })}
// </nav>
//         <div className="p-4 border border-gray rounded-xl m-4">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">SR</div>
//           <div>
//             <p className="text-sm font-bold">Saifur Rahman</p>
//             <p className="text-xs text-gray-500">Super Admin</p>
//           </div>
//         </div>
//         <button className="flex items-center gap-2 bg-[#F3F4F6] w-full text-sm text-gray-600 rounded-xl text-center justify-center py-1"><LogOut className="w-4 h-4" /> Logout</button>
//       </div>
//       </aside>

//       {/* মোবাইল বটম নেভিগেশন (শুধুমাত্র আইকন) */}
//       <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around p-3 z-50">
//         {navItems.map((item) => (
//           <Link key={item.name} href={item.href}
//             className={`flex flex-col items-center gap-1 ${pathname === item.href ? "text-primary" : "text-gray-500"}`}>
//             <item.icon className="w-6 h-6" />
//             <span className="text-[10px]">{item.name}</span>
//           </Link>
//         ))}
//         <div className="flex flex-col items-center gap-1 text-gray-500">
//           <LogOut className="w-6 h-6" />
//           <span className="text-[10px]">Logout</span>
//         </div>
//       </nav>



//     </>
//   );
// }


"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { sidebarConfig } from "@/config/sidebar.config";
import { UserRole } from "@/types/auth";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { logout } from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/authApi";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Get current user profile from RTK Query / auth state
  const token = useAppSelector((state) => state.auth?.token) || Cookies.get("accessToken");
  const { data: profileData } = useGetMeQuery(undefined, { skip: !token });
  const currentUser = profileData?.data;

  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<UserRole>("user");

  useEffect(() => {
    // ২. ক্লায়েন্ট সাইডে লোড হলে লোকাল স্টোরেজ থেকে রোল সেট করুন
    const storedRole = localStorage.getItem("role") as UserRole || "user";
    setRole(storedRole);
    setMounted(true);
  }, []);

  // Update role dynamically based on logged in user's role from backend
  const activeRole: UserRole = currentUser?.role
    ? (currentUser.role.toLowerCase().replace("_", "-") as UserRole)
    : role;

  // ৩. মাউন্ট না হওয়া পর্যন্ত কিছুই রেন্ডার করবেন না বা লোডিং দেখান
  if (!mounted) return <aside className="hidden lg:flex w-64 bg-white border-r h-full" />;

  const navItems = sidebarConfig[activeRole] || sidebarConfig["user"];

  const user = {
    name: currentUser?.name || "Saifur Rahman",
    role: activeRole,
  };

  const initials = user.name
    ? user.name
      .split(" ")
      .map((item: string) => item[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "https://greetely.com/login";
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-r-gray h-full flex-col pt-6">
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 border-l-4 transition-all duration-200
                ${isActive
                    ? "border-l-black bg-gray-50 text-black shadow-custom-card rounded-[10px]"
                    : "border-l-transparent text-gray-600 hover:border-l-transparent hover:bg-gray-50 hover:rounded-[10px] hover:shadow-custom-card"
                  }`}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "text-black" : "text-gray-600"
                    }`}
                />

                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border border-gray rounded-xl m-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold overflow-hidden border border-gray-200 shrink-0">
              {currentUser?.picture ? (
                <Image
                  src={currentUser.picture}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <div>
              <p className="text-sm font-bold">{user.name}</p>

              <p className="text-xs text-gray-500 capitalize">
                {user.role.replace("-", " ")}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#F3F4F6] w-full text-sm text-gray-600 rounded-xl text-center justify-center py-1 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around p-3 z-50">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${pathname === item.href ? "text-primary" : "text-gray-500"
              }`}
          >
            <item.icon className="w-6 h-6" />

            <span className="text-[10px]">{item.name}</span>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
        >
          <LogOut className="w-6 h-6" />

          <span className="text-[10px]">Logout</span>
        </button>
      </nav>
    </>
  );
}