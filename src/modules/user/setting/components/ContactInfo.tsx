"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Lock } from "lucide-react";
import { useUpdateMyProfileMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";
import { formatErrorMessage } from "@/utils/formatError";

export default function ContactInfo({ user }: any) {
    const { register, handleSubmit, reset } = useForm({ defaultValues: user });
    const [updateProfile, { isLoading }] = useUpdateMyProfileMutation();

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const onSubmit = async (formDataFields: any) => {
        try {
            const formData = new FormData();
            
            const payload = {
                name: formDataFields.fullName,
                phone: formDataFields.phone
            };
            
            formData.append("data", JSON.stringify(payload));
            
            await updateProfile(formData).unwrap();
            toast.success("Contact info updated successfully!");
        } catch (error) {
            console.error("Failed to update contact info:", error);
            toast.error(formatErrorMessage(error, "Failed to update contact info. Please try again."));
        }
    };

    // ইনপুট স্টাইল (টেক্সট কালার text-red-500 করা হয়েছে)
    const inputStyle = "w-full  text-[#596475] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all";
    const labelStyle = "text-sm font-medium text-[#596475] mb-1";
    const divStyle = "flex border border-gray-200 rounded-lg px-3 py-2 justify-between items-center w-full"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full h-full">
            <h3 className="font-light text-2xl mb-4">Contact Info</h3>
            <div className="flex flex-col gap-4">

                {/* Full Name */}
                <div>
                    <label className={labelStyle}>Full Name</label>
                    <input {...register("fullName")} className={inputStyle} placeholder="Full Name" />
                </div>

                {/* Email */}
                <div>
                    <label className={labelStyle}>Email Address</label>
                    <div className={divStyle}>
                        <input disabled {...register("email")} className={`w-full`} />
                        <Lock className="text-gray-400" size={16} />
                    </div>

                </div>

                {/* Phone */}
                <div>
                    <label className={labelStyle}>Phone Number</label>
                    <input {...register("phone")} className={inputStyle} placeholder="Phone Number" />
                </div>

                {/* Department & Organization */}
                <div className="grid gap-4 grid-cols-2">
                    <div className="w-full relative">
                        <label className={labelStyle}>Department</label>
                        <div className={divStyle}>
                            <input disabled className={`pr-10`} value={user.department} />
                            <Lock className="text-gray-400" size={16} />
                        </div>
                    </div>
                    <div className="w-full relative">
                        <label className={labelStyle}>Organization</label>

                        <div className={divStyle}>
                            <input disabled className={` pr-10`} value={user.organization} />
                            <Lock className="text-gray-400" size={16} />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient hover:bg-indigo-600 text-white py-2.5 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                        </>
                    ) : (
                        "Save"
                    )}
                </button>
            </div>
        </form>
    );
}