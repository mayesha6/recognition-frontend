"use client";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

const categories = ["Peer-to-Peer", "Thank You Note", "Employee Accomplishments"];
const tones = ["Professional", "Warm & Heartful", "Energetic", "Witty & Fun"];
const values = ["Exceeding Expectations", "Results Driver", "Quality Champion", "Adaptability"];

export default function Configuration({ onNext, onBack }: any) {
  const { watch, setValue } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state watching
  const selectedCategory = watch("categoryId");
  const selectedTone = watch("toneId");
  const selectedValues = watch("valueIds") || [];
  const points = watch("points") || 100; // ডিফল্ট ১০০

  const toggleValue = (val: string) => {
    const current = selectedValues;
    if (current.includes(val)) {
      setValue("valueIds", current.filter((i: string) => i !== val));
    } else if (current.length < 3) {
      setValue("valueIds", [...current, val]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* বাম পাশের কনফিগারেশন সেকশন */}
      <div className="lg:col-span-2 space-y-8">
        {/* Category Section */}
        <section>
          <h3 className="font-light text-xl mb-3">Select Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient text-white shadow-md border-transparent"
                    : "bg-white text-gray-700 border border-gray hover:border-primary hover:text-white"
                }`}
                onClick={() => { setValue("categoryId", cat); setIsModalOpen(true); }}
              >
                {cat}
              </Button>
            ))}
          </div>
        </section>

        {/* Tone Section */}
        <section>
          <h3 className="font-light text-xl mb-3">Choose Tone of Value</h3>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <Button
                key={tone}
                type="button"
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedTone === tone
                    ? "bg-gradient text-white shadow-md border-transparent"
                    : "bg-white text-gray-700 border border-gray hover:border-primary hover:text-white"
                }`}
                onClick={() => setValue("toneId", tone)}
              >
                {tone}
              </Button>
            ))}
          </div>
        </section>

        {/* Value Section */}
        <section>
          <h3 className="font-light text-xl mb-3">Employee Recognition Value (Choose up to 3)</h3>
          <div className="flex flex-wrap gap-2">
            {values.map((val) => (
              <Button
                key={val}
                type="button"
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedValues.includes(val)
                    ? "bg-gradient text-white shadow-md border-transparent"
                    : "bg-white text-gray-700 border border-gray hover:border-primary hover:text-white"
                }`}
                onClick={() => toggleValue(val)}
              >
                {val}
              </Button>
            ))}
          </div>
        </section>

        {/* Modal Logic */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-xl">
            <h2 className="font-light text-xl mb-4">Select Image for {selectedCategory}</h2>
            <div className="grid grid-cols-3 gap-4">
              {["img1.png", "img2.png", "img3.png"].map((img) => (
                <div key={img} onClick={() => { setValue("imageId", img); setIsModalOpen(false); }}
                  className="h-24 bg-gray-200 rounded cursor-pointer hover:ring-2 ring-indigo-500" />
              ))}
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
             max={500} 
             step={10} 
             className="mb-4"
             onValueChange={(val) => setValue("points", val[0])} 
           />
           <p className="text-center text-4xl font-bold text-primary">{points} pts</p>
        </div> 

        <div className="space-y-4 text-sm border-t pt-4">
          <div className="flex justify-between"><span className="text-gray-500">Available Balance:</span> <span className="font-semibold">2,500</span></div>
          <div className="flex justify-between"><span className="text-gray-500">After this recognition:</span> <span className="font-semibold">{2500 - points}</span></div>
        </div>

        <div className="mt-8 space-y-3 text-sm">
          <h4 className="font-bold">Recognition Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            <span>Occasion:</span> <span className="text-right text-gray-900 font-medium">{selectedCategory || "-"}</span>
            <span>Tone:</span> <span className="text-right text-gray-900 font-medium">{selectedTone || "-"}</span>
            <span>Values:</span> <span className="text-right text-gray-900 font-medium">{selectedValues.length} selected</span>
          </div>
        </div>

        <Button className="w-full mt-8 bg-gradient py-6 rounded-xl text-lg text-white font-semibold" onClick={onNext}>
          Send Recognition
        </Button>
      </div>
    </div>
  );
}