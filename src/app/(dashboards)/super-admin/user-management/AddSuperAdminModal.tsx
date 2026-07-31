import { useState } from "react";
import { X } from "lucide-react";
import { useGetDepartmentsQuery } from "@/redux/api/departmentApi";

export default function AddSuperAdminModal({ isOpen, onClose, onSave, organizations = [], departments = [] }: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    organizationId: "",
    department: "",
    status: "Active"
  });

  const [errors, setErrors] = useState<any>({});

  // Dynamically load departments of the selected organization
  const { data: orgDeptsRes } = useGetDepartmentsQuery(
    { organizationId: formData.organizationId },
    { skip: !formData.organizationId || formData.role === "SUPER_ADMIN" }
  );
  const activeDepartments = orgDeptsRes?.data || orgDeptsRes || [];

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Basic validation
    const validationErrors: any = {};
    if (!formData.name.trim()) validationErrors.name = "Name is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.password) validationErrors.password = "Password is required";
    if (formData.role !== "SUPER_ADMIN" && !formData.organizationId) {
      validationErrors.organizationId = "Organization is required";
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto transform transition-all scale-100 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-900">Add New User</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-50 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
            <input 
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
            <input 
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              type="email"
              placeholder="e.g. admin@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <input 
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Role Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Role</label>
              <div className="relative w-full">
                <select
                  className="w-full appearance-none border border-gray-200 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer text-sm bg-white"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value, department: e.target.value === "SUPER_ADMIN" ? "Administration" : "", organizationId: e.target.value === "SUPER_ADMIN" ? "" : formData.organizationId })}
                >
                  <option value="SUPER_ADMIN">Super Admin</option>
                  <option value="ORGANIZATION_ADMIN">Organization Admin</option>
                  <option value="DEPARTMENT_ADMIN">Department Admin</option>
                  <option value="USER">User (Employee)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Status Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
              <div className="relative w-full">
                <select
                  className="w-full appearance-none border border-gray-200 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer text-sm bg-white"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Organization Selection (Only show for non-Super Admin roles) */}
          {formData.role !== "SUPER_ADMIN" && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Organization</label>
              <div className="relative w-full">
                <select
                  className={`w-full appearance-none border rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer text-sm bg-white ${
                    errors.organizationId ? "border-red-500" : "border-gray-200"
                  }`}
                  value={formData.organizationId}
                  onChange={(e) => setFormData({ ...formData, organizationId: e.target.value, department: "" })}
                >
                  <option value="">Select an organization</option>
                  {organizations.map((org: any) => (
                    <option key={org._id || org.id} value={org._id || org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              {errors.organizationId && <p className="text-red-500 text-xs mt-1">{errors.organizationId}</p>}
            </div>
          )}

          {/* Department (Only show for non-Super Admin roles) */}
          {formData.role !== "SUPER_ADMIN" && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Department</label>
              <div className="relative w-full">
                <select
                  className="w-full appearance-none border border-gray-200 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer text-sm bg-white"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  disabled={!formData.organizationId}
                >
                  <option value="">Select a department</option>
                  {activeDepartments.map((dept: any) => (
                    <option key={dept._id || dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 bg-[#FFAA00] hover:bg-[#e69900] text-white font-medium py-3 rounded-lg transition-colors text-sm shadow-sm"
        >
          Add User
        </button>
      </div>
    </div>
  );
}
