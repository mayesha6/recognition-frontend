"use client";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
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
  const points = watch("points") || 100;

  // Ensure points are capped at available balance if balance changes
  useEffect(() => {
    if (availableBalance > 0 && points > availableBalance) {
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
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat._id
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
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedTone === tone._id
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
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedValues.includes(val._id)
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

        {/* Modal Logic */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Select Image Card</h2>
              <p className="text-gray-500 text-sm mt-1">Choose a background card for {selectedCategoryObj?.name}</p>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-1">
                {selectedCategoryObj?.images?.map((img: string) => {
                  const isSelected = watch("imageId") === img;
                  return (
                    <div
                      key={img}
                      onClick={() => {
                        setValue("imageId", img);
                        setIsModalOpen(false);
                      }}
                      className={`relative group aspect-[4/3] rounded-xl cursor-pointer overflow-hidden border-2 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-md flex items-center justify-center bg-gradient-to-tr from-[#1E293B] to-[#0F172A] ${
                        isSelected 
                          ? "border-primary ring-2 ring-primary/20" 
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <img 
                        src={img} 
                        alt="Category option" 
                        className="object-contain w-full h-full p-2 group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Checkmark badge if selected */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-md">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {(!selectedCategoryObj?.images || selectedCategoryObj.images.length === 0) && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm">No images available for this category.</p>
                </div>
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
            max={availableBalance || 100}
            step={10}
            className="mb-4"
            onValueChange={(val) => setValue("points", val[0])}
          />
          <p className="text-center text-4xl font-bold text-primary">{points} pts</p>
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
          Send Recognition
        </Button>
      </div>
    </div>
  );
}