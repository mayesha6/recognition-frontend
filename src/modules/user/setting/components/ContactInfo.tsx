// src/components/settings/ContactInfo.tsx
"use client";
import { useForm } from "react-hook-form";

export default function ContactInfo({ user }: any) {
  const { register, handleSubmit } = useForm({ defaultValues: user });

  const onSubmit = (data: any) => {
    // এখানে আপনার API কল হবে (যেমন: useUpdateProfileMutation)
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold mb-4">Contact Info</h3>
      <div className="grid gap-4">
        <input {...register("fullName")} className="w-full border rounded-lg p-2.5" placeholder="Full Name" />
        <input {...register("email")} className="w-full border rounded-lg p-2.5" placeholder="Email Address" />
        <input {...register("phone")} className="w-full border rounded-lg p-2.5" placeholder="Phone Number" />
        <div className="flex gap-4">
           <input disabled className="w-full border rounded-lg p-2.5 bg-gray-50" value={user.department} />
           <input disabled className="w-full border rounded-lg p-2.5 bg-gray-50" value={user.organization} />
        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2.5 rounded-lg">Save</button>
      </div>
    </form>
  );
}