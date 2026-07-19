"use client";
import { X, Ban, CheckCircle } from "lucide-react";

interface SuspendConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orgName: string;
  isActive: boolean;
}

export default function SuspendConfirmationModal({ isOpen, onClose, onConfirm, orgName, isActive }: SuspendConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className={`flex items-center gap-2 font-semibold ${isActive ? 'text-amber-600' : 'text-emerald-600'}`}>
            {isActive ? <Ban className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            <span>{isActive ? "Suspend Organization" : "Activate Organization"}</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to {isActive ? "suspend" : "activate"}{" "}
          <span className="font-semibold text-gray-900">"{orgName}"</span>?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isActive
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {isActive ? "Suspend" : "Activate"}
          </button>
        </div>
      </div>
    </div>
  );
}
