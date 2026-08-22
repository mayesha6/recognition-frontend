"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendRecognitionSchema, SendRecognitionFormValues } from "../validation/recognition.schema";
import SelectUser from "./SelectUser";
import Configuration from "./Configuration";
import Preview from "./Preview";
import { UserCheck, SlidersHorizontal, Sparkles, Check } from "lucide-react";

export default function SendRecognitionWizard({ prefilledUser, onClose }: any) {
  const [step, setStep] = useState(2); // Step 2 configuration active
  const methods = useForm<SendRecognitionFormValues>({
    resolver: zodResolver(sendRecognitionSchema),
    defaultValues: {
      recipientId: prefilledUser?._id || prefilledUser?.id || "",
      receiverEmail: prefilledUser?.email || "",
      departmentId: prefilledUser?.departmentId || prefilledUser?.department || "",
      recipientName: prefilledUser?.name || "",
      department: prefilledUser?.department || prefilledUser?.departmentName || "",
      categoryId: "",
      toneId: "",
      valueIds: [],
      points: 100,
      imageId: "",
      userPrompt: ""
    }
  });

  const steps = [
    { number: 1, label: "Select Recipient", icon: UserCheck },
    { number: 2, label: "Configure Details", icon: SlidersHorizontal },
    { number: 4, label: "Review & Send", icon: Sparkles },
  ];

  return (
    <FormProvider {...methods}>
      <div className="w-full space-y-6">
        {/* Step Progress Indicator Header */}
        <div className="py-2 w-full">
          <div className="flex items-center justify-between max-w-3xl mx-auto relative px-6">
            {/* Connecting Progress Line */}
            <div className="absolute top-5 left-16 right-16 h-[3px] bg-gray-100 -z-0 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00C985] via-teal-400 to-[#555DE3] transition-all duration-300 ease-in-out"
                style={{ 
                  width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" 
                }}
              />
            </div>

            {steps.map((s) => {
              const Icon = s.icon;
              const isCompleted = (s.number === 1 && step > 1) || (s.number === 2 && step > 2);
              const isActive = step === s.number;

              return (
                <div 
                  key={s.number} 
                  className="flex flex-col items-center gap-2 relative z-10 cursor-pointer group"
                  onClick={() => {
                    if (s.number < step) setStep(s.number);
                  }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isCompleted
                        ? "bg-[#00C985] text-white shadow-md ring-4 ring-[#E6F9F3]"
                        : isActive
                        ? "bg-[#555DE3] text-white shadow-lg ring-8 ring-[#FFF0E5]"
                        : "bg-white border-2 border-gray-200 text-gray-400 group-hover:border-indigo-300 group-hover:text-indigo-500"
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={`text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive ? "text-[#555DE3] font-bold" : isCompleted ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Step Views */}
        {step === 1 && <SelectUser prefilledUser={prefilledUser} onContinue={() => setStep(2)} onClose={onClose} />}
        {step === 2 && <Configuration onNext={() => setStep(4)} onBack={() => setStep(1)} />}
        {step === 4 && <Preview onBack={() => setStep(2)} onClose={onClose} />}
      </div>
    </FormProvider>
  );
}