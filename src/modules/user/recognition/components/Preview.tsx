"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function Preview({ onBack }: any) {
  const { watch } = useFormContext();
  const data = watch();

  return (
    <div className="flex gap-8 p-6 border rounded-xl">
      <div className="w-1/2 h-64 bg-indigo-600 rounded-lg text-white p-4">
        <h2 className="text-2xl font-bold">Greetely</h2>
        <p>Recipient: {data.recipientId}</p>
        <p>Value: {data.valueIds.join(", ")}</p>
      </div>
      <div className="w-1/2 space-y-4">
        <h2 className="font-bold text-xl">Recognition Summary</h2>
        <p>Points: {data.points}</p>
        <Button onClick={() => alert("Recognition Sent!")}>Send Recognition</Button>
        <Button onClick={onBack} variant="ghost">Back</Button>
      </div>
    </div>
  );
}