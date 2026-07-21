"use client";
import { useRef, useState } from "react";
import { X, Trash2, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAddCategoryImagesMutation, useDeleteCategoryImageMutation } from "@/redux/api/categoryApi";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { toast } from "sonner";
import { formatErrorMessage } from "@/utils/formatError";

export default function ImageManagerModal({ isOpen, onClose, categoryData }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteImageTarget, setDeleteImageTarget] = useState<string | null>(null);
  const [addImages, { isLoading: isUploading }] = useAddCategoryImagesMutation();
  const [deleteImage, { isLoading: isDeleting }] = useDeleteCategoryImageMutation();

  if (!isOpen || !categoryData) return null;

  const categoryId = categoryData._id || categoryData.id;
  const categoryName = categoryData.name;
  const images = categoryData.images || [];

  const handleConfirmDeleteImage = async () => {
    if (!deleteImageTarget) return;
    try {
      await deleteImage({ categoryId, imageUrl: deleteImageTarget }).unwrap();
      toast.success("Image deleted successfully!");
      setDeleteImageTarget(null);
    } catch (error: any) {
      toast.error(formatErrorMessage(error, "Failed to delete image"));
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        await addImages({ categoryId, formData }).unwrap();
        toast.success("Images uploaded successfully!");
      } catch (error: any) {
        toast.error(formatErrorMessage(error, "Failed to upload images"));
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-lg text-gray-900">{categoryName} - Images</h3>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 max-h-[50vh] overflow-y-auto pr-1">
            {images && images.length > 0 ? (
              images.map((img: string, index: number) => (
                <div key={index} className="relative group border border-gray-100 rounded-xl overflow-hidden h-24 bg-gray-50">
                  <Image
                    src={img}
                    alt={`${categoryName} image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => setDeleteImageTarget(img)}
                    className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white z-10 transition-all disabled:opacity-50"
                    title="Delete Image"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-3 py-10 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-sm">No images found for this category</p>
              </div>
            )}
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              multiple
            />

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer w-full py-3 border-2 border-dashed border-indigo-200 rounded-xl flex items-center justify-center text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all font-medium text-sm disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" /> Uploading Images...
                </>
              ) : (
                <>
                  <Upload size={18} className="mr-2" /> Add New Images
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={!!deleteImageTarget}
        onClose={() => setDeleteImageTarget(null)}
        onConfirm={handleConfirmDeleteImage}
        title="Delete Image"
        description="Are you sure you want to delete this image? This action is permanent and cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
}