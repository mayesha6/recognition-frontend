"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditRewardModal({ isOpen, onClose, rewardData, onSave, isLoading }: any) {
  const [name, setName] = useState("");
  const [pointsRequired, setPointsRequired] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (rewardData) {
      setName(rewardData.name || "");
      setPointsRequired(rewardData.pointsRequired ?? rewardData.points ?? "");
      setQuantity(rewardData.quantity ?? rewardData.stock ?? "");
      setStatus(
        rewardData.status === "Active" || rewardData.isActive === "ACTIVE" || rewardData.status === "ACTIVE" || rewardData.isActive === true 
          ? "Active" 
          : "Inactive"
      );
      setDescription(rewardData.description || "");
    }
  }, [rewardData]);

  if (!isOpen || !rewardData) return null;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: rewardData._id || rewardData.id,
      name,
      points: Number(pointsRequired) || 0,
      stock: Number(quantity) || 0,
      status: status === "Active" ? "Active" : "Inactive",
      description: description || "N/A",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-gray-900">Edit Reward</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Redeem Name */}
            <div className="col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Redeem Name</label>
              <input 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" 
              />
            </div>

            {/* Points Required */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Points Required</label>
              <input 
                type="number"
                required
                value={pointsRequired}
                onChange={(e) => setPointsRequired(e.target.value)}
                className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" 
              />
            </div>

            {/* Stock */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Stock / Quantity</label>
              <input 
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" 
              />
            </div>

            {/* Status */}
            <div className="col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Status</label>
              <div className="relative">
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full appearance-none border border-gray outline-0 rounded-lg px-3 py-2 text-sm bg-white pr-8"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">Description</label>
              <textarea 
                rows={3} 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray outline-0 rounded-lg px-3 py-2 text-sm" 
              />
            </div>
          </div>

          <Button disabled={isLoading} type="submit" className="w-full mt-4 bg-gradient text-white hover:bg-indigo-700 py-6 text-base">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}