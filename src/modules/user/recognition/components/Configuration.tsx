"use client";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";
import {
  useGetCategoriesQuery,
  useGetTonesQuery,
  useGetRecognitionValuesQuery,
  useGetMyBalanceQuery,
} from "@/redux/api/recognitionApi";

export default function Configuration({ onNext, onBack }: any) {
  const { watch, setValue } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Queries to backend
  const { data: categoriesRes, isLoading: loadingCategories } = useGetCategoriesQuery();
  const { data: tonesRes, isLoading: loadingTones } = useGetTonesQuery();
  const { data: valuesRes, isLoading: loadingValues } = useGetRecognitionValuesQuery();
  const { data: balanceRes, isLoading: loadingBalance } = useGetMyBalanceQuery();

  const categories = categoriesRes?.data || [];
  const tones = tonesRes?.data || [];
  const recognitionValues = valuesRes?.data || [];
  const availableBalance = balanceRes?.data?.balance || 0;

  // Form state watching
  const selectedCategory = watch("categoryId");
  const selectedTone = watch("toneId");
  const selectedValues = watch("valueIds") || [];
  const points = watch("points") ?? 100;
  const userPrompt = watch("userPrompt") ?? "";

  // Ensure points are capped at available balance if balance changes
  useEffect(() => {
    if (points > availableBalance) {
      setValue("points", availableBalance);
    }
  }, [availableBalance, points, setValue]);

  const toggleValue = (valId: string) => {
    const current = selectedValues;
    if (current.includes(valId)) {
      setValue("valueIds", current.filter((i: string) => i !== valId));
    } else if (current.length < 3) {
      setValue("valueIds", [...current, valId]);
    }
  };

  const selectedCategoryObj = categories.find((cat: any) => cat._id === selectedCategory);
  const selectedToneObj = tones.find((tone: any) => tone._id === selectedTone);

  if (loadingCategories || loadingTones || loadingValues || loadingBalance) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading options...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* বাম পাশের কনফিগারেশন সেকশন */}
      <div className="lg:col-span-2 space-y-8">
        {/* Category Section */}
        <section>
          <h3 className="font-light text-xl mb-3">Select Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat: any) => (
              <Button
                key={cat._id}
                type="button"
                className={`px-6 py-2 rounded-lg font-medium transition-all ${selectedCategory === cat._id
                    ? "bg-gradient text-white shadow-md border-transparent"
                    : "bg-white text-gray-700 border border-gray hover:border-primary hover:text-white"
                  }`}
                onClick={() => {
                  setValue("categoryId", cat._id);
                  setValue("imageId", ""); // image selections are category dependent
                  if (cat.images && cat.images.length > 0) {
                    setIsModalOpen(true);
                  }
                }}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Tone Section */}
        <section>
          <h3 className="font-light text-xl mb-3">Choose Tone of Value</h3>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone: any) => (
              <Button
                key={tone._id}
                type="button"
                className={`px-6 py-2 rounded-lg font-medium transition-all ${selectedTone === tone._id
                    ? "bg-gradient text-white shadow-md border-transparent"
                    : "bg-white text-gray-700 border border-gray hover:border-primary hover:text-white"
                  }`}
                onClick={() => setValue("toneId", tone._id)}
              >
                {tone.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Value Section */}
        <section>
          <h3 className="font-light text-xl mb-3">Employee Recognition Value (Choose up to 3)</h3>
          <div className="flex flex-wrap gap-2">
            {recognitionValues.map((val: any) => (
              <Button
                key={val._id}
                type="button"
                className={`px-6 py-2 rounded-lg font-medium transition-all ${selectedValues.includes(val._id)
                    ? "bg-gradient text-white shadow-md border-transparent"
                    : "bg-white text-gray-700 border border-gray hover:border-primary hover:text-white"
                  }`}
                onClick={() => toggleValue(val._id)}
              >
                {val.name}
              </Button>
            ))}
          </div>
        </section>

        {/* AI Message Control (Optional Prompt) */}
        <section>
          <h3 className="font-light text-xl mb-3">AI Message Control (Optional)</h3>
          <textarea
            className="w-full border border-gray rounded-lg p-3 text-sm bg-white outline-none focus:border-primary placeholder:text-gray-400 animate-fade-in"
            placeholder="Optional prompt for AI (e.g. 'Make it more formal', 'Highlight leadership')"
            value={userPrompt}
            onChange={(e) => setValue("userPrompt", e.target.value)}
            rows={3}
          />
        </section>

        {/* Modal Logic */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-xl bg-white p-6">
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            
            <h2 className="font-light text-xl mb-4">Select Image for {selectedCategoryObj?.name}</h2>
            
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-3 gap-4">
                {selectedCategoryObj?.images?.map((img: string) => {
                  const isSelected = watch("imageId") === img;
                  return (
                    <div
                      key={img}
                      onClick={() => {
                        setValue("imageId", img);
                        setIsModalOpen(false);
                      }}
                      className={`h-24 bg-gray-200 rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-200 ${
                        isSelected 
                          ? "border-indigo-600 shadow-sm" 
                          : "border-transparent hover:border-indigo-500 hover:shadow-sm"
                      }`}
                    >
                      <img src={img} alt="Category option" className="object-cover w-full h-full" />
                    </div>
                  );
                })}
              </div>
              
              {(!selectedCategoryObj?.images || selectedCategoryObj.images.length === 0) && (
                <p className="text-gray-500 text-sm text-center py-4">No images available for this category.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* ডান পাশের Action Card */}
      <div className="border border-gray-200 rounded-2xl p-6 shadow-custom-card h-fit">
        <h3 className="font-bold text-xl mb-6">Assign Points</h3>

        <div className="mb-8">
          <Slider
            value={[points]}
            min={0}
            max={availableBalance}
            step={1}
            disabled={availableBalance === 0}
            className="mb-4"
            onValueChange={(val) => setValue("points", val[0])}
          />
          <div className="flex items-center justify-center gap-2 mt-4">
            <input
              type="number"
              value={points}
              min={0}
              max={availableBalance}
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);
                if (isNaN(val)) val = 0;
                if (val < 0) val = 0;
                if (val > availableBalance) val = availableBalance;
                setValue("points", val);
              }}
              className="w-24 text-center text-3xl font-bold text-indigo-600 bg-gray-50 border border-gray-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-xl font-semibold text-gray-500">pts</span>
          </div>
        </div>

        <div className="space-y-4 text-sm border-t pt-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Available Balance:</span>{" "}
            <span className="font-semibold">{availableBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">After this recognition:</span>{" "}
            <span className="font-semibold">
              {(availableBalance - points).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-3 text-sm">
          <h4 className="font-bold">Recognition Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            <span>Occasion:</span>{" "}
            <span className="text-right text-gray-900 font-medium">
              {selectedCategoryObj?.name || "-"}
            </span>
            <span>Tone:</span>{" "}
            <span className="text-right text-gray-900 font-medium">
              {selectedToneObj?.name || "-"}
            </span>
            <span>Values:</span>{" "}
            <span className="text-right text-gray-900 font-medium">
              {selectedValues.length} selected
            </span>
          </div>
        </div>

        <Button
          className="w-full mt-8 bg-gradient py-6 rounded-xl text-lg text-white font-semibold animate-pulse"
          onClick={onNext}
        >
          Review and Validate Recognition
        </Button>
      </div>
    </div>
  );
}