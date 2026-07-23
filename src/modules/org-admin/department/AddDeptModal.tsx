"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AddDepartmentModal({ isOpen, onClose, onSave, admins = [] }: any) {
    const [name, setName] = useState("");
    const [adminId, setAdminId] = useState("");
    const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setName("");
            setAdminId("");
            setSelectedAdmin(null);
            setIsOpenDropdown(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSelectAdmin = (admin: any) => {
        setAdminId(admin._id || admin.id);
        setSelectedAdmin(admin);
        setIsOpenDropdown(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-light text-xl text-gray-900">Create New Department</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-500 mb-1 block">Department Name</label>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm border-gray-200 outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900" 
                            placeholder="e.g. Sales, Engineering"
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm text-gray-500 mb-1 block">Assign Department Admin</label>
                        <button
                            type="button"
                            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                            className="w-full border rounded-lg px-3 py-2 text-sm border-gray-200 outline-none text-left flex items-center justify-between bg-white text-gray-900"
                        >
                            {selectedAdmin ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
                                        {selectedAdmin.picture ? (
                                            <img src={selectedAdmin.picture} alt={selectedAdmin.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span>
                                                {selectedAdmin.name.split(" ").filter((w: string) => /^[a-zA-Z0-9]/.test(w)).map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "A"}
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-medium truncate">{selectedAdmin.name}</span>
                                    <span className="text-xs text-gray-400 truncate">({selectedAdmin.email})</span>
                                </div>
                            ) : (
                                <span className="text-gray-400">Select an Admin (Optional)</span>
                            )}
                            <span className="text-gray-400 ml-2">▼</span>
                        </button>

                        {isOpenDropdown && (
                            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                <div 
                                    onClick={() => {
                                        setAdminId("");
                                        setSelectedAdmin(null);
                                        setIsOpenDropdown(false);
                                    }}
                                    className="px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer"
                                >
                                    None (Unassigned)
                                </div>
                                {admins.map((admin: any) => {
                                    const initials = admin.name
                                        ? admin.name.split(" ").filter((w: string) => /^[a-zA-Z0-9]/.test(w)).map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                                        : "A";
                                    return (
                                        <div
                                            key={admin._id || admin.id}
                                            onClick={() => handleSelectAdmin(admin)}
                                            className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer flex items-center gap-2 text-gray-900 border-t border-gray-50"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
                                                {admin.picture ? (
                                                    <img src={admin.picture} alt={admin.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span>{initials}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate leading-tight">{admin.name}</p>
                                                <p className="text-[10px] text-gray-400 truncate leading-none">{admin.email}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    disabled={!name.trim()}
                    onClick={() => onSave({ name, adminId })}
                    className="w-full mt-6 bg-gradient font-normal text-[16px] text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
                >
                    Add Department
                </button>
            </div>
        </div>
    );
}