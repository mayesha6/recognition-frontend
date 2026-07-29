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
  Coins,
  Ticket,
  ChartBarIcon,
  Tag,
  Award,
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
      name: "Employees",
      href: "/dept-admin/employee-management",
      icon: Users,
    },
    {
      name: "Recognitions",
      href: "/dept-admin/recognition",
      icon: Award,
    },
    // {
    //   name: "Reports",
    //   href: "/dept-admin/reports",
    //   icon: File,
    // },
    {
      name: "Reward Claim",
      href: "/dept-admin/reward-claim",
      icon: BaggageClaim,
    },
    {
      name: "Point Distribution",
      href: "/dept-admin/point-distribution",
      icon: Coins,
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
      href: "/[orgSlug]",
      icon: LayoutDashboard,
    },
    {
      name: "Departments",
      href: "/[orgSlug]/department-management",
      icon: Building2,
    },
    {
      name: "Employees",
      href: "/[orgSlug]/employee-management",
      icon: Users,
    },
    {
      name: "Recognitions",
      href: "/[orgSlug]/recognition",
      icon: Award,
    },
    {
      name: "Rewards & Redeem",
      href: "/[orgSlug]/rewards",
      icon: Gift,
    },
    {
      name: "Reward Claim",
      href: "/[orgSlug]/reward-claim",
      icon: BaggageClaim,
    },
    {
      name: "Support Ticket",
      href: "/[orgSlug]/support-ticket",
      icon: Ticket,
    },
    {
      name: "Settings",
      href: "/[orgSlug]/settings/general",
      icon: Settings,
    },
  ],

  "super-admin": [
    {
      name: "Dashboard",
      href: "/super-admin",
      icon: LayoutDashboard,
    },
    {
      name: "Organizations",
      href: "/super-admin/organizations",
      icon: Building2,
    },
    {
      name: "Departments",
      href: "/super-admin/department-management",
      icon: ChartBarIcon,
    },
    {
      name: "User Management",
      href: "/super-admin/user-management",
      icon: Users,
    },
    {
      name: "Subscription",
      href: "/super-admin/subscription",
      icon: Tag,
    },
    {
      name: "Revenue",
      href: "/super-admin/revenue",
      icon: Coins,
    },    
    {
      name: "Recognitions",
      href: "/super-admin/recognition",
      icon: Award,
    },
    {
      name: "Rewards & Redeem",
      href: "/super-admin/rewards",
      icon: Gift,
    },
    {
      name: "Reward Claim",
      href: "/super-admin/reward-claim",
      icon: BaggageClaim,
    },
    // {
    //   name: "Admins",
    //   href: "/super-admin/admins",
    //   icon: ShieldCheck,
    // },
    {
      name: "Support Ticket",
      href: "/super-admin/support-ticket",
      icon: Ticket,
    },
    {
      name: "Settings",
      href: "/super-admin/settings",
      icon: Settings,
    },
  ],
};