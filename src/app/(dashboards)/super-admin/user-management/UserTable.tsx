"use client";
import Pagination from "@/components/common/pagination";
import { Pencil, Trash2 } from "lucide-react";

export default function UserTable({
  data, 
  onDelete, 
  onEdit,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showOrganization = false
}: any) {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-4">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              {showOrganization && <th className="px-6 py-4 font-medium">Organization</th>}
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={showOrganization ? 7 : 6} className="px-6 py-10 text-center text-gray-500 font-medium">
                  No users found.
                </td>
              </tr>
            ) : (
              data.map((user: any, i: any) => {
                const initials = user.initials || (user.name ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2) : "U");
              const isActive = user.isActive === "ACTIVE" || user.status === "ACTIVE" || user.isActive === true;
              const roleDisplay = user.role === "SUPER_ADMIN" ? "Super Admin" : user.role === "ORGANIZATION_ADMIN" ? "Org Admin" : user.role === "DEPARTMENT_ADMIN" ? "Dept Admin" : "User";

              const getRoleBadgeColor = (role: string) => {
                switch (role) {
                  case "SUPER_ADMIN":
                    return "bg-purple-100 text-purple-800";
                  case "ORGANIZATION_ADMIN":
                    return "bg-blue-100 text-blue-800";
                  case "DEPARTMENT_ADMIN":
                    return "bg-indigo-100 text-indigo-800";
                  default:
                    return "bg-slate-100 text-slate-800";
                }
              };

              const orgNameDisplay = user.role === "SUPER_ADMIN"
                ? "Greetely System"
                : user.organizationId?.name || (typeof user.organizationId === "string" ? user.organizationId : "") || user.organization || "N/A";

              return (
                <tr key={user._id || user.id || i} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <span className="font-normal text-[14px] text-gray-900">{user.name}</span>
                  </td>
                  <td className="font-normal text-[14px] px-6 py-4 text-gray-600">{user.email}</td>
                  {showOrganization && (
                    <td className="font-normal text-[14px] px-6 py-4 text-gray-600">{orgNameDisplay}</td>
                  )}
                  <td className="font-normal text-[14px] px-6 py-4 text-gray-600">{user.department || "N/A"}</td>
                  <td className="font-normal text-[14px] px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                      {roleDisplay}
                    </span>
                  </td>
                  <td className="font-normal text-[14px] px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      isActive 
                        ? "bg-green-50 text-green-600 border border-green-100" 
                        : "bg-red-50 text-red-600 border border-red-100"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`} />
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => onEdit(user)} className="text-gray-400 hover:text-indigo-600" title="Edit">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => onDelete(user.id || user._id)} className="text-gray-400 hover:text-red-600" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && onPageChange && (
        <div className="py-6 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
