"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useChangePasswordMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { formatErrorMessage } from "@/utils/formatError";


export default function ChangePassword() {
  const [editPassword, { isLoading }] = useChangePasswordMutation();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (
    field: "old" | "new" | "confirm"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } =
      formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required.");
    }

    if (newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters long.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error(
        "New password and confirm password do not match."
      );
    }

    try {
      const res = await editPassword({     
          oldPassword,
          newPassword,
          confirmPassword
        
      }).unwrap();
console.log({res})
      toast.success(
        res?.message || "Password updated successfully!"
      );

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error(error);
      toast.error(formatErrorMessage(error, "Failed to update password. Please try again."));
    }
  };

  const inputStyle =
    "w-full border-0 focus:outline-none focus:ring-0";
  const labelStyle =
    "text-sm font-medium text-[#596475]";
  const divStyle =
    "flex border border-gray-200 rounded-lg px-3 py-2";

  return (
    <form
      onSubmit={handleChangePassword}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
    >
      <h3 className="font-light text-2xl mb-4">
        Change Password
      </h3>

      <div className="grid gap-4">
        {/* Old Password */}
        <div>
          <label className={labelStyle}>Old Password</label>

          <div className={divStyle}>
            <input
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              type={showPassword.old ? "text" : "password"}
              placeholder="Old Password"
              className={inputStyle}
            />

            <button
              type="button"
              onClick={() => toggleVisibility("old")}
              className="text-gray-400"
            >
              {showPassword.old ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className={labelStyle}>New Password</label>

          <div className={divStyle}>
            <input
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              type={showPassword.new ? "text" : "password"}
              placeholder="New Password"
              className={inputStyle}
            />

            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              className="text-gray-400"
            >
              {showPassword.new ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className={labelStyle}>
            Confirm New Password
          </label>

          <div className={divStyle}>
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={
                showPassword.confirm ? "text" : "password"
              }
              placeholder="Confirm New Password"
              className={inputStyle}
            />

            <button
              type="button"
              onClick={() =>
                toggleVisibility("confirm")
              }
              className="text-gray-400"
            >
              {showPassword.confirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient text-white py-2.5 rounded-lg disabled:opacity-50"
        >
          {isLoading
            ? "Changing Password..."
            : "Change Password"}
        </button>
      </div>
    </form>
  );
}