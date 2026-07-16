"use client";
import { Plan } from "@/types/subscription";
import { X, Plus, Trash } from "lucide-react";
import { useState, useEffect } from "react";

interface PlanFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Plan | null;
    onSave: (data: Partial<Plan>) => void;
}

export default function PlanFormModal({ isOpen, onClose, initialData, onSave }: PlanFormModalProps) {
    const [formData, setFormData] = useState<Partial<Plan>>({
        name: "",
        description: "",
        price: 0,
        billingCycle: "Monthly",
        features: [""],
    });

    // Edit মোডে ডাটা পপুলেট করার জন্য
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ name: "", description: "", price: 0, billingCycle: "Monthly", features: [""] });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...(formData.features || [])];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => setFormData({ ...formData, features: [...(formData.features || []), ""] });
    const removeFeature = (index: number) => {
        const newFeatures = (formData.features || []).filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl border border-gray max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">{initialData ? "Edit Plan" : "Create New Plan"}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Plan Name</label>
                        <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray rounded-lg px-3 py-2 text-sm outline-none" placeholder="e.g. Starter" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Price</label>
                            <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full border border-gray rounded-lg px-3 py-2 text-sm outline-none" placeholder="e.g. 20 or Free" />
                        </div>
                        <div className="relative w-full">
                            <label className="text-xs text-gray-500 mb-1 block">Billing Cycle</label>
                            <select
                                value={formData.billingCycle}
                                onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                                className="w-full appearance-none border border-gray rounded-lg px-3 py-2 text-sm outline-none bg-white pr-8"
                            >
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>

                            {/* কাস্টম অ্যারো আইকন */}
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center top-6 text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Description</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border border-gray rounded-lg px-3 py-2 text-sm outline-none" rows={2} />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 mb-2 flex justify-between items-center">
                            Features
                            <button onClick={addFeature} className="text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded flex items-center gap-1"><Plus size={14} /> Add</button>
                        </label>
                        <div className="space-y-2">
                            {formData.features?.map((feat, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input value={feat} onChange={(e) => handleFeatureChange(idx, e.target.value)} className="flex-1 border border-gray rounded-lg px-3 py-2 text-sm outline-none" placeholder="Feature description" />
                                    <button onClick={() => removeFeature(idx)} className="p-2 text-gray-400 hover:text-red-500"><Trash size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button onClick={() => onSave(formData)} className="w-full mt-6 bg-gradient hover:bg-indigo-700 text-white py-3 rounded-lg text-sm font-medium">
                    {initialData ? "Update Plan" : "Save Plan"}
                </button>
            </div>
        </div>
    );
}