"use client";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Configuration({ onNext, onBack }: any) {
  const { watch, setValue } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryId = watch("categoryId");

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg">Select Categories</h3>
      <div className="flex gap-2">
        {["Peer-to-Peer", "Thank You Note"].map((cat) => (
          <Button key={cat} onClick={() => { setValue("categoryId", cat); setIsModalOpen(true); }}>
            {cat}
          </Button>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <h2 className="font-bold mb-4">Select Category Image</h2>
          <div className="grid grid-cols-3 gap-4">
             {["img1.png", "img2.png", "img3.png"].map((img) => (
               <div key={img} onClick={() => { setValue("imageId", img); setIsModalOpen(false); }} 
                    className="h-24 bg-gray-200 rounded cursor-pointer hover:ring-2 ring-indigo-500" />
             ))}
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline">Back</Button>
        <Button onClick={onNext}>Generate Card</Button>
      </div>
    </div>
  );
}