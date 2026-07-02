export type UserRole =
  | "user"
  | "dept-admin"
  | "org-admin"
  | "super-admin";

export interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}