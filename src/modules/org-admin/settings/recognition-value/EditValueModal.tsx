"use client";

import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatErrorMessage } from "@/utils/formatError";
import { useUpdateRecognitionValueMutation } from "@/redux/api/recognitionValueApi";

export default function EditValueModal({
  isOpen,
  onClose,
  valueData,
}: any) {

  const [name, setName] = useState("");

  const [updateRecognitionValue, { isLoading }] =
    useUpdateRecognitionValueMutation();

  useEffect(() => {
    if (valueData) {
      setName(valueData.name || "");
    }
  }, [valueData]);

  if (!isOpen) return null;

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const id = valueData?._id || valueData?.id;

    if (!id) return;

    if (!name.trim()) {
      toast.error("Recognition value name is required.");
      return;
    }

    try {
      await updateRecognitionValue({
        id,
        name: name.trim(),
      }).unwrap();

      toast.success(
        "Recognition value updated successfully!"
      );

      onClose();
    } catch (error: any) {
      toast.error(
        formatErrorMessage(
          error,
          "Failed to update recognition value"
        )
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-100">

        <div className="flex justify-between items-center mb-6">
          <h3 className="font-light text-xl">
            Recognition Value Information
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Recognition Value Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500 h-10"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full mt-6 bg-gradient text-white py-3 rounded-xl hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Recognition Value"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}