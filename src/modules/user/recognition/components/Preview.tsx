"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"; // shadcn/ui slider

export default function Step4Preview({ onBack }: any) {
  const { watch } = useFormContext();
  const data = watch();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      {/* বাম পাশ: প্রিভিউ কার্ড */}
      <div className="bg-gradient p-6 rounded-2xl text-white shadow-lg flex flex-col justify-between min-h-100">
        <div>
          <h2 className="text-3xl font-bold mb-6">Greetely</h2>
          <p className="text-sm opacity-90">To:</p>
          <h3 className="text-2xl font-medium">{data.recipientName || "Sarah Ahmed"}</h3>
          <p className="text-sm opacity-80 mb-6">{data.department || "Engineering Department"}</p>
          
          <div className="bg-white/10 p-4 rounded-xl text-sm leading-relaxed">
            {data.message || "Sarah, your exceptional work on the Q4 project truly exemplifies our core value of Excellence..."}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <span className="bg-white/20 px-4 py-1 rounded-lg text-sm">{data.valueIds?.[0] || "Teamwork"}</span>
          <span className="font-bold">{data.points} Pts</span>
        </div>
      </div>

      {/* ডান পাশ: অ্যাকশন কার্ড */}
      <div className="border border-gray-200 rounded-2xl p-6 shadow-custom-card h-fit">
        <h3 className="font-bold text-xl mb-6">Actions</h3>
        
        {/* পয়েন্ট স্লাইডার */}
        <div className="mb-8">
           <Slider defaultValue={[data.points || 100]} max={500} step={10} className="mb-4" />
           <p className="text-center text-4xl font-bold text-primary">{data.points} pts</p>
        </div>

        <div className="space-y-4 text-sm border-t pt-4">
          <div className="flex justify-between"><span className="text-gray-500">Available Balance:</span> <span className="font-semibold">2,500</span></div>
          <div className="flex justify-between"><span className="text-gray-500">After this recognition:</span> <span className="font-semibold">2,400</span></div>
        </div>

        <div className="mt-8 space-y-3 text-sm">
          <h4 className="font-bold">Recognition Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            <span>Occasion:</span> <span className="text-right text-gray-900 font-medium">Great Work</span>
            <span>Tone:</span> <span className="text-right text-gray-900 font-medium">{data.toneId || "Professional"}</span>
            <span>Values:</span> <span className="text-right text-gray-900 font-medium">{data.valueIds?.length || 1} selected</span>
          </div>
        </div>

        <Button className="w-full mt-8 bg-gradient py-6 rounded-xl text-lg text-white font-semibold">
          Send Recognition
        </Button>
      </div>
    </div>
  );
}