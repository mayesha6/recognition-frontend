import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export default function AddEmployeeModal({ isOpen, onClose, onSave, departments = [] }: any) {
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", points: "", department: "", status: "Active"
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (departments.length > 0 && !formData.department) {
            setFormData(prev => ({ ...prev, department: departments[0].name }));
        }
    }, [departments, formData.department]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium text-lg">Add Employee</h3>
                    <button onClick={onClose} className="text-gray-400"><X size={20} /></button>
                </div>

                <div className="">

                    <label className="text-sm text-gray-500">Employee Name</label>
                    <input className="w-full border rounded-lg px-3 py-2 mt-1 text-sm border-gray outline-0 focus:ring-1 focus:ring-indigo-500" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

                </div>

                <div className="mt-4 space-y-4">
                    <div>
                        <label className="text-sm text-gray-500">Email Address</label>
                        <input className="w-full border rounded-lg px-3 py-2 mt-1 text-sm border-gray outline-0 focus:ring-1 focus:ring-indigo-500" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Password</label>
                        <div className="relative mt-1">
                            <input
                                className="w-full border rounded-lg pl-3 pr-10 py-2 text-sm border-gray outline-0 focus:ring-1 focus:ring-indigo-500"
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-500">Points</label>
                            <input className="w-full border rounded-lg px-3 py-2 mt-1 text-sm border-gray outline-0 focus:ring-1 focus:ring-indigo-500" onChange={(e) => setFormData({ ...formData, points: e.target.value })} />
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">Status</label>
                            <div className="relative w-full">
                                <select
                                    className="w-full appearance-none border border-gray rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer mt-1 text-sm" onChange={(e) => setFormData({ ...formData, status: e.target.value })}

                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>


                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Department</label>
                        <div className="relative w-full mt-1">
                            <select
                                className="w-full appearance-none border border-gray rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer text-sm"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            >
                                {departments.map((dept: any) => (
                                    <option key={dept._id || dept.id} value={dept.name}>
                                        {dept.name}
                                    </option>
                                ))}
                                {departments.length === 0 && (
                                    <option value="">No departments available</option>
                                )}
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => onSave(formData)}
                    className="w-full mt-8 bg-gradient font-normal text-[16px] text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                    Add Employee
                </button>
            </div>
        </div>
    );
}