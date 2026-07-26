"use client";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export function EditPointModal({
  isOpen,
  onClose,
  userData,
  onSave,
  type = "point", // ডিফল্ট 'point', প্রয়োজনে 'employee' পাঠাবেন
  departments = []
}: any) {
  if (!isOpen) return null;

  const isPointMode = type === "point";

  const getInitialStatus = (user: any) => {
    if (!user) return "ACTIVE";
    const active = user.isActive === "ACTIVE" || user.isActive === true || user.status === "ACTIVE";
    return active ? "ACTIVE" : "INACTIVE";
  };

  const getPointsValue = (user: any) => {
    if (!user) return 0;
    return user.point ?? user.points ?? user.pointsBalance ?? user.wallet?.pointsBalance ?? user.wallet?.pointsAllocated ?? 0;
  };

  // স্ট্যাটাস ও অন্যান্য ইনফো হ্যান্ডল করার জন্য লোকাল স্টেট
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [department, setDepartment] = useState(userData?.department || "");
  const [point, setPoint] = useState(getPointsValue(userData));
  const [status, setStatus] = useState(getInitialStatus(userData));

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setDepartment(userData.department || "");
      setPoint(getPointsValue(userData));
      setStatus(getInitialStatus(userData));
    }
  }, [userData]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-light text-xl">
            {isPointMode ? "Distribute Points" : "Employee Information"}
          </h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <input 
              disabled={isPointMode} 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 mt-1 text-sm ${isPointMode ? "bg-gray-50 text-gray-400 border-gray" : "border-indigo-500 text-gray-900"}`} 
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Department</label>
            {isPointMode ? (
              <input disabled value={userData?.department} className="w-full bg-gray-50 border rounded-lg px-3 py-2 mt-1 border-gray text-gray-400 text-[14px]" />
            ) : (
              <div className="relative w-full mt-1">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full appearance-none border border-indigo-500 rounded-lg pl-4 pr-10 py-2 focus:outline-none text-sm text-gray-900"
                >
                  {departments.map((dept: any) => (
                    <option key={dept._id || dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                  {userData?.department && !departments.some((d: any) => d.name === userData.department) && (
                    <option value={userData.department}>{userData.department}</option>
                  )}
                  {departments.length === 0 && !userData?.department && (
                    <option value="">No departments available</option>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input 
              disabled={isPointMode} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 mt-1 text-sm ${isPointMode ? "bg-gray-50 text-gray-400 border-gray" : "border-indigo-500 text-gray-900"}`} 
            />
          </div>

          {/* Status Input */}
          <div>
            <label className="text-sm text-gray-500">Status</label>
            <div className="relative w-full mt-1">
              <select
                disabled={isPointMode}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full appearance-none border rounded-lg pl-4 pr-10 py-2 focus:outline-none 
                  ${isPointMode ? "bg-gray-50 text-gray-400 border-gray-200" : "border-indigo-500 text-gray-900"}
                `}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>

              {/* অ্যারো আইকন - এটি সবসময় ডানে ফিক্সড থাকবে */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Points</label>
            <input
              type="number"
              value={point}
              className="w-full border border-indigo-500 rounded-lg px-3 py-2 mt-1 focus:outline-none text-sm text-gray-900"
              onChange={(e) => setPoint(Number(e.target.value))}
            />
          </div>
          
        </div>

        <button
          onClick={() => onSave({ ...userData, name, email, department, point, status })}
          className="w-full mt-6 bg-gradient text-white py-3 rounded-lg font-bold hover:opacity-90"
        >
          {isPointMode ? "Update Point" : "Update Information"}
        </button>
      </div>
    </div>
  );
}

export default EditPointModal;