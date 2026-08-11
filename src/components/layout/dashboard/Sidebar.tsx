

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
import { LogOut, MoreVertical, Trash2 } from "lucide-react";

import { sidebarConfig } from "@/config/sidebar.config";
import { UserRole } from "@/types/auth";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { logout } from "@/redux/features/authSlice";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useDeleteOwnAccountMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { slugify } from "@/utils/slugify";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [deleteOwnAccount, { isLoading: isDeleting }] = useDeleteOwnAccountMutation();

  useEffect(() => {
    // ২. ক্লায়েন্ট সাইডে লোড হলে লোকাল স্টোরেজ থেকে রোল সেট করুন
    const storedRole = localStorage.getItem("role") as UserRole || "user";
    setRole(storedRole);
    setMounted(true);
  }, []);

  // Update role dynamically based on logged in user's role from backend
  const getMappedRole = (r: string): UserRole => {
    if (r === "SUPER_ADMIN") return "super-admin";
    if (r === "ORGANIZATION_ADMIN") return "org-admin";
    if (r === "DEPARTMENT_ADMIN") return "dept-admin";
    return "user";
  };

  const activeRole: UserRole = currentUser?.role
    ? getMappedRole(currentUser.role)
    : role;

  // ৩. মাউন্ট না হওয়া পর্যন্ত কিছুই রেন্ডার করবেন না বা লোডিং দেখান
  if (!mounted) return <aside className="hidden lg:flex w-64 bg-white border-r h-full" />;

  let navItems = sidebarConfig[activeRole] || sidebarConfig["user"];
  if ((activeRole === "org-admin" || activeRole === "dept-admin") && currentUser) {
    let orgName = "";
    if (currentUser.role === "ORGANIZATION_ADMIN") {
      orgName = currentUser.companyName || currentUser.name || "";
    } else if (currentUser.role === "DEPARTMENT_ADMIN") {
      orgName = currentUser.organizationId?.companyName || currentUser.organizationId?.name || (typeof currentUser.organizationId === "string" ? currentUser.organizationId : "");
    }
    if (orgName) {
      const orgSlug = slugify(orgName);
      navItems = navItems.map((item) => ({
        ...item,
        href: item.href.replace("[orgSlug]", orgSlug),
      }));
    }
  }

  const user = {
    name: currentUser?.name || "Saifur Rahman",
    role: activeRole,
  };

  const initials = user.name
    ? user.name
      .split(" ")
      .filter((word: string) => /^[a-zA-Z0-9]/.test(word))
      .map((item: string) => item[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || user.name.charAt(0).toUpperCase()
    : "U";

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "https://greetely.com/login";
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteOwnAccount(undefined).unwrap();
      toast.success("Account deleted successfully.");
      handleLogout();
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
    }
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

        <div className="p-4 border border-gray rounded-xl m-4 relative">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold overflow-hidden border border-gray-200 shrink-0 relative">
                {currentUser?.picture ? (
                  <Image
                    src={currentUser.picture}
                    alt={user.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold truncate text-gray-900 pr-1" title={user.name}>
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {user.role.replace("-", " ")}
                </p>
              </div>
            </div>

            <div className="relative shrink-0">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                title="Account Settings"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {dropdownOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-gray-500" />
                    Logout
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsDeleteModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm text-red-600 hover:bg-red-50/50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-t-gray flex justify-start items-center gap-6 p-3 px-6 z-50 overflow-x-auto scrollbar-none">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 shrink-0 ${pathname === item.href ? "text-primary" : "text-gray-500"
              }`}
          >
            <item.icon className="w-6 h-6" />

            <span className="text-[10px]">{item.name}</span>
          </Link>
        ))}

        <div className="relative shrink-0">
          <button
            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            className="flex flex-col items-center gap-1 text-gray-500 cursor-pointer"
          >
            <MoreVertical className="w-6 h-6" />
            <span className="text-[10px]">Settings</span>
          </button>

          {mobileDropdownOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
                Logout
              </button>
              <button
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setIsDeleteModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm text-red-600 hover:bg-red-50/50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
                Delete Account
              </button>
            </div>
          )}
        </div>
      </nav>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Your Account"
        itemName={user.name}
        description={
          currentUser?.role === "ORGANIZATION_ADMIN"
            ? "Are you sure you want to delete your organization account? This will permanently remove your organization and all user accounts under it. This action cannot be undone."
            : "Are you sure you want to delete your account? This action is permanent and cannot be undone."
        }
        isLoading={isDeleting}
      />
    </>
  );
}