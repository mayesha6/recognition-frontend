"use client";
import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { toast } from "sonner";
import { formatErrorMessage } from "@/utils/formatError";

export default function AddCategoryModal({ isOpen, onClose }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    try {
      await createCategory({
        name: name.trim(),
        description: description.trim(),
      }).unwrap();
      toast.success("Category created successfully!");
      setName("");
      setDescription("");
      onClose();
    } catch (error: any) {
      toast.error(formatErrorMessage(error, "Failed to create category"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-light text-xl">Create New Category</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Peer-to-Peer"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500 h-10"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">Description / Context (used by AI to generate messages)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Recognizing achievements and collaboration among coworkers."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500 h-24 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-gradient font-medium text-[16px] text-white py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Adding...
              </>
            ) : (
              "Add Category"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}