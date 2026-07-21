"use client";
import { useState } from "react";
import { Plus, Trash2, Save, Building2, User as UserIcon, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetDepartmentsQuery } from "@/redux/api/departmentApi";
import { useGetDepartmentUsersQuery } from "@/redux/api/userApi";
import { 
  useDistributePointsMutation, 
  useSetUserPointsMutation,
  useResetPointsMutation 
} from "@/redux/api/walletApi";
import { toast } from "sonner";
import { formatErrorMessage } from "@/utils/formatError";

type AllocationType = "department" | "user";

interface AllocationItem {
  id: string;
  type: AllocationType;
  label: string;
  department?: string;
  email?: string;
  points: number;
}

export default function PointsManager({ initialData, onSave }: any) {
  const [allocationMode, setAllocationMode] = useState<AllocationType>("department");
  const [allocations, setAllocations] = useState<AllocationItem[]>(initialData || []);

  const [selectedDept, setSelectedDept] = useState("");
  const [customDept, setCustomDept] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [customUserEmail, setCustomUserEmail] = useState("");
  const [pointsInput, setPointsInput] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // RTK Query hooks
  const { data: deptRes, isLoading: isDeptLoading } = useGetDepartmentsQuery();
  const { data: usersRes, isLoading: isUsersLoading } = useGetDepartmentUsersQuery({ limit: 100 });
  const [distributePoints] = useDistributePointsMutation();
  const [setUserPoints] = useSetUserPointsMutation();
  const [resetPoints, { isLoading: isResetting }] = useResetPointsMutation();

  const departments = deptRes?.data || (Array.isArray(deptRes) ? deptRes : []);
  const users = usersRes?.data || [];

  const handleAdd = () => {
    const pointsNum = Number(pointsInput);
    if (!pointsNum || pointsNum <= 0) {
      toast.error("Please enter a valid points amount (> 0).");
      return;
    }

    if (allocationMode === "department") {
      const deptName = selectedDept || customDept.trim();
      if (!deptName) {
        toast.error("Please select or type a department name.");
        return;
      }
      setAllocations((prev) => [
        ...prev,
        {
          id: `dept-${Date.now()}-${Math.random()}`,
          type: "department",
          label: `Department: ${deptName}`,
          department: deptName,
          points: pointsNum,
        },
      ]);
      setSelectedDept("");
      setCustomDept("");
    } else {
      const email = selectedUserEmail || customUserEmail.trim();
      if (!email) {
        toast.error("Please select or enter a user email address.");
        return;
      }
      setAllocations((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}-${Math.random()}`,
          type: "user",
          label: `Individual User: ${email}`,
          email: email,
          points: pointsNum,
        },
      ]);
      setSelectedUserEmail("");
      setCustomUserEmail("");
    }
    setPointsInput("");
  };

  const handleRemove = (id: string) => {
    setAllocations((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmitAll = async () => {
    if (allocations.length === 0) {
      toast.error("No point allocations in queue to submit.");
      return;
    }

    setIsSubmitting(true);
    let successCount = 0;
    let failCount = 0;

    try {
      for (const item of allocations) {
        try {
          if (item.type === "department" && item.department) {
            await distributePoints({ department: item.department, points: item.points }).unwrap();
            successCount++;
          } else if (item.type === "user" && item.email) {
            await setUserPoints({ email: item.email, points: item.points }).unwrap();
            successCount++;
          }
        } catch (err: any) {
          failCount++;
          toast.error(formatErrorMessage(err, `Failed to allocate points for ${item.label}`));
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully processed ${successCount} point allocation(s)!`);
        setAllocations([]);
      }

      if (onSave) {
        onSave(allocations);
      }
    } catch (error: any) {
      toast.error(formatErrorMessage(error, "Failed to process allocations"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetDeptPoints = async () => {
    const deptName = selectedDept || customDept.trim();
    if (!confirm(deptName ? `Reset points for department "${deptName}"?` : "Reset points for all non-organization users/departments?")) return;

    try {
      await resetPoints(deptName ? { department: deptName } : undefined).unwrap();
      toast.success("Points reset successfully!");
    } catch (error: any) {
      toast.error(formatErrorMessage(error, "Failed to reset points"));
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-2xl font-light text-gray-900">Points Allocation</h3>
          <p className="text-xs text-gray-400 mt-1">
            Allocate points to standalone departments or individual users not bound to an organization.
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setAllocationMode("department")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              allocationMode === "department" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Department Mode
          </button>
          <button
            type="button"
            onClick={() => setAllocationMode("user")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              allocationMode === "user" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" /> Individual User Mode
          </button>
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {allocationMode === "department" ? (
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-medium text-gray-500 block">Select or Enter Department</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative w-full">
                  <select
                    value={selectedDept}
                    onChange={(e) => { setSelectedDept(e.target.value); setCustomDept(""); }}
                    disabled={isDeptLoading}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 pr-10 text-sm bg-white text-gray-700 outline-none focus:outline-none focus:ring-0 focus:border-gray-300 cursor-pointer h-10"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept: any) => (
                      <option key={dept.id || dept._id} value={dept.name}>
                        {dept.name} {dept.employees ? `(${dept.employees} employees)` : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <input
                  type="text"
                  placeholder="Or custom department..."
                  value={customDept}
                  onChange={(e) => { setCustomDept(e.target.value); setSelectedDept(""); }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-700 outline-none focus:outline-none focus:ring-0 focus:border-gray-300 h-10"
                />
              </div>
            </div>
          ) : (
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-medium text-gray-500 block">Select or Enter User Email</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative w-full">
                  <select
                    value={selectedUserEmail}
                    onChange={(e) => { setSelectedUserEmail(e.target.value); setCustomUserEmail(""); }}
                    disabled={isUsersLoading}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 pr-10 text-sm bg-white text-gray-700 outline-none focus:outline-none focus:ring-0 focus:border-gray-300 cursor-pointer h-10"
                  >
                    <option value="">Select Individual User</option>
                    {users.map((u: any) => (
                      <option key={u.id || u._id} value={u.email}>
                        {u.name} ({u.email}) {u.department ? `- ${u.department}` : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <input
                  type="text"
                  placeholder="Or enter email..."
                  value={customUserEmail}
                  onChange={(e) => { setCustomUserEmail(e.target.value); setSelectedUserEmail(""); }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-700 outline-none focus:outline-none focus:ring-0 focus:border-gray-300 h-10"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 items-end">
            <div className="w-full">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Points Amount</label>
              <input
                type="number"
                min="1"
                value={pointsInput}
                onChange={(e) => setPointsInput(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-700 outline-none focus:outline-none focus:ring-0 focus:border-gray-300 h-10"
                placeholder="100"
              />
            </div>
            <Button onClick={handleAdd} className="bg-gradient text-white whitespace-nowrap shrink-0 h-10 px-4 rounded-xl">
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </div>

      {/* Allocation List / Queue */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Allocation Queue ({allocations.length})</h4>
        {allocations.length === 0 ? (
          <div className="p-8 text-center text-gray-400 border border-dashed border-gray-200 rounded-xl text-sm">
            No allocations queued yet. Add departments or individual users above.
          </div>
        ) : (
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden bg-white">
            {allocations.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  {item.type === "department" ? (
                    <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Building2 size={16} /></span>
                  ) : (
                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><UserIcon size={16} /></span>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400 capitalize">Mode: {item.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-indigo-600 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-full">
                    +{item.points} Pts
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove from queue"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={handleSubmitAll}
          disabled={isSubmitting || allocations.length === 0}
          size="lg"
          className="flex-1 bg-gradient text-white disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting Allocations...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" /> Submit All Changes
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleResetDeptPoints}
          disabled={isResetting}
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          {isResetting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reset Department Points"}
        </Button>
      </div>
    </div>
  );
}