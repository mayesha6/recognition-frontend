"use client";
import { useState, useRef, useEffect } from "react";
import { Check, X, MoreHorizontal, Loader2 } from "lucide-react";

export default function ActionMenu({ 
  onStatusChange,
  currentStatus,
  isUpdating
}: { 
  onStatusChange: (status: "Approved" | "Rejected") => void;
  currentStatus?: string;
  isUpdating?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // বাইরে ক্লিক করলে মেনু বন্ধ হয়ে যাবে
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPending = !currentStatus || currentStatus.toLowerCase() === "pending";

  if (!isPending) {
    return <span className="text-xs text-gray-400 font-medium">Finalized</span>;
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button 
        disabled={isUpdating} 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 transition-colors"
        title="Actions"
      >
        {isUpdating ? <Loader2 size={18} className="animate-spin text-gray-500" /> : <MoreHorizontal size={20} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-20 p-2">
          <button 
            disabled={isUpdating}
            onClick={() => { onStatusChange("Approved"); setIsOpen(false); }}
            className="flex items-center gap-2 w-full p-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <Check size={16} /> Approve
          </button>
          <button 
            disabled={isUpdating}
            onClick={() => { onStatusChange("Rejected"); setIsOpen(false); }}
            className="flex items-center gap-2 w-full p-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={16} /> Reject
          </button>
        </div>
      )}
    </div>
  );
}