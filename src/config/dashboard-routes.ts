import { UserRole } from "@/types/auth";

export const dashboardRoutes: Record<UserRole, string> = {
  "user": "/user/dashboard",
  "dept-admin": "/[orgSlug]/dept-admin/dashboard",
  "org-admin": "/[orgSlug]",
  "super-admin": "/super-admin/dashboard",
};