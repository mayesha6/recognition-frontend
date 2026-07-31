import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useGetDepartmentsQuery } from "@/redux/api/departmentApi";

export default function EditUserModal({ isOpen, onClose, userData, onSave, organizations = [], departments = [] }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [organizationId, setOrganizationId] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setRole(userData.role || "USER");
      setOrganizationId(userData.organizationId?._id || userData.organizationId || "");
      setDepartment(userData.department || "");
      setStatus(
        userData.isActive === "ACTIVE" || userData.status === "ACTIVE" || userData.isActive === true
          ? "ACTIVE"
          : "INACTIVE"
      );
    }
  }, [userData]);

  // Dynamically load departments of the selected organization
  const { data: orgDeptsRes } = useGetDepartmentsQuery(
    { organizationId },
    { skip: !organizationId || role === "SUPER_ADMIN" }
  );
  const activeDepartments = orgDeptsRes?.data || orgDeptsRes || [];
  
  // If we are in organization-specific scoped view, fallback to passed departments list
  const finalDepartments = activeDepartments.length > 0 ? activeDepartments : (departments || []);

  const showOrgField = role !== "SUPER_ADMIN" && organizations && organizations.length > 0;

  if (!isOpen) return null;

  const handleSubmit = () => {
    const validationErrors: any = {};
    if (!name.trim()) validationErrors.name = "Name is required";
    if (!email.trim()) validationErrors.email = "Email is required";
    if (role !== "SUPER_ADMIN" && showOrgField && !organizationId) {
      validationErrors.organizationId = "Organization is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      name,
      email,
      role,
      organizationId: role === "SUPER_ADMIN" ? "" : organizationId,
      department: role === "SUPER_ADMIN" ? "Administration" : department,
      status: status === "ACTIVE"
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto transform transition-all scale-100 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-900">Edit User Profile</h3>
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
              value={name}
              onChange={(e) => setName(e.target.value)} 
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
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Role Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Role</label>
              <div className="relative w-full">
                <select
                  className="w-full appearance-none border border-gray-200 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer text-sm bg-white"
                  value={role}
                  onChange={(e) => {
                    const newRole = e.target.value;
                    setRole(newRole);
                    if (newRole === "SUPER_ADMIN") {
                      setDepartment("Administration");
                      setOrganizationId("");
                    } else {
                      setDepartment("");
                    }
                  }}
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
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Organization Selection (Only show for non-Super Admin roles and if organizations are provided) */}
          {showOrgField && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Organization</label>
              <div className="relative w-full">
                <select
                  className={`w-full appearance-none border rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer text-sm bg-white ${
                    errors.organizationId ? "border-red-500" : "border-gray-200"
                  }`}
                  value={organizationId}
                  onChange={(e) => {
                    setOrganizationId(e.target.value);
                    setDepartment("");
                  }}
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
          {role !== "SUPER_ADMIN" && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Department</label>
              <div className="relative w-full">
                <select
                  className="w-full appearance-none border border-gray-200 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer text-sm bg-white"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  disabled={role !== "SUPER_ADMIN" && showOrgField && !organizationId}
                >
                  <option value="">Select a department</option>
                  {finalDepartments.map((dept: any) => (
                    <option key={dept._id || dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                  {department && !finalDepartments.some((d: any) => d.name === department) && (
                    <option value={department}>{department}</option>
                  )}
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
          Save Changes
        </button>
      </div>
    </div>
  );
}
