"use client";
import { useRef, useState } from "react";
import { X, Trash2, Upload } from "lucide-react";
import Image from "next/image";

export default function ImageManagerModal({ isOpen, onClose, category, images }: any) {
    const [imageState, setimageState] = useState(images);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleDelete = (id: string) => {
        setimageState(imageState.filter((img: any) => img.id !== id));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            console.log("Selected file:", files[0]);
            // এখানে আপনি API কল করে ইমেজ আপলোড করবেন
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">{category} - Images</h3>
                    <button onClick={onClose}><X size={20} /></button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    {images && images.length > 0 ? (
                        console.log(images),
                        images.map((img: any, index: number) => (
                            console.log(img),
                            <div key={index} className="relative group border border-gray rounded-lg overflow-hidden h-24">
                                <Image
                                    src={img}
                                    alt={img.name || "Category Image"}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    onClick={() => handleDelete(img.id)}
                                    className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white z-10"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 py-10 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
                            <p className="text-sm">No images found for this category</p>
                        </div>
                    )}
                </div>

                <div className="">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />

                    {/* বাটন যা ক্লিক করলে ইনপুট ট্রিগার হবে */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer w-full py-3 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                        <Upload size={18} className="mr-2" /> Add New Images
                    </button>
                </div>
            </div>
        </div>
    );
}