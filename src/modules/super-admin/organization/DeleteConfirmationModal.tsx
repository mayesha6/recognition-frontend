"use client";
import { X, AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orgName: string;
}

export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, orgName }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-rose-600 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            <span>Delete Organization</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold text-gray-900">"{orgName}"</span>? This action is permanent and cannot be undone.
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
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
