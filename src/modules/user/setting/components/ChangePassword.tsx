"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // lucide-react ইন্সটল করা না থাকলে: npm install lucide-react

export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const toggleVisibility = (field: "old" | "new" | "confirm") => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // ইনপুট ক্লাসের জন্য কমন স্টাইল (focus:outline-none দিয়ে বর্ডার রিমুভ হবে)
    const inputStyle = "w-full border-0 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all";
    const labelStyle = "text-sm font-medium text-[#596475]";
    const divStyle = "flex border border-gray-200 rounded-lg px-3 py-2"
    return (
        <form className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-light text-2xl mb-4">Change Password</h3>
            <div className="grid gap-4">

                {/* Old Password */}
                <div>
                    <label className={labelStyle}>Old Password</label>
                    <div className={divStyle}>
                        <input
                            type={showPassword.old ? "text" : "password"}
                            placeholder="Old Password"
                            className={inputStyle}
                        />
                        <button type="button" onClick={() => toggleVisibility("old")} className=" text-gray-400">
                            {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className={labelStyle}>New Password</label>
                    <div className={divStyle}>
                        <input
                            type={showPassword.new ? "text" : "password"}
                            placeholder="New Password"
                            className={inputStyle}
                        />
                        <button type="button" onClick={() => toggleVisibility("new")} className=" text-gray-400">
                            {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm New Password */}
                <div>
                    <label className={labelStyle}>Confirm New Password</label>
                    <div className={divStyle}>
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            placeholder="Confirm New Password"
                            className={inputStyle}
                        />
                        <button type="button" onClick={() => toggleVisibility("confirm")} className=" text-gray-400">
                            {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button type="submit" className="bg-gradient hover:bg-indigo-600 text-white py-2.5 rounded-lg transition-colors">
                    Change Password
                </button>
            </div>
        </form>
    );
}