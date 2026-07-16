"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  useGetCategoriesQuery,
  useGetTonesQuery,
  useGetRecognitionValuesQuery,
  useGetMyBalanceQuery,
} from "@/redux/api/recognitionApi";
import { useSendRecognitionMutation } from "@/redux/api/userApi";

export default function Step4Preview({ onBack, onClose }: any) {
  const { watch, setValue } = useFormContext();
  const data = watch();

  // Queries to backend
  const { data: categoriesRes } = useGetCategoriesQuery();
  const { data: tonesRes } = useGetTonesQuery();
  const { data: valuesRes } = useGetRecognitionValuesQuery();
  const { data: balanceRes } = useGetMyBalanceQuery();

  const [sendRecognition, { isLoading: isSending }] = useSendRecognitionMutation();

  const categories = categoriesRes?.data || [];
  const tones = tonesRes?.data || [];
  const recognitionValues = valuesRes?.data || [];
  const availableBalance = balanceRes?.data?.balance || 0;

  // Resolve IDs to names
  const selectedCategoryObj = categories.find((c: any) => c._id === data.categoryId);
  const selectedToneObj = tones.find((t: any) => t._id === data.toneId);
  const selectedValuesObjs = recognitionValues.filter((v: any) => data.valueIds?.includes(v._id));
  const primaryValueName = selectedValuesObjs[0]?.name || "Teamwork";

  const handleSend = async () => {
    try {
      const payload = {
        receiverEmail: data.receiverEmail,
        points: Number(data.points || 100),
        image: data.imageId,
        message: data.message || `Recognized for ${selectedCategoryObj?.name || "contribution"}`,
        recipient_name: data.recipientName,
        department: data.department
      };

      await sendRecognition(payload).unwrap();
      alert("Recognition sent successfully!");
      if (onClose) onClose();
    } catch (err: any) {
      console.error("Error sending recognition:", err);
      alert(err?.data?.message || "Failed to send recognition. Please generate AI message first.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      {/* বাম পাশ: প্রিভিউ কার্ড */}
      <div
        className="bg-gradient p-6 rounded-2xl text-white shadow-lg flex flex-col justify-between min-h-100 relative overflow-hidden"
        style={data.imageId ? {
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${data.imageId})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        } : undefined}
      >
        <div>
          <h2 className="text-3xl font-bold mb-6">Greetely</h2>
          <p className="text-sm opacity-90">To:</p>
          <h3 className="text-2xl font-medium">{data.recipientName || "Sarah Ahmed"}</h3>
          <p className="text-sm opacity-80 mb-6">{data.department || "Engineering Department"}</p>

          <div className="bg-white/10 p-4 rounded-xl text-sm leading-relaxed backdrop-blur-sm">
            {data.message || `We are recognizing you for showing exceptional values under the ${selectedCategoryObj?.name || "Peer-to-Peer"} category!`}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="bg-white/20 px-4 py-1 rounded-lg text-sm">{primaryValueName}</span>
          <span className="font-bold">{data.points} Pts</span>
        </div>
      </div>

      {/* ডান পাশ: অ্যাকশন কার্ড */}
      <div className="border border-gray-200 rounded-2xl p-6 shadow-custom-card h-fit">
        <h3 className="font-bold text-xl mb-6">Actions</h3>

        {/* পয়েন্ট স্লাইডার */}
        <div className="mb-8">
          <Slider
            value={[data.points || 100]}
            max={availableBalance || 100}
            step={10}
            className="mb-4"
            onValueChange={(val) => setValue("points", val[0])}
          />
          <p className="text-center text-4xl font-bold text-primary">{data.points} pts</p>
        </div>

        <div className="space-y-4 text-sm border-t pt-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Available Balance:</span>
            <span className="font-semibold">{availableBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">After this recognition:</span>
            <span className="font-semibold">{(availableBalance - (data.points || 100)).toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-8 space-y-3 text-sm">
          <h4 className="font-bold">Recognition Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            <span>Occasion:</span> <span className="text-right text-gray-900 font-medium">{selectedCategoryObj?.name || "-"}</span>
            <span>Tone:</span> <span className="text-right text-gray-900 font-medium">{selectedToneObj?.name || "-"}</span>
            <span>Values:</span> <span className="text-right text-gray-900 font-medium">{selectedValuesObjs.map((v: { name: any; }) => v.name).join(", ") || "-"}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button variant="outline" className="w-1/3 py-6 rounded-xl text-lg font-semibold" onClick={onBack}>
            Back
          </Button>
          <Button
            className="w-2/3 bg-gradient py-6 rounded-xl text-lg text-white font-semibold flex items-center justify-center gap-2"
            onClick={handleSend}
            disabled={isSending}
          >
            {isSending ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              "Send Recognition"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}