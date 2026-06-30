"use client";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react"; // লক আইকনের জন্য

export default function ContactInfo({ user }: any) {
    const { register, handleSubmit } = useForm({ defaultValues: user });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    // ইনপুট স্টাইল (টেক্সট কালার text-red-500 করা হয়েছে)
    const inputStyle = "w-full  text-[#596475] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all";
    const labelStyle = "text-sm font-medium text-[#596475] mb-1";
    const divStyle = "flex border border-gray-200 rounded-lg px-3 py-2 justify-between items-center w-full"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full">
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

                <button type="submit" className="bg-gradient hover:bg-indigo-600 text-white py-2.5 rounded-lg transition-colors mt-2">
                    Save
                </button>
            </div>
        </form>
    );
}