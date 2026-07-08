"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // বর্তমান পাথ ট্র্যাক করার জন্য
import { User, ShieldCheck, Coins, GitBranch, MessageSquare, Star } from "lucide-react";

const tabs = [
  { name: "General", icon: User, path: "/org-admin/settings/general" },
  { name: "Admin Access", icon: ShieldCheck, path: "/org-admin/settings/admin-access" },
  { name: "Points Allocation", icon: Coins, path: "/org-admin/settings/point-allocation" },
  { name: "Category", icon: GitBranch, path: "/org-admin/settings/category" },
  { name: "Tone", icon: MessageSquare, path: "/org-admin/settings/tone" },
  { name: "Recognition Value", icon: Star, path: "/org-admin/settings/recognition-value" },
];

export default function SettingsTabs() {
  const pathname = usePathname(); // বর্তমানে কোন পেজে আছেন তা চেক করবে

  return (
    <div className="flex items-center gap-2 p-1 bg-white border border-gray-100 rounded-xl overflow-x-auto w-fit">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path; // পাথ চেক করে একটিভ ক্লাস বসাবে
        const Icon = tab.icon;

        return (
          <Link
            key={tab.name}
            href={tab.path}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
              ${isActive 
                ? "bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
          >
            <Icon size={16} />
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}