"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendRecognitionSchema, SendRecognitionFormValues } from "../validation/recognition.schema";
import Step1SelectUser from "./SelectUser";
import SelectUser from "./SelectUser";
import Configuration from "./Configuration";
import Preview from "./Preview";
// import Step2Configuration from "./Configuration";
// import Step4Preview from "./Preview";

export default function SendRecognitionWizard({ prefilledUser, onClose }: any) {
  const [step, setStep] = useState(1);
  const methods = useForm<SendRecognitionFormValues>({
    resolver: zodResolver(sendRecognitionSchema),
    defaultValues: { recipientId: prefilledUser?.id || "", valueIds: [], points: 100 }
  });

  return (
    <FormProvider {...methods}>
      <div className="mx-auto p-6">
        {step === 1 && <SelectUser prefilledUser={prefilledUser} onContinue={() => setStep(2)} onClose={onClose} />}
        {step === 2 && <Configuration onNext={() => setStep(4)} onBack={() => setStep(1)} />}
        {step === 4 && <Preview onBack={() => setStep(2)} />}
      </div>
    </FormProvider>
  );
}