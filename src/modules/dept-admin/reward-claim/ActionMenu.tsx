"use client";
import { useState, useRef, useEffect } from "react";
import { Check, X, MoreHorizontal } from "lucide-react";

export default function ActionMenu({ onStatusChange }: { onStatusChange: (status: string) => void }) {
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

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-gray-600">
        <MoreHorizontal size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-20 p-2">
          <button 
            onClick={() => { onStatusChange("Approved"); setIsOpen(false); }}
            className="flex items-center gap-2 w-full p-2 text-sm text-green-600 hover:bg-green-50 rounded-lg"
          >
            <Check size={16} /> Approved
          </button>
          <button 
            onClick={() => { onStatusChange("Rejected"); setIsOpen(false); }}
            className="flex items-center gap-2 w-full p-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            <X size={16} /> Rejected
          </button>
        </div>
      )}
    </div>
  );
}