import { UserRole } from "@/types/auth";

export const dashboardRoutes: Record<UserRole, string> = {
  "user": "/user/dashboard",
  "dept-admin": "/dept-admin/dashboard",
  "org-admin": "/org-admin/dashboard",
  "super-admin": "/super-admin/dashboard",
};