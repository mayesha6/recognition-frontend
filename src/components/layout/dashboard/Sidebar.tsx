"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Send, Inbox, Target, Gift, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-r-gray flex flex-col h-full pt-6">
      {/* এখানে আর লোগো নেই */}
      <nav className="flex-1 px-4 space-y-1">
        {[
          { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
          { name: "Send Recog.", href: "/user/send-recognition", icon: Send },
          { name: "Received Recog.", href: "/user/received", icon: Inbox },
          { name: "My Point", href: "/user/points", icon: Target },
          { name: "Rewards & Redeem", href: "/user/rewards", icon: Gift },
          { name: "Settings", href: "/user/settings", icon: Settings },
        ].map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 text-gray-600 border-l-4  border-l-transparent hover:border-l-black hover:rounded-[10px] rounded-lg hover:shadow-custom-card">
            <item.icon className="w-5 h-5" /> {item.name}
          </Link>
        ))}
      </nav>

      {/* প্রোফাইল সেকশন */}
      <div className="p-4 border border-gray rounded-xl m-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">SR</div>
          <div>
            <p className="text-sm font-bold">Saifur Rahman</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#F3F4F6] w-full text-sm text-gray-600 rounded-xl text-center justify-center py-1"><LogOut className="w-4 h-4" /> Logout</button>
      </div>
    </aside>
  );
}