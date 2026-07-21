"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { formatErrorMessage } from "@/utils/formatError";
import { useCreateRecognitionValueMutation } from "@/redux/api/recognitionValueApi";

export default function AddValueModal({
    isOpen,
    onClose,
}: any) {
    const [name, setName] = useState("");

    const [createRecognitionValue, { isLoading }] =
        useCreateRecognitionValueMutation();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Recognition value name is required.");
            return;
        }

        try {
            await createRecognitionValue({
                name: name.trim(),
            }).unwrap();

            toast.success("Recognition value created successfully!");

            setName("");
            onClose();
        } catch (error: any) {
            toast.error(
                formatErrorMessage(
                    error,
                    "Failed to create recognition value"
                )
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl">

                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-light text-xl">
                        Create New Recognition Value
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="text-sm text-gray-500 mb-1 block">
                            Recognition Value Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            placeholder="e.g. Leadership"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500 h-10"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-4 bg-gradient text-white py-3 rounded-xl hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Adding...
                            </>
                        ) : (
                            "Add Recognition Value"
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}