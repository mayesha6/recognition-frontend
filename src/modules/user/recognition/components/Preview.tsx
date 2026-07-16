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
import { useEffect, useState } from "react";
import { Sparkles, Pencil, Check, X } from "lucide-react";
import { 
  useSendRecognitionMutation, 
  useGenerateMessageMutation, 
  useRegenerateMessageMutation,
  useEditMessageMutation
} from "@/redux/api/userApi";
import { toast } from "react-toastify";

export default function Step4Preview({ onBack, onClose }: any) {
  const { watch, setValue } = useFormContext();
  const data = watch();

  // Queries to backend
  const { data: categoriesRes } = useGetCategoriesQuery();
  const { data: tonesRes } = useGetTonesQuery();
  const { data: valuesRes } = useGetRecognitionValuesQuery();
  const { data: balanceRes } = useGetMyBalanceQuery();

  const [sendRecognition, { isLoading: isSending }] = useSendRecognitionMutation();
  const [generateMessage, { isLoading: isGenerating }] = useGenerateMessageMutation();
  const [regenerateMessage, { isLoading: isRegenerating }] = useRegenerateMessageMutation();
  const [editMessage, { isLoading: isEditingApi }] = useEditMessageMutation();
  const [isEditingText, setIsEditingText] = useState(false);
  const [tempMessage, setTempMessage] = useState(data.message || "");

  const categories = categoriesRes?.data || [];
  const tones = tonesRes?.data || [];
  const recognitionValues = valuesRes?.data || [];
  const availableBalance = balanceRes?.data?.balance || 0;

  // Resolve IDs to names
  const selectedCategoryObj = categories.find((c: any) => c._id === data.categoryId);
  const selectedToneObj = tones.find((t: any) => t._id === data.toneId);
  const selectedValuesObjs = recognitionValues.filter((v: any) => data.valueIds?.includes(v._id));
  const primaryValueName = selectedValuesObjs[0]?.name || "Teamwork";

  const handleGenerate = async () => {
    try {
      const payload = {
        category: selectedCategoryObj?.name || "Peer-to-Peer",
        department: data.department || "General",
        recipient_name: data.recipientName || "Colleague",
        recognition_values: selectedValuesObjs.map((v: any) => v.name),
        tone: selectedToneObj?.name || "Professional",
        userPrompt: data.userPrompt || undefined,
      };

      const res = await generateMessage(payload).unwrap();
      if (res?.data?.message) {
        setValue("message", res.data.message);
      }
      if (res?.data?.messageId) {
        setValue("messageId", res.data.messageId);
      }
    } catch (error) {
      console.error("Failed to generate AI message:", error);
    }
  };

  const handleRegenerate = async () => {
    try {
      const payload = {
        category: selectedCategoryObj?.name || "Peer-to-Peer",
        department: data.department || "General",
        recipient_name: data.recipientName || "Colleague",
        recognition_values: selectedValuesObjs.map((v: any) => v.name),
        tone: selectedToneObj?.name || "Professional",
        userPrompt: data.userPrompt || undefined,
      };

      const res = await regenerateMessage(payload).unwrap();
      if (res?.data?.message) {
        setValue("message", res.data.message);
      }
      if (res?.data?.messageId) {
        setValue("messageId", res.data.messageId);
      }
    } catch (error) {
      console.error("Failed to regenerate AI message:", error);
    }
  };

  useEffect(() => {
    if (!data.message && categories.length > 0 && tones.length > 0 && recognitionValues.length > 0) {
      handleGenerate();
    }
  }, [categories, tones, recognitionValues]);

  useEffect(() => {
    if (data.message) {
      setTempMessage(data.message);
    }
  }, [data.message]);

  const handleSaveEdit = async () => {
    if (!tempMessage.trim()) return;
    try {
      if (data.messageId) {
        await editMessage({
          messageId: data.messageId,
          newMessage: tempMessage
        }).unwrap();
      }
      setValue("message", tempMessage);
      setIsEditingText(false);
      toast.success("Message updated successfully!");
    } catch (error) {
      console.error("Failed to edit message on backend:", error);
      toast.error("Failed to save changes. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setTempMessage(data.message || "");
    setIsEditingText(false);
  };

  const handleSend = async () => {
    try {
      const payload = {
        receiverEmail: data.receiverEmail,
        points: Number(data.points ?? 100),
        image: data.imageId,
        message: data.message,
        messageId: data.messageId,
        recipient_name: data.recipientName,
        department: data.department
      };

      await sendRecognition(payload).unwrap();
      toast.success("Recognition sent successfully!");
      if (onClose) onClose();
    } catch (err: any) {
      console.error("Error sending recognition:", err);
      let errMsg = err?.data?.message || "Failed to send recognition. Please generate AI message first.";
      if (typeof errMsg === "string" && errMsg.startsWith("[") && errMsg.endsWith("]")) {
        try {
          const parsed = JSON.parse(errMsg);
          if (Array.isArray(parsed) && parsed.length > 0) {
            errMsg = parsed.map((item: any) => item.message).join(", ");
          }
        } catch (e) {
          // ignore
        }
      }
      toast.error(errMsg);
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

          <div className="bg-white/10 p-4 rounded-xl text-sm leading-relaxed backdrop-blur-sm min-h-[100px] relative group flex flex-col justify-center">
            {isGenerating || isRegenerating ? (
              <div className="flex flex-col items-center gap-2 py-4 w-full">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs opacity-80">Generating AI message...</span>
              </div>
            ) : isEditingText ? (
              <div className="w-full flex flex-col gap-2">
                <textarea
                  className="w-full bg-white/20 text-white placeholder:text-white/50 border border-white/30 rounded-lg p-2 text-sm outline-none focus:border-white/60 resize-none min-h-[80px]"
                  value={tempMessage}
                  onChange={(e) => setTempMessage(e.target.value)}
                  disabled={isEditingApi}
                  rows={3}
                />
                <div className="flex justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={isEditingApi}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded flex items-center gap-1 transition-colors"
                  >
                    <X size={12} /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    disabled={isEditingApi}
                    className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 rounded flex items-center gap-1 transition-colors"
                  >
                    {isEditingApi ? (
                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Check size={12} />
                    )}
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                {data.message && (
                  <button
                    type="button"
                    onClick={() => setIsEditingText(true)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all duration-200"
                    title="Edit message"
                  >
                    <Pencil size={14} className="text-white" />
                  </button>
                )}
                <p className="w-full pr-6">
                  {data.message || `We are recognizing you for showing exceptional values under the ${selectedCategoryObj?.name || "Peer-to-Peer"} category!`}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="bg-white/20 px-4 py-1 rounded-lg text-sm">{primaryValueName}</span>
          <span className="font-bold">{data.points ?? 100} Pts</span>
        </div>
      </div>

      {/* ডান পাশ: অ্যাকশন কার্ড */}
      <div className="border border-gray-200 rounded-2xl p-6 shadow-custom-card h-fit">
        <h3 className="font-bold text-xl mb-6">Actions</h3>

        {/* পয়েন্ট স্লাইডার */}
        <div className="mb-8">
          <Slider
            value={[data.points ?? 100]}
            min={0}
            max={availableBalance}
            step={1}
            disabled={availableBalance === 0}
            className="mb-4"
            onValueChange={(val) => setValue("points", val[0])}
          />
          <p className="text-center text-4xl font-bold text-primary">{data.points ?? 100} pts</p>
        </div>

        <div className="space-y-4 text-sm border-t pt-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Available Balance:</span>
            <span className="font-semibold">{availableBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">After this recognition:</span>
            <span className="font-semibold">{(availableBalance - (data.points ?? 100)).toLocaleString()}</span>
          </div>
        </div>

        {/* AI Message Generation / Regeneration */}
        <div className="border-t pt-4 mt-6">
          <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
            <Sparkles size={14} className="text-primary" />
            AI Message Control
          </h4>
          <textarea
            className="w-full border border-gray rounded-lg p-2 text-xs outline-none focus:border-primary placeholder:text-gray-400"
            placeholder="Optional prompt for AI (e.g. 'Make it more formal', 'Highlight leadership')"
            value={data.userPrompt ?? ""}
            onChange={(e) => setValue("userPrompt", e.target.value)}
            rows={2}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2 text-xs py-2 h-fit flex items-center justify-center gap-1 border-primary text-primary hover:bg-primary/5"
            onClick={handleRegenerate}
            disabled={isGenerating || isRegenerating}
          >
            {isGenerating || isRegenerating ? (
              <>
                <div className="w-3.5 h-3.5 border border-primary border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={14} className="text-primary" />
                Regenerate AI Message
              </>
            )}
          </Button>
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