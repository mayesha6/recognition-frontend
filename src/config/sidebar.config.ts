import {
  LayoutDashboard,
  Send,
  Inbox,
  Gift,
  Settings,
  BaggageClaim,
  Users,
  Building2,
  Trophy,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

import { UserRole } from "@/types/auth";

export interface SidebarItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarConfig: Record<UserRole, SidebarItem[]> = {
  user: [
    {
      name: "Dashboard",
      href: "/user/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Send",
      href: "/user/send-recognition",
      icon: Send,
    },
    {
      name: "Inbox",
      href: "/user/received-recognition",
      icon: Inbox,
    },
    {
      name: "Rewards",
      href: "/user/rewards",
      icon: Gift,
    },
    {
      name: "Claim List",
      href: "/user/claim-rewards",
      icon: BaggageClaim,
    },
    {
      name: "Settings",
      href: "/user/settings",
      icon: Settings,
    },
  ],

  "dept-admin": [
    {
      name: "Dashboard",
      href: "/dept-admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      href: "/dept-admin/users",
      icon: Users,
    },
    {
      name: "Recognitions",
      href: "/dept-admin/recognitions",
      icon: Trophy,
    },
    {
      name: "Settings",
      href: "/dept-admin/settings",
      icon: Settings,
    },
  ],

  "org-admin": [
    {
      name: "Dashboard",
      href: "/org-admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Departments",
      href: "/org-admin/departments",
      icon: Building2,
    },
    {
      name: "Users",
      href: "/org-admin/users",
      icon: Users,
    },
    {
      name: "Rewards",
      href: "/org-admin/rewards",
      icon: Gift,
    },
    {
      name: "Settings",
      href: "/org-admin/settings",
      icon: Settings,
    },
  ],

  "super-admin": [
    {
      name: "Dashboard",
      href: "/super-admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Organizations",
      href: "/super-admin/organizations",
      icon: Building2,
    },
    {
      name: "Admins",
      href: "/super-admin/admins",
      icon: ShieldCheck,
    },
    {
      name: "Users",
      href: "/super-admin/users",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/super-admin/settings",
      icon: Settings,
    },
  ],
};