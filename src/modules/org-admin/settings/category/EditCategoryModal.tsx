"use client";
import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { toast } from "sonner";
import { formatErrorMessage } from "@/utils/formatError";

export default function EditCategoryModal({
  isOpen,
  onClose,
  categoryData,
}: any) {
  const [name, setName] = useState("");
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (categoryData) {
      setName(categoryData.name || "");
    }
  }, [categoryData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = categoryData?._id || categoryData?.id;
    if (!id) return;
    if (!name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    try {
      await updateCategory({ id, name: name.trim() }).unwrap();
      toast.success("Category updated successfully!");
      onClose();
    } catch (error: any) {
      toast.error(formatErrorMessage(error, "Failed to update category"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-light text-xl">Category Information</h3>
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
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500 h-10" 
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-gradient text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Updating...
              </>
            ) : (
              "Update Category"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}